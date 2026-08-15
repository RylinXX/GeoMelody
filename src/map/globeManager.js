import {
  config,
  Language,
  Map,
  MapStyle
} from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { CATEGORY_MAP } from '../data/categories.js';
import { DEFAULT_SETTINGS } from '../utils/storage.js';
import { fetchAndLocalizeStyle } from './styleHelper.js';

const SPOT_SOURCE_ID = 'geomelody-spots';
const SPOT_GLOW_LAYER_ID = 'geomelody-spot-glow';
const SPOT_HALO_LAYER_ID = 'geomelody-spot-halo';
const SPOT_CORE_LAYER_ID = 'geomelody-spot-core';
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY?.trim();

const INITIAL_CAMERA = {
  center: [105, 32],
  zoom: 2.15,
  bearing: 0,
  pitch: 0
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function normalizeLongitude(value) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

export class GlobeManager {
  constructor({ containerId, spots, onSpotSelect, language = 'zh', theme = 'dark', settings = {} }) {
    this.containerId = containerId;
    this.spots = spots;
    this.onSpotSelect = onSpotSelect;
    this.currentLanguage = language || 'zh';
    this.currentTheme = theme;
    this.mapSettings = { ...DEFAULT_SETTINGS, ...settings };
    this.viewMode = '3d';
    this.searchQuery = '';
    this.currentCategory = 'all';
    this.map = null;
    this.styleReady = false;
    this.interactionsBound = false;
    this.rotationTimer = null;
    this.rotationPausedUntil = 0;
    this.tooltip = document.getElementById('globe-tooltip');
    this.usingMapTilerCloud = Boolean(MAPTILER_KEY);
  }

  async init() {
    if (this.map) return;
    if (MAPTILER_KEY) config.apiKey = MAPTILER_KEY;

    // Pre-fetch localized style (Chinese labels & deep dark background pre-baked)
    const initialStyle = await this.getResolvedStyle(this.mapSettings.mapSkin);

    this.map = new Map({
      container: this.containerId,
      style: initialStyle,
      projection: 'globe',
      center: INITIAL_CAMERA.center,
      zoom: INITIAL_CAMERA.zoom,
      bearing: INITIAL_CAMERA.bearing,
      pitch: INITIAL_CAMERA.pitch,
      minZoom: 1.0,
      maxZoom: 18,
      renderWorldCopies: false,
      antialias: true,
      terrain: false,
      space: this.mapSettings.showStars ? { preset: 'stars', color: '#ffffff' } : { color: '#02060c' },
      halo: false, // Prevent white circle halo artifact
      navigationControl: false,
      geolocateControl: false,
      projectionControl: false,
      terrainControl: false,
      fullscreenControl: false,
      scaleControl: false,
      customControls: false,
      logSDKVersion: false
    });

    this.map.on('load', () => {
      this.handleStyleReady();
    });
    this.map.on('style.load', () => {
      this.handleStyleReady();
    });

    this.map.on('error', event => {
      const message = event?.error?.message || '';
      if (message && !message.includes('AbortError')) {
        console.warn('[GeoMelody map]', message);
      }
    });

    this.bindRotationPauseEvents();
    if (this.mapSettings.autoSpin) {
      this.startAutoRotation();
    }
  }

  async getResolvedStyle(skin = 'streets-dark') {
    if (!this.usingMapTilerCloud) {
      return await fetchAndLocalizeStyle(skin, this.currentLanguage, false);
    }

    switch (skin) {
      case 'streets-dark':
        return MapStyle.STREETS.DARK;
      case 'dataviz-dark':
        return MapStyle.DATAVIZ.DARK;
      case 'backdrop-dark':
        return MapStyle.BACKDROP.DARK;
      case 'dataviz-light':
        return MapStyle.DATAVIZ.LIGHT;
      case 'satellite':
        return MapStyle.SATELLITE;
      default:
        return MapStyle.STREETS.DARK;
    }
  }

  handleStyleReady() {
    if (!this.map || !this.map.isStyleLoaded()) return;
    this.styleReady = true;
    this.map.getContainer().dataset.mapReady = 'true';
    if (!this.mapSettings.showHalo) {
      this.removeHaloArtifacts();
    }
    this.applyLayerFilters();
    this.renderLightDotMarkers();
    this.updateSpaceAppearance();
    this.applyMapLanguage();
  }

  /**
   * Remove any white halo/gradient layer artifacts
   */
  removeHaloArtifacts() {
    if (!this.map) return;
    try {
      if (typeof this.map.setHalo === 'function') {
        this.map.setHalo(false);
      }
      if (this.map.getLayer('Halo Layer')) {
        try { this.map.removeLayer('Halo Layer'); } catch (_) {}
      }
      if (this.map.getLayer('Radial Gradient Layer')) {
        try { this.map.removeLayer('Radial Gradient Layer'); } catch (_) {}
      }
      const layers = this.map.getStyle()?.layers || [];
      layers.forEach(l => {
        const id = l.id.toLowerCase();
        if ((id.includes('halo') || id.includes('radial') || id.includes('gradient')) && !id.startsWith('geomelody-')) {
          try {
            this.map.removeLayer(l.id);
          } catch (_) {
            this.map.setLayoutProperty(l.id, 'visibility', 'none');
          }
        }
      });
      if (this.map.halo && typeof this.map.halo.hide === 'function') {
        this.map.halo.hide();
      }
    } catch (_) {}
  }

  /**
   * Apply user settings to show/hide hillshading, cities, countries, borders
   */
  applyLayerFilters() {
    if (!this.map || !this.map.isStyleLoaded()) return;
    const { showHillshade, showCities, showCountries, showBorders } = this.mapSettings;
    const layers = this.map.getStyle()?.layers || [];

    layers.forEach(layer => {
      const id = layer.id.toLowerCase();
      if (id.startsWith('geomelody-')) return;

      // 1. Hillshade & 3D Terrain Shading
      if (
        layer.type === 'hillshade' ||
        id.includes('hillshade') ||
        id.includes('relief') ||
        id.includes('terrain') ||
        id.includes('contour') ||
        id.includes('dem')
      ) {
        try {
          this.map.setLayoutProperty(layer.id, 'visibility', showHillshade ? 'visible' : 'none');
        } catch (_) {}
      }

      // 2. State & City Labels and boundaries
      const isCityOrState =
        id.includes('boundary_state') ||
        id.includes('place_state') ||
        id.includes('place_city') ||
        id.includes('place_town') ||
        id.includes('place_village') ||
        id.includes('place_suburb') ||
        id.includes('place_other') ||
        id.includes('place_label_city') ||
        id.includes('label_city') ||
        id.includes('label_place') ||
        id.includes('label_state') ||
        id.includes('admin_level_4') ||
        id.includes('admin_level_3') ||
        id.includes('poi');

      if (isCityOrState) {
        try {
          this.map.setLayoutProperty(layer.id, 'visibility', showCities ? 'visible' : 'none');
        } catch (_) {}
      }

      // 3. Country Names
      const isCountry =
        id.includes('place_country_major') ||
        id.includes('place_country_minor') ||
        id.includes('place_country_other') ||
        id.includes('place_label_country') ||
        id.includes('label_country') ||
        id.includes('country_label');

      if (isCountry) {
        try {
          this.map.setLayoutProperty(layer.id, 'visibility', showCountries ? 'visible' : 'none');
        } catch (_) {}
      }

      // 4. Country Borders
      const isCountryBorder =
        id.includes('boundary_country') ||
        id.includes('boundary_admin0') ||
        id.includes('admin_level_2') ||
        id.includes('admin0');

      if (isCountryBorder) {
        try {
          this.map.setLayoutProperty(layer.id, 'visibility', showBorders ? 'visible' : 'none');
        } catch (_) {}
      }
    });

    if (typeof this.map.setTerrain === 'function') {
      try {
        this.map.setTerrain(showHillshade ? { source: 'maptiler_terrain', exaggeration: 1.2 } : null);
      } catch (_) {}
    }
  }

  async applyMapSettings(newSettings) {
    if (!newSettings) return;
    const prevSkin = this.mapSettings.mapSkin;
    this.mapSettings = { ...this.mapSettings, ...newSettings };

    // If map base skin changed, switch style
    if (newSettings.mapSkin && newSettings.mapSkin !== prevSkin && this.map) {
      this.styleReady = false;
      this.interactionsBound = false;
      delete this.map.getContainer().dataset.markerLayer;
      delete this.map.getContainer().dataset.spotCount;
      const nextStyle = await this.getResolvedStyle(this.mapSettings.mapSkin);
      this.map.setStyle(nextStyle);
      this.map.once('idle', () => this.handleStyleReady());
      return;
    }

    this.applyLayerFilters();
    this.updateSpaceAppearance();

    if (this.mapSettings.autoSpin) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  updateSpaceAppearance() {
    if (!this.map) return;
    try {
      if (this.viewMode === '3d') {
        if (typeof this.map.setSpace === 'function') {
          if (this.mapSettings.showStars) {
            this.map.setSpace({
              preset: 'stars',
              color: '#ffffff'
            });
          } else {
            this.map.setSpace({ color: this.currentTheme === 'dark' ? '#02060c' : '#dce8ed' });
          }
        }

        if (this.mapSettings.showHalo) {
          if (typeof this.map.setHalo === 'function') {
            this.map.setHalo({
              scale: 1.15,
              stops: [
                [0, 'rgba(56, 189, 248, 0.28)'],
                [0.4, 'rgba(56, 189, 248, 0.12)'],
                [0.8, 'rgba(2, 6, 12, 0.0)']
              ]
            });
          }
        } else {
          this.removeHaloArtifacts();
        }
      } else {
        this.removeHaloArtifacts();
      }
    } catch (error) {
      console.warn('[GeoMelody space update]', error);
    }
  }

  getVisibleSpots() {
    const query = this.searchQuery.trim().toLowerCase();
    return this.spots.filter(spot => {
      const categoryMatches = this.currentCategory === 'all' || spot.category === this.currentCategory;
      if (!categoryMatches) return false;
      if (!query) return true;
      return [spot.name, spot.enName, spot.location, spot.country, ...(spot.tags || [])]
        .some(value => value?.toLowerCase().includes(query));
    });
  }

  toGeoJson() {
    return {
      type: 'FeatureCollection',
      features: this.getVisibleSpots().map(spot => ({
        type: 'Feature',
        id: spot.id,
        geometry: {
          type: 'Point',
          coordinates: [spot.lng, spot.lat]
        },
        properties: {
          id: spot.id,
          color: CATEGORY_MAP[spot.category]?.color || '#38bdf8'
        }
      }))
    };
  }

  renderLightDotMarkers() {
    if (!this.map || !this.styleReady || !this.map.isStyleLoaded()) return;
    const data = this.toGeoJson();
    this.map.getContainer().dataset.spotCount = String(data.features.length);
    const source = this.map.getSource(SPOT_SOURCE_ID);
    if (source) {
      source.setData(data);
      this.map.getContainer().dataset.markerLayer = 'true';
      this.bindMapInteractions();
      return;
    }

    try {
      this.map.addSource(SPOT_SOURCE_ID, {
        type: 'geojson',
        data
      });

      this.map.addLayer({
        id: SPOT_GLOW_LAYER_ID,
        type: 'circle',
        source: SPOT_SOURCE_ID,
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 8, 6, 14, 12, 20],
          'circle-blur': 1,
          'circle-opacity': 0.46,
          'circle-pitch-alignment': 'map'
        }
      });

      this.map.addLayer({
        id: SPOT_HALO_LAYER_ID,
        type: 'circle',
        source: SPOT_SOURCE_ID,
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4.5, 6, 7.5, 12, 10],
          'circle-blur': 0.55,
          'circle-opacity': 0.72,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'rgba(255,255,255,0.72)',
          'circle-pitch-alignment': 'map'
        }
      });

      this.map.addLayer({
        id: SPOT_CORE_LAYER_ID,
        type: 'circle',
        source: SPOT_SOURCE_ID,
        paint: {
          'circle-color': '#ffffff',
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1.8, 6, 3.2, 12, 4.6],
          'circle-opacity': 0.96,
          'circle-pitch-alignment': 'map'
        }
      });

      this.map.getContainer().dataset.markerLayer = 'true';
      this.bindMapInteractions();
    } catch (error) {
      console.warn('[GeoMelody marker render]', error);
    }
  }

  bindMapInteractions() {
    if (!this.map) return;
    if (this.interactionsBound) return;
    this.interactionsBound = true;

    this.map.on('mousemove', SPOT_CORE_LAYER_ID, event => {
      const feature = event.features?.[0];
      const spot = this.spots.find(item => item.id === feature?.properties?.id);
      if (!spot) return;
      this.map.getCanvas().style.cursor = 'pointer';
      this.showTooltip(spot, event.point);
    });

    this.map.on('mouseleave', SPOT_CORE_LAYER_ID, () => {
      this.map.getCanvas().style.cursor = '';
      this.hideTooltip();
    });

    this.map.on('click', SPOT_CORE_LAYER_ID, event => {
      const feature = event.features?.[0];
      const spot = this.spots.find(item => item.id === feature?.properties?.id);
      if (!spot) return;
      this.pauseRotation(7000);
      this.hideTooltip();
      this.onSpotSelect?.(spot);
    });
  }

  showTooltip(spot, point) {
    if (!this.tooltip) return;
    const name = this.currentLanguage === 'en' ? (spot.enName || spot.name) : spot.name;
    const location = this.currentLanguage === 'en'
      ? (spot.enLocation || spot.location)
      : spot.location;
    const hint = this.currentLanguage === 'en' ? 'Click to listen' : '点击聆听';
    const photo = spot.photos?.[0];
    this.tooltip.innerHTML = `
      ${photo ? `<img class="globe-tooltip-thumb" src="${escapeHtml(photo)}" alt="" loading="lazy" decoding="async">` : ''}
      <span class="globe-tooltip-content">
        <span class="globe-tooltip-title">${escapeHtml(name)}</span>
        <span class="globe-tooltip-loc">${escapeHtml(location)}</span>
        <span class="globe-tooltip-hint">${hint}</span>
      </span>`;
    const container = this.map.getContainer();
    const tooltipWidth = 220;
    const left = Math.min(point.x + 18, container.clientWidth - tooltipWidth - 12);
    const top = Math.max(82, Math.min(point.y + 18, container.clientHeight - 92));
    this.tooltip.style.left = `${Math.max(12, left)}px`;
    this.tooltip.style.top = `${top}px`;
    this.tooltip.classList.add('visible');
  }

  hideTooltip() {
    this.tooltip?.classList.remove('visible');
  }

  setViewMode(mode) {
    if (!this.map || (mode !== '3d' && mode !== '2d')) return;
    this.viewMode = mode;
    this.hideTooltip();
    this.pauseRotation(2400);
    if (mode === '3d') {
      this.map.setProjection('globe', { persist: true });
      this.updateSpaceAppearance();
      this.applyLayerFilters();
      const currentZoom = this.map.getZoom();
      if (currentZoom < 1.8) {
        this.map.easeTo({ zoom: 2.15, duration: 600, essential: true });
      }
    } else {
      this.map.setProjection('mercator', { persist: true });
      this.map.easeTo({ pitch: 0, bearing: 0, duration: 700, essential: true });
      this.applyLayerFilters();
    }
    requestAnimationFrame(() => this.map?.resize());
  }

  setCategory(category) {
    this.currentCategory = category || 'all';
    this.renderLightDotMarkers();
  }

  setSearchQuery(query) {
    this.searchQuery = query || '';
    this.renderLightDotMarkers();
  }

  setLanguage(language) {
    this.currentLanguage = language;
    this.applyMapLanguage();
    this.hideTooltip();
  }

  applyMapLanguage() {
    if (!this.map || !this.styleReady || !this.map.isStyleLoaded()) return;
    try {
      const isChinese = this.currentLanguage !== 'en';
      if (typeof this.map.setLanguage === 'function') {
        this.map.setLanguage(isChinese ? Language.CHINESE : Language.ENGLISH);
      }

      const layers = this.map.getStyle()?.layers || [];
      layers.forEach(layer => {
        if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
          if (isChinese) {
            this.map.setLayoutProperty(layer.id, 'text-field', [
              'coalesce',
              ['get', 'name:zh'],
              ['get', 'name_zh'],
              ['get', 'name:zh-Hans'],
              ['get', 'name:zh-Hant'],
              ['get', 'name'],
              ['get', 'name:latin']
            ]);
          } else {
            this.map.setLayoutProperty(layer.id, 'text-field', [
              'coalesce',
              ['get', 'name:en'],
              ['get', 'name_en'],
              ['get', 'name:latin'],
              ['get', 'name']
            ]);
          }
        }
      });
    } catch (error) {
      console.warn('[GeoMelody map] Language update fallback applied.', error);
    }
  }

  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    this.currentTheme = theme;
    const skin = theme === 'light' ? 'dataviz-light' : 'dataviz-dark';
    this.applyMapSettings({ mapSkin: skin });
  }

  flyToSpot(spot, zoom) {
    if (!this.map || !spot) return;
    const targetZoom = zoom ?? (this.viewMode === '3d' ? 5.4 : 7);
    this.pauseRotation(9000);
    this.map.flyTo({
      center: [spot.lng, spot.lat],
      zoom: targetZoom,
      pitch: 0,
      bearing: 0,
      duration: 1700,
      essential: true
    });
  }

  flyToRegion(region) {
    if (!this.map || !region) return;
    const zoom = this.viewMode === '3d'
      ? Math.max(1.7, (region.mapZoom || 3.2) - 0.85)
      : (region.mapZoom || 3.2);
    this.pauseRotation(7000);
    this.map.flyTo({
      center: [region.lng, region.lat],
      zoom,
      pitch: 0,
      bearing: 0,
      duration: 1500,
      essential: true
    });
  }

  resetView() {
    if (!this.map) return;
    this.pauseRotation(3500);
    this.map.flyTo({
      ...INITIAL_CAMERA,
      zoom: this.viewMode === '3d' ? INITIAL_CAMERA.zoom : 1.05,
      duration: 1200,
      essential: true
    });
  }

  bindRotationPauseEvents() {
    const canvas = this.map?.getCanvas();
    if (!canvas) return;
    const pause = () => this.pauseRotation(5000);
    const resumeSoon = () => this.pauseRotation(2500);
    canvas.addEventListener('pointerdown', pause, { passive: true });
    canvas.addEventListener('pointerup', resumeSoon, { passive: true });
    canvas.addEventListener('pointercancel', resumeSoon, { passive: true });
    canvas.addEventListener('wheel', pause, { passive: true });
  }

  pauseRotation(duration = 5000) {
    this.rotationPausedUntil = Math.max(this.rotationPausedUntil, Date.now() + duration);
  }

  startAutoRotation() {
    if (this.rotationTimer) return;
    this.rotationTimer = window.setInterval(() => {
      if (!this.map || this.viewMode !== '3d' || Date.now() < this.rotationPausedUntil) return;
      if (!this.styleReady || this.map.isMoving() || !this.mapSettings.autoSpin) return;
      const center = this.map.getCenter();
      this.map.setCenter([normalizeLongitude(center.lng + 0.018), center.lat]);
    }, 60);
  }

  stopAutoRotation() {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = null;
    }
  }
}

import {
  config,
  Language,
  Map,
  MapStyle,
  Marker
} from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { CATEGORY_MAP } from '../data/categories.js';
import { DEFAULT_SETTINGS } from '../utils/storage.js';
import { fetchAndLocalizeStyle } from './styleHelper.js';

const SPOT_SOURCE_ID = 'geomelody-spots';
const SPOT_HIT_LAYER_ID = 'geomelody-spot-hit';
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
    this.userMarker = null;
    this.userLocation = null;
  }

  async init() {
    if (this.map) return;
    if (MAPTILER_KEY) config.apiKey = MAPTILER_KEY;

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
      halo: false,
      navigationControl: false,
      geolocateControl: false,
      projectionControl: false,
      terrainControl: false,
      fullscreenControl: false,
      scaleControl: false,
      customControls: false,
      logSDKVersion: false
    });

    this.map.on('load', () => this.handleStyleReady());
    this.map.on('style.load', () => this.handleStyleReady());
    this.map.on('idle', () => {
      if (!this.map?.getLayer(SPOT_CORE_LAYER_ID)) {
        this.renderLightDotMarkers();
      }
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
    const targetSkin = skin || 'streets-dark';
    if (!this.usingMapTilerCloud) {
      return await fetchAndLocalizeStyle(targetSkin, this.currentLanguage, false);
    }

    switch (targetSkin) {
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
    if (!this.map) return;
    const style = this.map.getStyle();
    if (!style) return;

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

  applyLayerFilters() {
    if (!this.map) return;
    const style = this.map.getStyle();
    if (!style || !Array.isArray(style.layers)) return;

    const { showHillshade, showCities, showCountries, showBorders } = this.mapSettings;

    style.layers.forEach(layer => {
      const id = layer.id.toLowerCase();
      if (id.startsWith('geomelody-')) return;

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

    // If map base skin changed, cleanly switch style and restore markers
    if (newSettings.mapSkin && newSettings.mapSkin !== prevSkin && this.map && this.styleReady) {
      this.styleReady = false;
      this.interactionsBound = false;
      delete this.map.getContainer().dataset.markerLayer;
      delete this.map.getContainer().dataset.spotCount;
      const nextStyle = await this.getResolvedStyle(this.mapSettings.mapSkin);
      this.map.setStyle(nextStyle);
      this.map.once('style.load', () => this.handleStyleReady());
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
    if (!this.map) return;
    const style = this.map.getStyle();
    if (!style) return;

    const data = this.toGeoJson();
    this.map.getContainer().dataset.spotCount = String(data.features.length);

    try {
      let source = this.map.getSource(SPOT_SOURCE_ID);
      if (!source) {
        this.map.addSource(SPOT_SOURCE_ID, {
          type: 'geojson',
          data
        });
      } else {
        source.setData(data);
      }

      if (!this.map.getLayer(SPOT_HIT_LAYER_ID)) {
        this.map.addLayer({
          id: SPOT_HIT_LAYER_ID,
          type: 'circle',
          source: SPOT_SOURCE_ID,
          paint: {
            'circle-color': '#ffffff',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 24, 6, 32, 12, 44],
            'circle-opacity': 0.0001,
            'circle-pitch-alignment': 'map'
          }
        });
      }

      if (!this.map.getLayer(SPOT_GLOW_LAYER_ID)) {
        this.map.addLayer({
          id: SPOT_GLOW_LAYER_ID,
          type: 'circle',
          source: SPOT_SOURCE_ID,
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 9, 6, 15, 12, 22],
            'circle-blur': 0.96,
            'circle-opacity': 0.38,
            'circle-pitch-alignment': 'map'
          }
        });
      }

      if (!this.map.getLayer(SPOT_HALO_LAYER_ID)) {
        this.map.addLayer({
          id: SPOT_HALO_LAYER_ID,
          type: 'circle',
          source: SPOT_SOURCE_ID,
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 4.2, 6, 6.8, 12, 9.5],
            'circle-blur': 0.55,
            'circle-opacity': 0.52,
            'circle-pitch-alignment': 'map'
          }
        });
      }

      if (!this.map.getLayer(SPOT_CORE_LAYER_ID)) {
        this.map.addLayer({
          id: SPOT_CORE_LAYER_ID,
          type: 'circle',
          source: SPOT_SOURCE_ID,
          paint: {
            'circle-color': '#ffffff',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1.8, 6, 2.5, 12, 3.6],
            'circle-opacity': 0.85,
            'circle-pitch-alignment': 'map'
          }
        });
      }

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

    const interactiveLayers = [SPOT_HIT_LAYER_ID, SPOT_CORE_LAYER_ID, SPOT_HALO_LAYER_ID, SPOT_GLOW_LAYER_ID];

    const findSpotAtPoint = (point, buffer = 24) => {
      const bbox = [
        [point.x - buffer, point.y - buffer],
        [point.x + buffer, point.y + buffer]
      ];
      const validLayers = interactiveLayers.filter(id => this.map.getLayer(id));
      if (!validLayers.length) return null;
      const features = this.map.queryRenderedFeatures(bbox, { layers: validLayers });
      if (!features.length) return null;
      const spotId = features[0].properties?.id;
      return this.spots.find(item => item.id === spotId) || null;
    };

    this.map.on('mousemove', event => {
      const spot = findSpotAtPoint(event.point, 16);
      if (spot) {
        this.map.getCanvas().style.cursor = 'pointer';
        this.showTooltip(spot, event.point);
      } else {
        this.map.getCanvas().style.cursor = '';
        this.hideTooltip();
      }
    });

    this.map.on('mouseleave', () => {
      this.map.getCanvas().style.cursor = '';
      this.hideTooltip();
    });

    const handleSpotSelection = event => {
      const spot = findSpotAtPoint(event.point, 32);
      if (spot) {
        this.pauseRotation(7000);
        this.hideTooltip();
        this.onSpotSelect?.(spot);
      }
    };

    this.map.on('click', handleSpotSelection);
    this.map.on('touchend', handleSpotSelection);
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
    if (!this.map) return;
    const style = this.map.getStyle();
    if (!style || !Array.isArray(style.layers)) return;

    try {
      const isChinese = this.currentLanguage !== 'en';
      if (typeof this.map.setLanguage === 'function') {
        this.map.setLanguage(isChinese ? Language.CHINESE : Language.ENGLISH);
      }

      style.layers.forEach(layer => {
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

  setTheme(theme = 'dark') {
    this.currentTheme = theme;
    const targetSkin = theme === 'light' ? 'dataviz-light' : 'streets-dark';
    if (this.mapSettings.mapSkin !== targetSkin) {
      this.applyMapSettings({ mapSkin: targetSkin });
    }
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
    canvas.addEventListener('cancel', resumeSoon, { passive: true });
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

  setUserLocation({ lng, lat, accuracy }) {
    if (!this.map || typeof lng !== 'number' || typeof lat !== 'number') return;
    this.userLocation = { lng, lat, accuracy };

    if (!this.userMarker) {
      const el = document.createElement('div');
      el.className = 'user-location-marker';
      el.setAttribute('title', this.currentLanguage === 'en' ? 'My Location' : '我的位置');
      el.innerHTML = `
        <div class="user-radar-ring"></div>
        <div class="user-radar-ring ring-2"></div>
        <div class="user-marker-dot"></div>
        <div class="user-marker-badge">${this.currentLanguage === 'en' ? 'My Location' : '我的位置'}</div>
      `;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.flyToUserLocation();
      });
      this.userMarker = new Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(this.map);
    } else {
      this.userMarker.setLngLat([lng, lat]);
      const badge = this.userMarker.getElement()?.querySelector('.user-marker-badge');
      if (badge) badge.textContent = this.currentLanguage === 'en' ? 'My Location' : '我的位置';
    }

    this.flyToUserLocation();
  }

  getUserLocation() {
    return this.userLocation;
  }

  flyToUserLocation() {
    if (!this.map || !this.userLocation) return;
    this.pauseRotation(10000);
    const targetZoom = this.viewMode === '3d' ? 6.5 : 9.0;
    this.map.flyTo({
      center: [this.userLocation.lng, this.userLocation.lat],
      zoom: targetZoom,
      pitch: this.viewMode === '3d' ? 20 : 0,
      bearing: 0,
      duration: 1800,
      essential: true
    });
  }

  stopAutoRotation() {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = null;
    }
  }
}

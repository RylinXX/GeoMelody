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
  constructor({ containerId, spots, onSpotSelect, onMapClick, language = 'zh', theme = 'dark', settings = {} }) {
    this.containerId = containerId;
    this.spots = spots;
    this.onSpotSelect = onSpotSelect;
    this.onMapClick = onMapClick;
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
    this.airplaneMarker = null;
    this.airplaneProgress = 0.0;
    this.flightOrbitCoords = [];
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
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 22, 6, 30, 12, 38],
            'circle-opacity': 0.0001,
            'circle-pitch-alignment': 'viewport'
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
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 8, 6, 13, 12, 20],
            'circle-blur': 0.96,
            'circle-opacity': 0.38,
            'circle-pitch-alignment': 'viewport'
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
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 3.8, 6, 6.2, 12, 8.5],
            'circle-blur': 0.55,
            'circle-opacity': 0.52,
            'circle-pitch-alignment': 'viewport'
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
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1.6, 6, 2.3, 12, 3.2],
            'circle-opacity': 0.85,
            'circle-pitch-alignment': 'viewport'
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

    const normalizeLng = lng => ((((lng + 180) % 360) + 360) % 360) - 180;

    const findSpotAtPoint = (point, buffer = 32) => {
      if (!point || typeof point.x !== 'number') return null;

      // 1. Direct screen projection check
      let closestSpot = null;
      let minDistance = buffer * buffer;
      const center = this.map.getCenter();
      const cLng = normalizeLng(center.lng);
      const cLat = center.lat;

      for (const spot of this.spots) {
        if (this.currentCategory !== 'all' && spot.category !== this.currentCategory) continue;

        // In 3D globe mode, check if point is roughly facing camera (within 90 degrees)
        if (this.viewMode === '3d') {
          const sLng = normalizeLng(spot.lng);
          let dLng = Math.abs(sLng - cLng);
          if (dLng > 180) dLng = 360 - dLng;
          const dLat = Math.abs(spot.lat - cLat);
          if (dLng > 90 || dLat > 90) continue;
        }

        try {
          const spotPoint = this.map.project([spot.lng, spot.lat]);
          const dx = spotPoint.x - point.x;
          const dy = spotPoint.y - point.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < minDistance) {
            minDistance = distSq;
            closestSpot = spot;
          }
        } catch (_) {}
      }

      if (closestSpot) return closestSpot;

      // 2. Layer feature query fallback
      try {
        const validLayers = interactiveLayers.filter(id => this.map.getLayer(id));
        if (validLayers.length) {
          const bbox = [
            [point.x - buffer, point.y - buffer],
            [point.x + buffer, point.y + buffer]
          ];
          const features = this.map.queryRenderedFeatures(bbox, { layers: validLayers });
          if (features.length) {
            const spotId = features[0].properties?.id;
            return this.spots.find(item => item.id === spotId) || null;
          }
        }
      } catch (_) {}

      return null;
    };

    this.map.on('mousemove', event => {
      const spot = findSpotAtPoint(event.point, 20);
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

    let lastSpotActionTime = 0;

    const selectSpot = (spot) => {
      lastSpotActionTime = Date.now();
      this.pauseRotation(8000);
      this.hideTooltip();
      this.onSpotSelect?.(spot);
    };

    // Native DOM Touch Support for Instant Mobile Response
    const canvas = this.map.getCanvas();
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    canvas?.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    canvas?.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const elapsed = Date.now() - touchStartTime;
        // Finger moved less than 16px and released within 450ms -> Genuine Tap!
        if (Math.hypot(dx, dy) < 16 && elapsed < 450) {
          const rect = canvas.getBoundingClientRect();
          const point = {
            x: e.changedTouches[0].clientX - rect.left,
            y: e.changedTouches[0].clientY - rect.top
          };
          const spot = findSpotAtPoint(point, 38);
          if (spot) {
            selectSpot(spot);
          } else {
            if (Date.now() - lastSpotActionTime > 400) {
              this.onMapClick?.(point);
            }
          }
        }
      }
    }, { passive: true });

    // MapLibre Layer Click and Canvas Click
    interactiveLayers.forEach(layerId => {
      if (this.map.getLayer(layerId)) {
        this.map.on('click', layerId, (e) => {
          const spotId = e.features?.[0]?.properties?.id;
          const spot = this.spots.find(s => s.id === spotId);
          if (spot) {
            selectSpot(spot);
          }
        });
      }
    });

    this.map.on('click', (event) => {
      const now = Date.now();
      if (now - lastSpotActionTime < 300) return;

      const spot = findSpotAtPoint(event.point, 28);
      if (spot) {
        selectSpot(spot);
      } else {
        if (now - lastSpotActionTime > 400) {
          this.onMapClick?.(event);
        }
      }
    });

    if (this.tooltip) {
      this.tooltip.addEventListener('click', () => {
        if (this.hoveredSpot) {
          selectSpot(this.hoveredSpot);
        }
      });
    }
  }

  showTooltip(spot, point) {
    if (!this.tooltip) return;
    this.hoveredSpot = spot;
    const name = this.currentLanguage === 'en' ? (spot.enName || spot.name) : spot.name;
    const location = this.currentLanguage === 'en'
      ? (spot.enLocation || spot.location)
      : spot.location;
    const hint = this.currentLanguage === 'en' ? 'Click to listen' : '点击聆听 ➔';
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
    this.hoveredSpot = null;
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

  calculateBearing(lng1, lat1, lng2, lat2) {
    const y = Math.sin((lng2 - lng1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos((lng2 - lng1) * Math.PI / 180);
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }

  generateFlightOrbit() {
    const originLng = this.userLocation?.lng ?? 120.15;
    const originLat = this.userLocation?.lat ?? 30.25;

    // Generate round-the-world orbital waypoints starting from user location
    const rawWaypoints = [
      [originLng, originLat],
      [originLng + 24, originLat + 4],
      [originLng + 55, originLat - 6],
      [originLng + 105, originLat - 10],
      [originLng + 155, originLat + 8],
      [originLng + 205, originLat + 14],
      [originLng + 255, originLat + 6],
      [originLng + 305, originLat - 5],
      [originLng + 360, originLat]
    ];

    // Interpolate 1200 smooth geodesic trajectory coordinates
    const interpolated = [];
    const stepsPerSegment = 150;

    for (let i = 0; i < rawWaypoints.length - 1; i++) {
      const p1 = rawWaypoints[i];
      const p2 = rawWaypoints[i + 1];
      for (let s = 0; s < stepsPerSegment; s++) {
        const t = s / stepsPerSegment;
        const mu = (1 - Math.cos(t * Math.PI)) / 2;
        const lng = p1[0] * (1 - mu) + p2[0] * mu;
        const lat = p1[1] * (1 - mu) + p2[1] * mu;
        interpolated.push([normalizeLongitude(lng), lat]);
      }
    }
    this.flightOrbitCoords = interpolated;
  }

  initAirplaneMarker() {
    if (this.airplaneMarker || !this.map) return;
    this.generateFlightOrbit();

    const el = document.createElement('div');
    el.className = 'globe-airplane-container';
    el.id = 'globe-airplane-marker';
    el.title = this.currentLanguage === 'en' ? '✈️ Orbiting Earth' : '✈️ 环球漫游飞行中';
    el.innerHTML = `
      <div class="airplane-body-wrapper" id="airplane-body-wrapper">
        <svg class="airplane-svg" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
        <div class="airplane-afterburner"></div>
      </div>
      <div class="airplane-flight-tooltip">${this.currentLanguage === 'en' ? '✈️ Orbiting World' : '✈️ 环球漫游中'}</div>
    `;

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      this.followAirplane();
    });

    const startPos = this.flightOrbitCoords[0] || [120.15, 30.25];
    this.airplaneMarker = new Marker({ element: el })
      .setLngLat(startPos)
      .addTo(this.map);

    this.stepAirplaneFlight(true);
  }

  stepAirplaneFlight(forceUpdate = false) {
    if (!this.airplaneMarker || !this.flightOrbitCoords.length) return;

    if (!forceUpdate) {
      this.airplaneProgress = (this.airplaneProgress + 0.0006) % 1.0;
    }

    const totalPoints = this.flightOrbitCoords.length;
    const currentIndex = Math.floor(this.airplaneProgress * (totalPoints - 1));
    const nextIndex = (currentIndex + 4) % totalPoints;

    const currentCoord = this.flightOrbitCoords[currentIndex];
    const nextCoord = this.flightOrbitCoords[nextIndex];

    if (currentCoord && nextCoord) {
      this.airplaneMarker.setLngLat(currentCoord);
      const bearing = this.calculateBearing(currentCoord[0], currentCoord[1], nextCoord[0], nextCoord[1]);
      const bodyWrapper = this.airplaneMarker.getElement()?.querySelector('.airplane-body-wrapper');
      if (bodyWrapper) {
        bodyWrapper.style.transform = `rotate(${bearing}deg)`;
      }
    }
  }

  followAirplane() {
    if (!this.airplaneMarker || !this.map) return;
    this.pauseRotation(8000);
    const lngLat = this.airplaneMarker.getLngLat();
    this.map.flyTo({
      center: [lngLat.lng, lngLat.lat],
      zoom: this.viewMode === '3d' ? 5.5 : 7.0,
      duration: 1500,
      essential: true
    });
  }

  startAutoRotation() {
    if (this.rotationTimer) return;
    this.initAirplaneMarker();
    this.rotationTimer = window.setInterval(() => {
      if (!this.map || this.viewMode !== '3d' || Date.now() < this.rotationPausedUntil) return;
      if (!this.styleReady || this.map.isMoving() || !this.mapSettings.autoSpin) return;
      const center = this.map.getCenter();
      this.map.setCenter([normalizeLongitude(center.lng + 0.018), center.lat]);
      this.stepAirplaneFlight();
    }, 60);
  }

  setUserLocation({ lng, lat, accuracy }) {
    if (!this.map || typeof lng !== 'number' || typeof lat !== 'number') return;
    this.userLocation = { lng, lat, accuracy };
    this.generateFlightOrbit();

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

    if (!this.airplaneMarker) {
      this.initAirplaneMarker();
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

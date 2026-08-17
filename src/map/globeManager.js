import {
  config,
  Language,
  Map,
  MapStyle,
  Marker
} from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { CATEGORY_MAP } from '../data/categories.js';
import { getDemoTrack } from '../data/demoTracks.js';
import { getSpotName } from '../utils/i18n.js';
import { DEFAULT_SETTINGS } from '../utils/storage.js';
import { fetchAndLocalizeStyle, fetchWhiteTerrainStyle, fetchFastDeepBlueStyle } from './styleHelper.js';
import { StarfieldEngine } from './starfield.js';

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

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

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
  constructor({ containerId, spots, onSpotSelect, onFlybyPlay, onMapClick, onRoamingChange, language = 'zh', theme = 'dark', settings = {} }) {
    this.containerId = containerId;
    this.spots = spots;
    this.onSpotSelect = onSpotSelect;
    this.onFlybyPlay = onFlybyPlay;
    this.onMapClick = onMapClick;
    this.onRoamingChange = onRoamingChange;
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
    this.isAirplaneActive = false;
    this.isRoaming = false;
    this.currentFlybySpot = null;
    this.lastFlybyRotationTime = 0;
    this.flybyCandidateIndex = 0;
    this.starfield = new StarfieldEngine('cosmic-starfield-canvas');
    this.starfield.setTheme(this.currentTheme);
    this.starfield.setEnabled(this.mapSettings.showStars);
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
      space: { color: 'rgba(0, 0, 0, 0)' },
      halo: false,
      attributionControl: false,
      navigationControl: false,
      geolocateControl: false,
      projectionControl: false,
      terrainControl: false,
      fullscreenControl: false,
      scaleControl: false,
      customControls: false,
      logSDKVersion: false
    });

    this.map.once('load', () => this.handleStyleReady());
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

    // Mobile Viewport Dynamic Resize Engine: Ensures 100% full-screen canvas on mobile refresh
    const container = document.getElementById(this.containerId);
    if (container && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.map?.resize();
      });
      this.resizeObserver.observe(container);
    }

    const triggerResize = () => {
      if (this.map) {
        this.map.resize();
      }
    };
    window.addEventListener('resize', triggerResize, { passive: true });
    window.addEventListener('orientationchange', triggerResize, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', triggerResize, { passive: true });
    }

    // Staged resize executions to adapt to mobile browser URL bar & viewport settlement
    requestAnimationFrame(triggerResize);
    setTimeout(triggerResize, 60);
    setTimeout(triggerResize, 200);
    setTimeout(triggerResize, 500);
    setTimeout(triggerResize, 1000);

    this.bindRotationPauseEvents();
    if (this.mapSettings.autoSpin) {
      this.startAutoRotation();
    }
  }

  async getResolvedStyle(skin) {
    const targetSkin = skin || '01-dark';

    // 1. 02 White Terrain High-Contrast Theme (白色陆地 · 灰色山脉 · 深蓝海洋)
    if (targetSkin === 'white-terrain' || targetSkin === 'light' || targetSkin === '02-white-terrain') {
      return await fetchWhiteTerrainStyle(MAPTILER_KEY, this.currentLanguage);
    }

    // 2. 03 Fast Deep Blue Theme (极速深海蓝 · 极轻量深蓝夜色 · 秒开加载)
    if (targetSkin === '03-fast-blue' || targetSkin === '03-fast-dark' || targetSkin === 'fast-dark' || targetSkin === 'dataviz-dark' || targetSkin === 'fast-blue') {
      return await fetchFastDeepBlueStyle(MAPTILER_KEY, this.currentLanguage);
    }

    // 3. 01 Classic Dark Streets Theme (01 经典深色街道 / 细腻路网与丰富地标)
    if (!this.usingMapTilerCloud) {
      return await fetchAndLocalizeStyle('streets-dark', this.currentLanguage, false);
    }
    return MapStyle.STREETS?.DARK ?? MapStyle.BASE?.DARK;
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

      if (layer.type === 'background') {
        try {
          this.map.setPaintProperty(layer.id, 'background-opacity', 1);
        } catch (_) {}
      }

      // Filter out any dayTexture, white stylized surface textures, and daytime light overlays
      const isDayTexture =
        id.includes('day') ||
        id.includes('daytexture') ||
        id.includes('earth_day') ||
        id.includes('sunlight') ||
        id.includes('daylight') ||
        id.includes('atmosphere') ||
        id.includes('cloud');

      if (isDayTexture) {
        try {
          this.map.setLayoutProperty(layer.id, 'visibility', this.currentTheme === 'dark' ? 'none' : 'visible');
        } catch (_) {}
      }

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
    const skinChanged = newSettings.mapSkin && newSettings.mapSkin !== this.mapSettings.mapSkin;
    this.mapSettings = { ...this.mapSettings, ...newSettings };

    if (skinChanged) {
      await this.setMapSkin(newSettings.mapSkin);
    }

    this.applyLayerFilters();
    this.updateSpaceAppearance();

    if (this.mapSettings.autoSpin) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  async setMapSkin(skin) {
    if (!this.map || this.mapSettings.mapSkin === skin) return;

    // Loading transition indicator
    const mapContainer = document.getElementById(this.containerId);
    if (mapContainer) {
      mapContainer.style.transition = 'opacity 0.3s ease';
      mapContainer.style.opacity = '0.6';
    }

    this.mapSettings.mapSkin = skin;
    const isLightSkin = skin === 'white-terrain' || skin === 'light' || skin === '02-white-terrain';
    this.setTheme(isLightSkin ? 'light' : 'dark');

    this.styleReady = false;
    this.interactionsBound = false;
    delete this.map.getContainer().dataset.markerLayer;
    delete this.map.getContainer().dataset.spotCount;

    try {
      const nextStyle = await this.getResolvedStyle(skin);
      this.map.setStyle(nextStyle);
      
      const onStyleReady = () => {
        this.handleStyleReady();
        if (mapContainer) mapContainer.style.opacity = '1';
      };
      
      this.map.once('style.load', onStyleReady);
      this.map.once('idle', onStyleReady);
    } catch (e) {
      console.warn('[GeoMelody map] Failed to load style for skin', skin, e);
      if (skin !== '01-dark' && skin !== 'dark') {
        this.setMapSkin('01-dark');
      } else {
        if (mapContainer) mapContainer.style.opacity = '1';
      }
    }
  }

  updateSpaceAppearance() {
    if (this.starfield) {
      this.starfield.setTheme(this.currentTheme);
      this.starfield.setEnabled(this.mapSettings.showStars);
    }
    if (!this.map) return;
    try {
      if (this.viewMode === '3d') {
        if (typeof this.map.setSpace === 'function') {
          this.map.setSpace({ color: 'rgba(0, 0, 0, 0)' });
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
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 14, 6, 20, 12, 28],
            'circle-opacity': 0.01,
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
    if (this.interactionsBound || !this.map) return;
    this.interactionsBound = true;

    const interactiveLayers = [SPOT_HIT_LAYER_ID, SPOT_CORE_LAYER_ID, SPOT_HALO_LAYER_ID, SPOT_GLOW_LAYER_ID];

    const findSpotAtPoint = (point, buffer = 18) => {
      if (!point || typeof point.x !== 'number') return null;

      // 1. Layer feature query (most accurate on rendered canvas)
      try {
        const validLayers = interactiveLayers.filter(id => this.map.getLayer(id));
        if (validLayers.length) {
          const bbox = [
            [point.x - buffer, point.y - buffer],
            [point.x + buffer, point.y + buffer]
          ];
          const features = this.map.queryRenderedFeatures(bbox, { layers: validLayers });
          if (features && features.length) {
            const spotId = features[0].properties?.id;
            const match = this.spots.find(item => item.id === spotId);
            if (match && (this.currentCategory === 'all' || match.category === this.currentCategory)) {
              return match;
            }
          }
        }
      } catch (_) {}

      // 2. Direct screen projection check
      let closestSpot = null;
      let minDistance = buffer * buffer;
      const center = this.map.getCenter();
      const lat1 = center.lat * Math.PI / 180;
      const lon1 = center.lng * Math.PI / 180;

      for (const spot of this.spots) {
        if (this.currentCategory !== 'all' && spot.category !== this.currentCategory) continue;

        // In 3D globe mode, ensure spot is on the front side of the earth facing camera
        if (this.viewMode === '3d') {
          const lat2 = spot.lat * Math.PI / 180;
          const lon2 = spot.lng * Math.PI / 180;
          const cosAngle = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
          if (cosAngle <= 0.05) continue;
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

      return closestSpot;
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

    let lastSpotActionTime = 0;

    const selectSpot = (spot) => {
      if (!spot) return;
      lastSpotActionTime = Date.now();
      this.pauseRotation(10000);
      this.hideTooltip();
      this.onSpotSelect?.(spot);
    };

    // Layer Clicks (Desktop & Mobile)
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

    // Map General Click / Tap (Desktop & Mobile)
    this.map.on('click', (event) => {
      const spot = findSpotAtPoint(event.point, 18);
      if (spot) {
        selectSpot(spot);
      } else {
        if (Date.now() - lastSpotActionTime > 450) {
          this.onMapClick?.(event);
        }
      }
    });

    // Mobile Canvas Touch Tap Handling (Refined touch radius ~24px)
    const canvas = this.map.getCanvas();
    let touchStartPt = null;
    let touchStartT = 0;

    canvas?.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartPt = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchStartT = Date.now();
      }
    }, { passive: true });

    canvas?.addEventListener('touchend', (e) => {
      if (touchStartPt && e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartPt.x;
        const dy = e.changedTouches[0].clientY - touchStartPt.y;
        const dt = Date.now() - touchStartT;
        // Clean tap within 350ms and moved < 12px
        if (Math.hypot(dx, dy) < 12 && dt < 350) {
          const rect = canvas.getBoundingClientRect();
          const point = {
            x: e.changedTouches[0].clientX - rect.left,
            y: e.changedTouches[0].clientY - rect.top
          };
          const spot = findSpotAtPoint(point, 24);
          if (spot) {
            selectSpot(spot);
          }
        }
      }
      touchStartPt = null;
    }, { passive: true });

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
    this.pauseRotation(1500);
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
    if (this.isRoaming) {
      this.showAirplane();
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
    if (this.starfield) {
      this.starfield.setTheme(this.currentTheme);
      this.starfield.setEnabled(this.mapSettings.showStars);
    }
  }

  flyToSpot(spot, zoom, showFlyby = true) {
    if (!this.map || !spot) return;
    const targetZoom = zoom ?? (this.viewMode === '3d' ? 5.4 : 7);
    this.pauseRotation(10000);
    this.showAirplane();
    this.currentFlybySpot = spot;
    if (showFlyby) {
      this.showFlybyCard(spot);
    }
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
    if (!this.isRoaming) {
      this.hideAirplane();
    }
  }

  showAirplane() {
    this.isAirplaneActive = true;
    const overlay = document.getElementById('globe-center-flight-overlay');
    if (overlay) {
      overlay.classList.remove('hidden');
      overlay.setAttribute('aria-hidden', 'false');
    }
  }

  hideAirplane() {
    this.isAirplaneActive = false;
    this.hideFlybyCard();
    const overlay = document.getElementById('globe-center-flight-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  toggleRoamingMode() {
    if (this.isRoaming) {
      this.stopRoamingMode();
      return false;
    } else {
      this.startRoamingMode();
      return true;
    }
  }

  startRoamingMode() {
    this.isRoaming = true;
    this.rotationPausedUntil = 0;
    this.showAirplane();
    this.onRoamingChange?.(true);
    if (!this.rotationTimer) {
      this.startAutoRotation();
    }
  }

  stopRoamingMode() {
    this.isRoaming = false;
    this.pauseRotation(20000);
    this.hideAirplane();
    this.onRoamingChange?.(false);
  }

  checkFlyoverSpots(center) {
    if (!this.isAirplaneActive || !this.spots.length) {
      this.hideFlybyCard();
      return;
    }

    const cLng = normalizeLongitude(center.lng);
    const cLat = center.lat;

    const zoom = this.map?.getZoom() ?? 2.2;
    // Scale detection range based on zoom level:
    const zoomScale = Math.pow(2, Math.min(0, 2.2 - zoom));
    const enterRadiusKm = Math.max(5, 500 * zoomScale);
    const now = Date.now();

    // Find all spots within flyby detection range
    const nearbySpots = [];
    for (const spot of this.spots) {
      const dist = calculateDistanceKm(cLat, cLng, spot.lat, spot.lng);
      if (dist < enterRadiusKm) {
        nearbySpots.push(spot);
      }
    }

    if (nearbySpots.length > 0) {
      // If there are multiple spots nearby (e.g. 2, 3, or more)
      // Rotate every 3 seconds (3000ms) smoothly through the candidate spots!
      if (now - this.lastFlybyRotationTime > 3000) {
        this.lastFlybyRotationTime = now;
        this.flybyCandidateIndex = (this.flybyCandidateIndex + 1) % nearbySpots.length;
        const nextSpot = nearbySpots[this.flybyCandidateIndex];
        this.currentFlybySpot = nextSpot;
        this.showFlybyCard(nextSpot);
      } else if (!this.currentFlybySpot || !nearbySpots.some(s => s.id === this.currentFlybySpot?.id)) {
        // Current spot is no longer in nearby list or not initialized -> show first nearby spot
        this.flybyCandidateIndex = 0;
        const chosen = nearbySpots[0];
        this.currentFlybySpot = chosen;
        this.lastFlybyRotationTime = now;
        this.showFlybyCard(chosen);
      }
    } else {
      // When there are no nearby spots (e.g. flying over ocean / sparse regions):
      // Keep displaying the previously shown song (一直显示之前的一首歌儿)!
      // If none was ever displayed, pick a random spot from the global library:
      if (!this.currentFlybySpot) {
        const randomSpot = this.spots[Math.floor(Math.random() * this.spots.length)];
        this.currentFlybySpot = randomSpot;
        this.lastFlybyRotationTime = now;
        this.showFlybyCard(randomSpot);
      }
    }
  }

  showFlybyCard(spot) {
    const card = document.getElementById('center-flyby-card');
    const badge = document.getElementById('center-flight-badge');
    if (!card || !spot) return;

    const coverImg = document.getElementById('flyby-cover-img');
    const nameEl = document.getElementById('flyby-spot-name');
    const trackEl = document.getElementById('flyby-track-title');

    if (coverImg) coverImg.src = spot.photos?.[0] || '';
    if (nameEl) nameEl.textContent = getSpotName(spot, this.currentLanguage);
    if (trackEl) {
      const track = getDemoTrack(spot);
      trackEl.textContent = track ? `${track.title} — ${track.creator}` : (spot.audioRecipe?.scale || '胜景专属乐曲');
    }

    if (badge) badge.style.display = 'none';
    card.style.display = 'flex';

    // 1. Left side click: Smoothly fly the camera to this spot's exact location!
    const leftSide = document.getElementById('flyby-left-side');
    if (leftSide) {
      leftSide.onclick = (e) => {
        e.stopPropagation();
        this.pauseRotation(6000);
        this.flyToSpot(spot, this.viewMode === '3d' ? 5.8 : 7.5);
      };
    }

    // 2. Right "听这首" button click: Immediately open the player and start music!
    const playBtn = document.getElementById('btn-flyby-play');
    if (playBtn) {
      playBtn.onclick = (e) => {
        e.stopPropagation();
        this.pauseRotation(15000);
        if (this.onFlybyPlay) {
          this.onFlybyPlay(spot);
        } else {
          this.onSpotSelect?.(spot);
        }
      };
    }
  }

  hideFlybyCard() {
    this.currentFlybySpot = null;
    const card = document.getElementById('center-flyby-card');
    const badge = document.getElementById('center-flight-badge');
    if (card) card.style.display = 'none';
    if (badge && this.isAirplaneActive) badge.style.display = 'inline-flex';
  }

  startAutoRotation() {
    if (this.rotationTimer) return;
    let lastTickTime = performance.now();

    this.rotationTimer = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.1, Math.max(0.001, (now - lastTickTime) / 1000));
      lastTickTime = now;

      if (!this.map) return;

      const isPaused = Date.now() < this.rotationPausedUntil;
      // Roaming mode flies in BOTH 3D globe and 2D flat mode!
      // Standby auto-spin runs when autoSpin is enabled.
      if (isPaused || (!this.isRoaming && !this.mapSettings.autoSpin)) {
        if (!this.isRoaming && this.isAirplaneActive) {
          this.hideAirplane();
        }
        return;
      }

      if (!this.styleReady || this.map.isMoving()) {
        return;
      }

      // Standby Auto-Cruise Trigger:
      // When the globe starts rotating after standby idle timeout, automatically engage Cruise/Roaming mode!
      if (!this.isRoaming && this.mapSettings.autoSpin) {
        this.isRoaming = true;
        this.showAirplane();
        this.onRoamingChange?.(true);
      } else if (this.isRoaming) {
        if (!this.isAirplaneActive) {
          this.showAirplane();
        }
      }
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();

      // Precision Screen-Pixel Velocity Model:
      // Controls the physical linear speed of ground movement across the user's screen.
      // - Mobile: ~18.5 CSS pixels/second (calm, visible, smooth, never sluggish)
      // - Desktop: ~20.0 CSS pixels/second (tranquil, cinematic, never too fast)
      const isMobile = window.innerWidth <= 768;
      const targetPixelSpeed = isMobile ? 18.5 : 20.0;

      // In MapLibre projection:
      // At zoom Z and latitude lat, the circumference parallel in pixels is 512 * 2^Z * cos(lat).
      // So 1 pixel = 360 / (512 * 2^Z * cos(lat)) degrees.
      const latRad = center.lat * Math.PI / 180;
      const cosLat = Math.max(0.25, Math.cos(latRad));
      const degPerPixel = 360.0 / (512.0 * Math.pow(2, zoom) * cosLat);
      const stepLng = targetPixelSpeed * degPerPixel * dt;

      const nextLng = normalizeLongitude(center.lng + stepLng);
      this.map.setCenter([nextLng, center.lat]);
      this.checkFlyoverSpots({ lng: nextLng, lat: center.lat });
    }, 33);
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

    this.hideAirplane();
    this.flyToUserLocation();
  }

  getUserLocation() {
    return this.userLocation;
  }

  flyToUserLocation() {
    if (!this.map || !this.userLocation) return;
    this.pauseRotation(10000);
    
    const center = this.map.getCenter();
    const currentZoom = this.map.getZoom();
    
    const dLat = Math.abs(center.lat - this.userLocation.lat);
    let dLng = Math.abs(center.lng - this.userLocation.lng);
    while (dLng > 180) dLng -= 360;
    dLng = Math.abs(dLng);
    
    const isClose = dLat < 0.5 && dLng < 0.5;
    const baseZoom = this.viewMode === '3d' ? 6.5 : 9.0;
    const streetZoom = this.viewMode === '3d' ? 14.5 : 15.0;
    
    let targetZoom = baseZoom;
    let targetPitch = this.viewMode === '3d' ? 20 : 0;
    
    if (isClose && currentZoom >= baseZoom - 0.5) {
      if (currentZoom >= streetZoom - 1.0) {
        // Toggle back to city level
        targetZoom = baseZoom;
        targetPitch = this.viewMode === '3d' ? 20 : 0;
      } else {
        // Zoom to street level
        targetZoom = streetZoom;
        targetPitch = this.viewMode === '3d' ? 55 : 0;
      }
    }

    this.map.flyTo({
      center: [this.userLocation.lng, this.userLocation.lat],
      zoom: targetZoom,
      pitch: targetPitch,
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

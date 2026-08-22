/**
 * Style Helper for GeoMelody
 * Pre-fetches and localizes map styles to guarantee:
 * 1. 100% Chinese country/city names from the very first frame.
 * 2. Instant dark/light cosmic background.
 * 3. Fresh deep clones so MapLibre state mutations never corrupt cached styles.
 */

const STYLE_CACHE = new Map();
const OPENFREEMAP_VECTOR_SOURCE = 'https://tiles.openfreemap.org/planet';
const OPENFREEMAP_GLYPHS = 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf';

const CHINESE_TEXT_FIELD = [
  'coalesce',
  ['get', 'name:zh'],
  ['get', 'name_zh'],
  ['get', 'name:zh-Hans'],
  ['get', 'name:zh_Hans'],
  ['get', 'name:zh-Hant'],
  ['get', 'name:zh_Hant'],
  ['get', 'name'],
  ['get', 'name:latin']
];

const ENGLISH_TEXT_FIELD = [
  'coalesce',
  ['get', 'name:en'],
  ['get', 'name_en'],
  ['get', 'name:latin'],
  ['get', 'name']
];

/**
 * 1. 01. 经典深色街道 (01-dark / streets-dark)
 */
export async function fetchAndLocalizeStyle(skin = 'streets-dark', language = 'zh', showHillshade = false) {
  const cacheKey = `streets-dark-${language}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }

  const url = 'https://tiles.openfreemap.org/styles/dark';
  try {
    const response = await fetch(url);
    const styleJson = await response.json();
    const isChinese = language !== 'en';
    const targetTextField = isChinese ? CHINESE_TEXT_FIELD : ENGLISH_TEXT_FIELD;

    const bgLayer = styleJson.layers?.find(l => l.type === 'background');
    if (bgLayer) {
      bgLayer.paint = {
        ...(bgLayer.paint || {}),
        'background-color': '#060a14',
        'background-opacity': 1
      };
    }

    if (Array.isArray(styleJson.layers)) {
      styleJson.layers.forEach(layer => {
        if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
          layer.layout = { ...layer.layout, 'text-field': targetTextField };
        }
      });
    }

    STYLE_CACHE.set(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (error) {
    console.warn('[GeoMelody StyleHelper] Failed to localize dark style', error);
    return url;
  }
}

/**
 * 2. 02. 白色立体地形 / 纯白陆地主题 (white-terrain)
 */
export async function fetchWhiteTerrainStyle(apiKey, language = 'zh') {
  const cacheKey = `white-terrain-${language}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }

  const url = 'https://tiles.openfreemap.org/styles/positron';
  try {
    const res = await fetch(url);
    const styleJson = await res.json();
    const isChinese = language !== 'en';
    const targetTextField = isChinese ? CHINESE_TEXT_FIELD : ENGLISH_TEXT_FIELD;

    if (Array.isArray(styleJson.layers)) {
      styleJson.layers.forEach(l => {
        if (l.type === 'background') {
          l.paint = { ...(l.paint || {}), 'background-color': '#ffffff', 'background-opacity': 1 };
        } else if (l.type === 'symbol' && l.layout && l.layout['text-field']) {
          l.layout = { ...l.layout, 'text-field': targetTextField };
        }
      });
    }

    STYLE_CACHE.set(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (err) {
    console.warn('[GeoMelody StyleHelper] Failed to fetch white terrain style', err);
    return 'https://tiles.openfreemap.org/styles/positron';
  }
}

/**
 * 3. 03. 极速深海蓝 (03-fast-blue)
 */
export async function fetchFastDeepBlueStyle(apiKey, language = 'zh') {
  const cacheKey = `fast-deep-blue-${language}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }

  // A genuinely minimal first-paint style. Country labels are added after the
  // globe is interactive so glyph downloads never block the first useful frame.
  const styleJson = {
    version: 8,
    glyphs: OPENFREEMAP_GLYPHS,
    sources: {
      openmaptiles: {
        type: 'vector',
        url: OPENFREEMAP_VECTOR_SOURCE
      }
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#0a2034',
          'background-opacity': 1
        }
      },
      {
        id: 'water',
        type: 'fill',
        source: 'openmaptiles',
        'source-layer': 'water',
        filter: [
          'all',
          ['match', ['geometry-type'], ['MultiPolygon', 'Polygon'], true, false],
          ['!=', ['get', 'brunnel'], 'tunnel']
        ],
        paint: {
          'fill-antialias': false,
          'fill-color': '#03111f'
        }
      },
      {
        id: 'boundary_country_fast',
        type: 'line',
        source: 'openmaptiles',
        'source-layer': 'boundary',
        filter: ['==', ['get', 'admin_level'], 2],
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#38bdf8',
          'line-opacity': 0.68,
          'line-width': ['interpolate', ['linear'], ['zoom'], 1, 0.55, 6, 1.15, 12, 2]
        }
      }
    ]
  };

  STYLE_CACHE.set(cacheKey, styleJson);
  return JSON.parse(JSON.stringify(styleJson));
}

export function createDeferredCountryLabelLayer(language = 'zh') {
  return {
    id: 'place_country_fast',
    type: 'symbol',
    source: 'openmaptiles',
    'source-layer': 'place',
    maxzoom: 8,
    filter: ['all', ['==', ['get', 'class'], 'country'], ['has', 'iso_a2']],
    layout: {
      'text-field': language === 'en' ? ENGLISH_TEXT_FIELD : CHINESE_TEXT_FIELD,
      'text-font': ['Noto Sans Regular'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 0, 9, 5, 13],
      'text-max-width': 8,
      'text-allow-overlap': false
    },
    paint: {
      'text-color': '#bae6fd',
      'text-halo-color': 'rgba(2, 6, 23, 0.9)',
      'text-halo-width': 1.2
    }
  };
}

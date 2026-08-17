/**
 * Style Helper for GeoMelody
 * Pre-fetches and localizes map styles to guarantee:
 * 1. 100% Chinese country/city names from the very first frame (zero English flash).
 * 2. Instant dark cosmic background (zero white flash).
 * 3. Fresh deep clones so MapLibre state mutations never corrupt cached styles.
 */

const STYLE_CACHE = new Map();

const FALLBACK_STYLES = {
  'fast-dark': 'https://tiles.openfreemap.org/styles/dark',
  'rich-dark': 'https://tiles.openfreemap.org/styles/dark',
  'light': 'https://tiles.openfreemap.org/styles/positron',
  'streets-dark': 'https://tiles.openfreemap.org/styles/dark',
  'dataviz-dark': 'https://tiles.openfreemap.org/styles/dark',
  'backdrop-dark': 'https://tiles.openfreemap.org/styles/dark',
  'dataviz-light': 'https://tiles.openfreemap.org/styles/positron',
  'satellite': 'https://tiles.openfreemap.org/styles/dark'
};

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

export async function fetchAndLocalizeStyle(skin = 'streets-dark', language = 'zh', showHillshade = false) {
  const cacheKey = `${skin}-${language}-${showHillshade}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }

  const url = FALLBACK_STYLES[skin] || FALLBACK_STYLES['streets-dark'];
  try {
    const response = await fetch(url);
    const styleJson = await response.json();
    const isChinese = language !== 'en';
    const targetTextField = isChinese ? CHINESE_TEXT_FIELD : ENGLISH_TEXT_FIELD;

    // 1. Ensure Earth base layer is solid and opaque so background stars never shine through the globe
    const bgLayer = styleJson.layers?.find(l => l.type === 'background');
    if (bgLayer) {
      bgLayer.paint = {
        ...(bgLayer.paint || {}),
        'background-color': skin.includes('light') ? '#f1f5f9' : '#060a14',
        'background-opacity': 1
      };
    }

    // 2. Pre-configure text-fields with Chinese/English priority on all label layers
    if (Array.isArray(styleJson.layers)) {
      styleJson.layers.forEach(layer => {
        if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
          layer.layout = { ...layer.layout, 'text-field': targetTextField };
        }

        // 3. Pre-filter hillshade if disabled
        if (!showHillshade) {
          const id = layer.id.toLowerCase();
          if (
            layer.type === 'hillshade' ||
            id.includes('hillshade') ||
            id.includes('relief') ||
            id.includes('terrain') ||
            id.includes('contour')
          ) {
            layer.layout = { ...(layer.layout || {}), visibility: 'none' };
          }
        }
      });
    }

    STYLE_CACHE.set(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (error) {
    console.warn('[GeoMelody StyleHelper] Failed to localize style online, using direct URL', error);
    return url;
  }
}

/**
 * Generates custom White Terrain High-Contrast Theme
 * - Earth Land: Pure White (#FFFFFF)
 * - Mountains / Relief: Deep Slate Grey (#334155)
 * - Ocean / Water: Deep Navy Blue (#081426)
 */
export async function fetchWhiteTerrainStyle(apiKey, language = 'zh') {
  const cacheKey = `white-terrain-${language}-${apiKey ? 'cloud' : 'local'}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }

  const url = apiKey
    ? `https://api.maptiler.com/maps/backdrop/style.json?key=${apiKey}`
    : 'https://tiles.openfreemap.org/styles/positron';

  try {
    const res = await fetch(url);
    const styleJson = await res.json();
    const isChinese = language !== 'en';
    const targetTextField = isChinese ? CHINESE_TEXT_FIELD : ENGLISH_TEXT_FIELD;

    if (Array.isArray(styleJson.layers)) {
      styleJson.layers.forEach(l => {
        const id = l.id.toLowerCase();

        // 1. Background / Ocean Base: Deep Navy Blue
        if (l.type === 'background') {
          l.paint = { ...(l.paint || {}), 'background-color': '#081426', 'background-opacity': 1 };
        }
        // 2. Land Surface: Pure Crisp White
        else if (id.includes('land') && l.type === 'fill') {
          l.paint = { ...(l.paint || {}), 'fill-color': '#ffffff', 'fill-opacity': 1 };
        }
        // 3. Mountain Hillshade: High-contrast Dark Slate Grey
        else if (l.type === 'hillshade' || id.includes('hillshade')) {
          l.paint = {
            ...(l.paint || {}),
            'hillshade-highlight-color': '#ffffff',
            'hillshade-shadow-color': '#334155',
            'hillshade-exaggeration': 0.85
          };
          l.layout = { ...(l.layout || {}), visibility: 'visible' };
        }
        // 4. Oceans, Seas, Lakes, Rivers: Deep Navy Blue
        else if (id.includes('water') || id.includes('lake') || id.includes('river') || id.includes('ocean') || id.includes('sea')) {
          if (l.type === 'fill') {
            l.paint = { ...(l.paint || {}), 'fill-color': '#081426', 'fill-opacity': 1 };
          } else if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#0a1d38' };
          }
        }
        // 5. Borders: Subtle Slate Grey
        else if (id.includes('border') || id.includes('boundary')) {
          if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#64748b', 'line-opacity': 0.65 };
          }
        }
        // 6. Labels: Dark slate with clean white halo
        else if (l.type === 'symbol' && l.layout && l.layout['text-field']) {
          l.layout = { ...l.layout, 'text-field': targetTextField };
          l.paint = {
            ...(l.paint || {}),
            'text-color': '#0f172a',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.2
          };
        }
      });
    }

    STYLE_CACHE.set(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (err) {
    console.warn('[GeoMelody StyleHelper] Failed to fetch white terrain style, fallback to positron', err);
    return 'https://tiles.openfreemap.org/styles/positron';
  }
}

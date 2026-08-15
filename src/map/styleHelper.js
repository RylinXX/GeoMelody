/**
 * Style Helper for GeoMelody
 * Pre-fetches and localizes map styles to guarantee:
 * 1. 100% Chinese country/city names from the very first frame (zero English flash).
 * 2. Instant dark cosmic background (zero white flash).
 * 3. Fresh deep clones so MapLibre state mutations never corrupt cached styles.
 */

const STYLE_CACHE = new Map();

const FALLBACK_STYLES = {
  'streets-dark': 'https://tiles.openfreemap.org/styles/dark',
  'dataviz-dark': 'https://tiles.openfreemap.org/styles/dark',
  'backdrop-dark': 'https://tiles.openfreemap.org/styles/dark',
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

    // 1. Ensure background color is deep dark from millisecond 0
    const bgLayer = styleJson.layers?.find(l => l.type === 'background');
    if (bgLayer) {
      bgLayer.paint = { ...(bgLayer.paint || {}), 'background-color': '#02060c' };
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

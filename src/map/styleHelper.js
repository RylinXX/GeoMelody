/**
 * Style Helper for GeoMelody
 * Pre-fetches and localizes map styles to guarantee:
 * 1. 100% Chinese country/city names from the very first frame (zero English flash).
 * 2. Instant dark cosmic background (zero white flash).
 * 3. Fresh deep clones so MapLibre state mutations never corrupt cached styles.
 */

const STYLE_CACHE = new Map();

function getPersistedStyle(key) {
  try {
    const raw = sessionStorage.getItem(`gm_style_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function persistStyle(key, data) {
  try {
    sessionStorage.setItem(`gm_style_${key}`, JSON.stringify(data));
  } catch (_) {}
}

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
  const persisted = getPersistedStyle(cacheKey);
  if (persisted) {
    STYLE_CACHE.set(cacheKey, persisted);
    return JSON.parse(JSON.stringify(persisted));
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
    persistStyle(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (error) {
    console.warn('[GeoMelody StyleHelper] Failed to localize style online, using direct URL', error);
    return url;
  }
}

/**
 * Generates custom White Terrain High-Contrast Theme (白色立体地形)
 * - Earth Land / Continents: Pure Crisp White (#FFFFFF)
 * - Ocean / Water / Lakes: Deep Navy Blue (#0C2340)
 * - Country Borders: Muted Slate Grey (#64748B)
 * - Labels: Dark Slate (#0F172A) with clean white halo (#FFFFFF)
 */
export async function fetchWhiteTerrainStyle(apiKey, language = 'zh') {
  const cacheKey = `white-terrain-v4-${language}-${apiKey ? 'cloud' : 'local'}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }
  const persisted = getPersistedStyle(cacheKey);
  if (persisted) {
    STYLE_CACHE.set(cacheKey, persisted);
    return JSON.parse(JSON.stringify(persisted));
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

        // 1. Background / Continent Land Base: Pure Crisp White
        if (l.type === 'background') {
          l.paint = { ...(l.paint || {}), 'background-color': '#ffffff', 'background-opacity': 1 };
        }
        // 2. Water / Oceans / Seas / Lakes / Rivers: Deep Navy Blue
        else if (id.includes('water') || id.includes('ocean') || id.includes('sea') || id.includes('lake')) {
          if (l.type === 'fill') {
            l.paint = { ...(l.paint || {}), 'fill-color': '#0c2340', 'fill-opacity': 1 };
          } else if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#08192e' };
          }
        }
        // 3. Ice & Glacier
        else if (id.includes('glacier') || id.includes('ice')) {
          if (l.type === 'fill') {
            l.paint = { ...(l.paint || {}), 'fill-color': '#f1f5f9', 'fill-opacity': 0.8 };
          }
        }
        // 4. Country Borders & Boundaries: Muted Slate Grey
        else if (id.includes('border') || id.includes('boundary')) {
          if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#64748b', 'line-opacity': 0.75 };
          }
        }
        // 5. Roads / Transport: Subtle Light Grey
        else if (id.includes('road') || id.includes('highway') || id.includes('tunnel') || id.includes('rail')) {
          if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#e2e8f0', 'line-opacity': 0.5 };
          }
        }
        // 6. Labels: Dark Slate with clean white halo
        else if (l.type === 'symbol' && l.layout && l.layout['text-field']) {
          l.layout = { ...l.layout, 'text-field': targetTextField };
          if (l.paint && typeof l.paint === 'object') {
            l.paint = {
              ...l.paint,
              'text-color': '#0f172a',
              'text-halo-color': '#ffffff',
              'text-halo-width': 1.5
            };
          }
        }
      });
    }

    STYLE_CACHE.set(cacheKey, styleJson);
    persistStyle(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (err) {
    console.warn('[GeoMelody StyleHelper] Failed to fetch white terrain style, fallback to positron', err);
    return 'https://tiles.openfreemap.org/styles/positron';
  }
}

/**
 * Generates custom Ultra-Fast Deep Midnight Blue Theme (极速深海蓝)
 * - Ultra-lightweight Dataviz base (only ~30 layers, loads in ~100ms)
 * - Land Base / Continents: Deep Oceanic Slate (#0D1726)
 * - Oceans / Water: Midnight Deep Abyss (#040A14)
 * - Borders: Luminous Cyan Blue (#38BDF8)
 * - Labels: Celestial Light Blue (#E2E8F0) with dark halo (#040A14)
 */
export async function fetchFastDeepBlueStyle(apiKey, language = 'zh') {
  const cacheKey = `fast-deep-blue-v4-${language}-${apiKey ? 'cloud' : 'local'}`;
  if (STYLE_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(STYLE_CACHE.get(cacheKey)));
  }
  const persisted = getPersistedStyle(cacheKey);
  if (persisted) {
    STYLE_CACHE.set(cacheKey, persisted);
    return JSON.parse(JSON.stringify(persisted));
  }

  const url = apiKey
    ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${apiKey}`
    : 'https://tiles.openfreemap.org/styles/dark';

  try {
    const res = await fetch(url);
    const styleJson = await res.json();
    const isChinese = language !== 'en';
    const targetTextField = isChinese ? CHINESE_TEXT_FIELD : ENGLISH_TEXT_FIELD;

    if (Array.isArray(styleJson.layers)) {
      styleJson.layers.forEach(l => {
        const id = l.id.toLowerCase();

        // 1. Background / Continent Land Base: Deep Oceanic Slate
        if (l.type === 'background') {
          l.paint = { ...(l.paint || {}), 'background-color': '#0d1726', 'background-opacity': 1 };
        }
        // 2. Water / Ocean / Lakes / Rivers: Dark Midnight Abyss
        else if (id.includes('water') || id.includes('ocean') || id.includes('sea')) {
          if (l.type === 'fill') {
            l.paint = { ...(l.paint || {}), 'fill-color': '#040a14', 'fill-opacity': 1 };
          } else if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#07162b' };
          }
        }
        // 3. Land Surface / Landuse / Urban / Wood
        else if (id.includes('land') || id.includes('urban') || id.includes('wood') || id.includes('park')) {
          if (l.type === 'fill') {
            l.paint = { ...(l.paint || {}), 'fill-color': '#112036', 'fill-opacity': 1 };
          }
        }
        // 4. Borders & Boundaries: Luminous Muted Cyan Blue
        else if (id.includes('border') || id.includes('boundary')) {
          if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#38bdf8', 'line-opacity': 0.7 };
          }
        }
        // 5. Road / Transport: Subtle Dark Navy accent
        else if (id.includes('road') || id.includes('highway') || id.includes('tunnel') || id.includes('path') || id.includes('rail')) {
          if (l.type === 'line') {
            l.paint = { ...(l.paint || {}), 'line-color': '#132845', 'line-opacity': 0.4 };
          }
        }
        // 6. Labels: Crisp Celestial Blue with dark halo
        else if (l.type === 'symbol' && l.layout && l.layout['text-field']) {
          l.layout = { ...l.layout, 'text-field': targetTextField };
          if (l.paint && typeof l.paint === 'object') {
            l.paint = {
              ...l.paint,
              'text-color': '#e2e8f0',
              'text-halo-color': '#040a14',
              'text-halo-width': 1.2
            };
          }
        }
      });
    }

    STYLE_CACHE.set(cacheKey, styleJson);
    persistStyle(cacheKey, styleJson);
    return JSON.parse(JSON.stringify(styleJson));
  } catch (err) {
    console.warn('[GeoMelody StyleHelper] Failed to fetch fast deep blue style, fallback to dark', err);
    return 'https://tiles.openfreemap.org/styles/dark';
  }
}

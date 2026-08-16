/**
 * Image Fallback Engine for GeoMelody
 * Provides 100% offline, zero-network-failure SVG fallback covers for all scenic categories
 * and installs global capture-phase error listeners on all <img> elements.
 */

// Elegant, ultra-reliable inline SVG covers for all categories
function createSvgDataUri(gradientStart, gradientEnd, accentColor, title, iconPath) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${gradientStart}" />
        <stop offset="50%" stop-color="#090d16" />
        <stop offset="100%" stop-color="${gradientEnd}" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.2" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg)" />
    <circle cx="400" cy="210" r="180" fill="url(#glow)" />
    <g transform="translate(400, 195) scale(2.6)" fill="none" stroke="${accentColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <g transform="translate(-12, -12)">
        ${iconPath}
      </g>
    </g>
    <text x="400" y="325" text-anchor="middle" fill="#f1f5f9" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, sans-serif" font-size="24" font-weight="700" letter-spacing="4">${title}</text>
    <text x="400" y="360" text-anchor="middle" fill="${accentColor}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="2">GEOMELODY · 3D SOUNDSCAPE</text>
    <rect x="250" y="390" width="300" height="1.5" fill="url(#accent)" />
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const FALLBACK_COVERS = {
  mountains: createSvgDataUri(
    '#0f172a',
    '#1e1b4b',
    '#38bdf8',
    '雪山高山 · 纯净旷野',
    '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15h15.72"/>'
  ),
  waterTown: createSvgDataUri(
    '#062e3f',
    '#041e28',
    '#2dd4bf',
    '江南水乡 · 烟雨古镇',
    '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10a3 3 0 0 0 6 0"/>'
  ),
  islands: createSvgDataUri(
    '#083344',
    '#134e4a',
    '#06b6d4',
    '暖阳海岛 · 碧海云天',
    '<path d="M12 2v8"/><path d="m4.93 10.93 5.66-5.66"/><path d="M2 18h20"/><path d="M20 18a8 8 0 0 0-16 0"/><circle cx="12" cy="18" r="4"/>'
  ),
  forests: createSvgDataUri(
    '#052e16',
    '#064e3b',
    '#34d399',
    '森林旷野 · 自然音景',
    '<path d="M12 2 4 14h5l-3 8h12l-3-8h5L12 2z"/>'
  ),
  cities: createSvgDataUri(
    '#172554',
    '#311042',
    '#a855f7',
    '城市天际 · 都市夜曲',
    '<path d="M3 21h18"/><path d="M5 21V5l6-2v18"/><path d="M19 21V9l-8-2"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/>'
  ),
  deserts: createSvgDataUri(
    '#451a03',
    '#3b0764',
    '#f59e0b',
    '西北大漠 · 丝路飞天',
    '<circle cx="12" cy="8" r="4"/><path d="M2 20c4-6 10-6 14 0"/><path d="M10 20c4-4 8-4 12 0"/>'
  ),
  default: createSvgDataUri(
    '#0f172a',
    '#02060c',
    '#38bdf8',
    '地球旋律 · 胜景音景',
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'
  )
};

export function getFallbackCover(category = 'default') {
  return FALLBACK_COVERS[category] || FALLBACK_COVERS.default;
}

/**
 * Installs a global error interceptor that instantly replaces any broken image with a crisp offline fallback.
 */
export function initGlobalImageFallback() {
  document.addEventListener(
    'error',
    event => {
      const target = event.target;
      if (target && target.tagName === 'IMG') {
        // Prevent infinite error recursion
        if (target.dataset.fallbackApplied === 'true') return;
        target.dataset.fallbackApplied = 'true';

        // Find closest category context if available
        const spotCard = target.closest('[data-category], [data-spot-id]');
        const category = spotCard?.dataset?.category || 'default';
        target.src = getFallbackCover(category);
        target.classList.add('img-fallback-loaded');
      }
    },
    true // Capture phase to catch all image errors before bubbling
  );
}

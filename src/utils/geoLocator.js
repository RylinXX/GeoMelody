/**
 * Ultra-Robust Multi-Tier Geolocation Resolver for GeoMelody
 * 1. Query parameters / WeChat Bridge GPS (?lat=...&lng=...)
 * 2. Dedicated Backend IP Locator (/api/locate)
 * 3. Browser High-Accuracy GPS / WiFi
 * 4. Public High-Speed IP Network APIs
 * 5. Stored Last-Known Fallback
 */

const STORAGE_KEY_LAST_LOC = 'geomelody_last_known_location';

function getStoredLocation() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST_LOC);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStoredLocation(loc) {
  try {
    if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
      localStorage.setItem(STORAGE_KEY_LAST_LOC, JSON.stringify({
        lat: loc.lat,
        lng: loc.lng,
        accuracy: loc.accuracy || 5000,
        city: loc.city || '',
        country: loc.country || '',
        timestamp: Date.now()
      }));
    }
  } catch {}
}

/** Check if location coordinates were injected via MiniProgram or URL query */
function getUrlParamLocation() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const latStr = urlParams.get('lat');
    const lngStr = urlParams.get('lng');
    const city = urlParams.get('city') || '';
    if (latStr && lngStr) {
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      if (!isNaN(lat) && !isNaN(lng)) {
        return {
          lat,
          lng,
          city,
          country: '中国',
          accuracy: 50,
          source: 'miniprogram-gps'
        };
      }
    }
  } catch {}
  return null;
}

/** 1. High-speed backend IP geolocation */
async function fetchBackendLocation() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('/api/locate', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && typeof data.lat === 'number' && typeof data.lng === 'number') {
        return {
          lat: data.lat,
          lng: data.lng,
          city: data.city || '',
          country: data.country || '中国',
          accuracy: data.accuracy || 5000,
          source: 'server-ip'
        };
      }
    }
  } catch (_) {}
  return null;
}

/** 2. Public IP network geolocation fallback */
async function fetchPublicIpLocation() {
  const endpoints = [
    {
      url: 'https://ipwho.is/',
      parse: data => {
        if (data && data.success && typeof data.latitude === 'number') {
          return {
            lat: data.latitude,
            lng: data.longitude,
            city: data.city || data.region || '',
            country: data.country || '',
            accuracy: 8000,
            source: 'ip-network'
          };
        }
        return null;
      }
    },
    {
      url: 'https://freeipapi.com/api/json',
      parse: data => {
        if (data && typeof data.latitude === 'number') {
          return {
            lat: data.latitude,
            lng: data.longitude,
            city: data.cityName || data.regionName || '',
            country: data.countryName || '',
            accuracy: 10000,
            source: 'ip-network'
          };
        }
        return null;
      }
    }
  ];

  for (const ep of endpoints) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(ep.url, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const json = await res.json();
        const parsed = ep.parse(json);
        if (parsed) return parsed;
      }
    } catch (_) {}
  }
  return null;
}

function tryBrowserPosition(options) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Geolocation not supported'));
    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          source: 'browser-gps'
        });
      },
      err => reject(err),
      options
    );
  });
}

export async function resolveUserLocation({ onProgress } = {}) {
  // 0. MiniProgram / URL Injection Check
  const urlLoc = getUrlParamLocation();
  if (urlLoc) {
    saveStoredLocation(urlLoc);
    return urlLoc;
  }

  // 1. Try Browser High Accuracy GPS (3.5s timeout)
  onProgress?.('gps-high');
  try {
    const highPos = await tryBrowserPosition({
      enableHighAccuracy: true,
      timeout: 3500,
      maximumAge: 30000
    });
    saveStoredLocation(highPos);
    return highPos;
  } catch (err1) {
    console.warn('[GeoLocator] Browser GPS failed or permission not granted, falling back to server IP...', err1);
  }

  // 2. High-Speed Server-Side IP Locator (/api/locate)
  onProgress?.('server-ip');
  const serverLoc = await fetchBackendLocation();
  if (serverLoc) {
    saveStoredLocation(serverLoc);
    return serverLoc;
  }

  // 3. Public IP APIs Fallback
  onProgress?.('ip-network');
  const publicIpLoc = await fetchPublicIpLocation();
  if (publicIpLoc) {
    saveStoredLocation(publicIpLoc);
    return publicIpLoc;
  }

  // 4. Stored Last-Known Location
  const lastKnown = getStoredLocation();
  if (lastKnown) {
    return { ...lastKnown, source: 'cached' };
  }

  // 5. Default Hangzhou West Lake scenic coordinates
  return {
    lat: 30.2428,
    lng: 120.1504,
    accuracy: 15000,
    city: '杭州',
    country: '中国',
    source: 'default'
  };
}

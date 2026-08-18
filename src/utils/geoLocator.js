/**
 * Ultra-Robust Multi-Tier Geolocation Resolver for GeoMelody
 * 1. High-accuracy GPS/WiFi (4s)
 * 2. Standard-accuracy browser geolocation (3.5s)
 * 3. High-speed IP-based network location APIs (ipwho.is / open IP endpoints)
 * 4. Stored last-known location fallback
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

async function fetchIpLocation() {
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
      const timer = setTimeout(() => controller.abort(), 3500);
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
  // 1. Try Browser High Accuracy (5s timeout)
  onProgress?.('gps-high');
  try {
    const highPos = await tryBrowserPosition({
      enableHighAccuracy: true,
      timeout: 4500,
      maximumAge: 30000
    });
    saveStoredLocation(highPos);
    return highPos;
  } catch (err1) {
    console.warn('[GeoLocator] High accuracy failed, retrying standard accuracy...', err1);
  }

  // 2. Try Browser Low Accuracy (4s timeout)
  onProgress?.('gps-low');
  try {
    const lowPos = await tryBrowserPosition({
      enableHighAccuracy: false,
      timeout: 3500,
      maximumAge: 120000
    });
    saveStoredLocation(lowPos);
    return lowPos;
  } catch (err2) {
    console.warn('[GeoLocator] Browser geolocation unavailable, falling back to IP network geolocation...', err2);
  }

  // 3. Try IP Network Geolocation (3.5s timeout)
  onProgress?.('ip-network');
  try {
    const ipPos = await fetchIpLocation();
    if (ipPos) {
      saveStoredLocation(ipPos);
      return ipPos;
    }
  } catch (err3) {
    console.warn('[GeoLocator] IP network geolocation failed...', err3);
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

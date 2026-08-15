/**
 * Astronomical Solar Position & Day/Night Terminator Calculator
 * Accurately computes subsolar coordinates and the night hemisphere shadow polygon.
 */

export function getSolarPosition(date = new Date()) {
  const rad = Math.PI / 180;
  
  // Day of the year (1 - 365)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // UTC Decimal Hours
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

  // Subsolar Longitude: At 12:00 UTC, sun is over Greenwich 0°
  // As time progresses, sun moves west 15° per hour
  let sunLng = (12 - utcHours) * 15;
  while (sunLng > 180) sunLng -= 360;
  while (sunLng < -180) sunLng += 360;

  // Subsolar Latitude (Declination) via Cooper's formula
  const sunLat = 23.45 * Math.sin(rad * ((360 / 365) * (dayOfYear - 81)));

  return { sunLat, sunLng, utcHours, date };
}

/**
 * Generates the Night Hemisphere Polygon in GeoJSON format
 */
export function getNightTerminatorGeoJSON(date = new Date()) {
  const { sunLat, sunLng } = getSolarPosition(date);
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const lat0 = sunLat * rad;
  const lng0 = sunLng * rad;

  const terminatorCoords = [];
  const step = 2; // Every 2 degrees for smooth curve

  // Generate the great circle line 90 degrees away from the sun
  for (let i = -180; i <= 180; i += step) {
    const lng = i;
    const deltaLng = (lng - sunLng) * rad;

    let lat = 0;
    if (Math.abs(sunLat) < 0.001) {
      // Near equinox, terminator runs from North to South along deltaLng = +-90°
      lat = deltaLng > 0 ? 89.9 : -89.9;
    } else {
      // tan(lat) = -cos(deltaLng) / tan(lat0)
      const tanLat = -Math.cos(deltaLng) / Math.tan(lat0);
      lat = Math.atan(tanLat) * deg;
    }
    
    terminatorCoords.push([lng, lat]);
  }

  // To create a solid polygon covering the night side, complete the ring along the dark pole
  const nightPoleLat = sunLat > 0 ? -90 : 90;
  const polygonRing = [...terminatorCoords, [180, nightPoleLat], [-180, nightPoleLat], terminatorCoords[0]];

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygonRing]
        },
        properties: {
          sunLat,
          sunLng
        }
      }
    ]
  };
}

/**
 * Check whether a specific spot (lat, lng) is currently in Day, Twilight, or Night
 */
export function getSpotSunStatus(lat, lng, date = new Date()) {
  const { sunLat, sunLng } = getSolarPosition(date);
  const rad = Math.PI / 180;

  const phi1 = lat * rad;
  const phi2 = sunLat * rad;
  const deltaLambda = (lng - sunLng) * rad;

  // Solar zenith angle cos(psi)
  const cosZenith = Math.sin(phi1) * Math.sin(phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const solarElevation = Math.asin(cosZenith) * (180 / Math.PI); // in degrees

  if (solarElevation > 6) {
    return { status: 'day', text: '☀️ 白昼明媚', icon: 'sun', elevation: solarElevation };
  } else if (solarElevation >= -6) {
    return { status: 'twilight', text: '🌅 晨昏霞光', icon: 'sunset', elevation: solarElevation };
  } else {
    return { status: 'night', text: '🌙 静谧夜幕', icon: 'moon', elevation: solarElevation };
  }
}

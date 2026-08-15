import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(projectRoot, 'scripts', 'data', 'ne_110m_admin_0_countries.geojson');
const outputPath = path.join(projectRoot, 'public', 'textures', 'world_borders.svg');
const adminSourcePath = path.join(projectRoot, 'scripts', 'data', 'ne_50m_admin_1_states_provinces_lines.geojson');
const adminOutputPath = path.join(projectRoot, 'public', 'textures', 'admin_borders.svg');
const textureWidth = 4096;
const textureHeight = 2048;
const geoJson = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const adminGeoJson = JSON.parse(fs.readFileSync(adminSourcePath, 'utf8'));

function getSqSegDist(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;

  if (dx !== 0 || dy !== 0) {
    const ratio = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
    if (ratio > 1) {
      x = end[0];
      y = end[1];
    } else if (ratio > 0) {
      x += dx * ratio;
      y += dy * ratio;
    }
  }

  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifyStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance;
  let index;
  for (let current = first + 1; current < last; current += 1) {
    const sqDist = getSqSegDist(points[current], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = current;
      maxSqDist = sqDist;
    }
  }
  if (index !== undefined) {
    if (index - first > 1) simplifyStep(points, first, index, sqTolerance, simplified);
    simplified.push(points[index]);
    if (last - index > 1) simplifyStep(points, index, last, sqTolerance, simplified);
  }
}

function simplify(points, tolerance = 0.035) {
  if (points.length <= 4) return points;
  const simplified = [points[0]];
  simplifyStep(points, 0, points.length - 1, tolerance * tolerance, simplified);
  simplified.push(points.at(-1));
  return simplified;
}

function ringToPath(ring) {
  const points = simplify(ring);
  let previousLng;
  return points.map(([lng, lat], index) => {
    const x = ((lng + 180) * 10).toFixed(1);
    const y = ((90 - lat) * 10).toFixed(1);
    const crossesDateLine = previousLng !== undefined && Math.abs(lng - previousLng) > 180;
    previousLng = lng;
    return `${index === 0 || crossesDateLine ? 'M' : 'L'}${x} ${y}`;
  }).join('');
}

const paths = [];
for (const feature of geoJson.features) {
  const geometry = feature.geometry;
  if (!geometry) continue;
  if (geometry.type === 'Polygon') paths.push(ringToPath(geometry.coordinates[0]));
  if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) paths.push(ringToPath(polygon[0]));
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${textureWidth}" height="${textureHeight}" viewBox="0 0 3600 1800" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="1.45" stroke-opacity="0.76" stroke-linecap="round" stroke-linejoin="round">${paths.map(data => `<path d="${data}"/>`).join('')}</g></svg>`;
fs.writeFileSync(outputPath, svg);
console.log(`Generated ${outputPath} (${Math.round(svg.length / 1024)} KB, ${paths.length} outlines)`);

const adminPaths = [];
for (const feature of adminGeoJson.features) {
  const geometry = feature.geometry;
  if (!geometry) continue;
  if (geometry.type === 'LineString') adminPaths.push(ringToPath(geometry.coordinates));
  if (geometry.type === 'MultiLineString') {
    for (const line of geometry.coordinates) adminPaths.push(ringToPath(line));
  }
}

const adminSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${textureWidth}" height="${textureHeight}" viewBox="0 0 3600 1800" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="1.05" stroke-opacity="0.58" stroke-linecap="round" stroke-linejoin="round">${adminPaths.map(data => `<path d="${data}"/>`).join('')}</g></svg>`;
fs.writeFileSync(adminOutputPath, adminSvg);
console.log(`Generated ${adminOutputPath} (${Math.round(adminSvg.length / 1024)} KB, ${adminPaths.length} boundaries)`);

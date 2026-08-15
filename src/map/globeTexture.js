/**
 * Procedural Dark Earth & Starry Space Texture Generator for Three.js
 * Generates dark futuristic/zen landmass outlines, glowing lat/long grids, and starry backgrounds.
 */

export function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep midnight ocean background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#06080d');
  oceanGrad.addColorStop(0.5, '#0a0e17');
  oceanGrad.addColorStop(1, '#06080d');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle Latitude & Longitude Grids
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.lineWidth = 1;

  // Latitudes
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Longitudes
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Equator highlight
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Draw stylized continent landmass silhouettes (Approximated simplified land polygons)
  ctx.fillStyle = '#141c2b';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1.5;

  const toXY = (lng, lat) => [
    ((lng + 180) / 360) * canvas.width,
    ((90 - lat) / 180) * canvas.height
  ];

  const drawPoly = (coords) => {
    if (!coords || coords.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = toXY(coords[0][0], coords[0][1]);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < coords.length; i++) {
      const [px, py] = toXY(coords[i][0], coords[i][1]);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // Simplified World Continents Polygons
  // 1. Eurasia
  drawPoly([
    [-10, 36], [0, 44], [10, 54], [25, 70], [60, 75], [100, 77], [170, 68], [170, 60],
    [140, 50], [130, 40], [122, 30], [115, 22], [105, 10], [98, 8], [80, 10], [70, 24],
    [55, 25], [45, 13], [35, 30], [28, 41], [15, 38], [-5, 36]
  ]);

  // 2. East Asia / China / Japan
  drawPoly([[100, 42], [125, 45], [130, 32], [120, 22], [108, 18], [95, 25], [85, 30], [100, 42]]);
  drawPoly([[130, 32], [142, 44], [140, 36], [132, 33]]); // Japan

  // 3. Africa
  drawPoly([
    [-17, 15], [-5, 36], [10, 37], [32, 31], [43, 12], [51, 11], [40, -10],
    [32, -28], [18, -34], [12, -18], [9, 5], [-17, 15]
  ]);

  // 4. North America
  drawPoly([
    [-168, 65], [-140, 70], [-95, 72], [-60, 60], [-52, 47], [-70, 42], [-80, 25],
    [-98, 16], [-105, 20], [-118, 32], [-124, 48], [-140, 58], [-168, 65]
  ]);

  // 5. South America
  drawPoly([
    [-78, 10], [-60, 8], [-35, -5], [-38, -15], [-52, -35], [-68, -55], [-75, -45],
    [-72, -18], [-80, -2], [-78, 10]
  ]);

  // 6. Australia
  drawPoly([
    [113, -22], [135, -12], [145, -15], [153, -28], [148, -38], [130, -32], [115, -35], [113, -22]
  ]);

  // 7. Antarctica
  drawPoly([
    [-180, -75], [-120, -70], [-60, -65], [0, -70], [60, -68], [120, -72], [180, -75],
    [180, -90], [-180, -90]
  ]);

  // City Lights / Golden Dust Particles on Landmasses
  ctx.fillStyle = '#fde047';
  for (let i = 0; i < 400; i++) {
    const lng = -170 + Math.random() * 340;
    const lat = -50 + Math.random() * 115;
    const [x, y] = toXY(lng, lat);
    const rad = 0.5 + Math.random() * 1.5;
    ctx.globalAlpha = 0.2 + Math.random() * 0.7;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  return canvas;
}

export function createAtmosphereGlowCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(256, 256, 180, 256, 256, 256);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
  grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
  grad.addColorStop(0.8, 'rgba(14, 165, 233, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  return canvas;
}

/**
 * Cosmic Starfield Engine for GeoMelody
 * Renders twinkling celestial stars and subtle shooting stars in the cosmic void surrounding Earth
 */

export class StarfieldEngine {
  constructor(canvasId = 'cosmic-starfield-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.stars = [];
    this.shootingStars = [];
    this.animationId = null;
    this.isEnabled = true;
    this.lastShootingStarTime = Date.now();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.currentTheme = 'dark';

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    this.handleResize = () => this.resize();
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('orientationchange', this.handleResize, { passive: true });
    this.resize();
    this.generateStars();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    if (this.ctx) {
      this.ctx.scale(this.dpr, this.dpr);
    }
    this.generateStars();
  }

  generateStars() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Sparse, clean, lightweight star count (initial version aesthetic)
    const count = Math.floor(Math.min(75, Math.max(35, (width * height) / 20000)));

    const starColors = this.currentTheme === 'light' ? [
      'rgba(148, 163, 184, ', // slate-400
      'rgba(100, 116, 139, ', // slate-500
      'rgba(56, 189, 248, '   // subtle cyan
    ] : [
      'rgba(255, 255, 255, ',
      'rgba(224, 242, 254, ', // Soft ice blue
      'rgba(56, 189, 248, '   // Starlight cyan
    ];

    this.stars = [];
    for (let i = 0; i < count; i++) {
      const colorPrefix = starColors[Math.floor(Math.random() * starColors.length)];
      const baseAlpha = 0.25 + Math.random() * 0.45;
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.5 + Math.random() * 0.8,
        colorPrefix,
        baseAlpha,
        twinkleSpeed: 0.0012 + Math.random() * 0.0025,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  spawnShootingStar() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const startX = Math.random() * width * 0.8;
    const startY = Math.random() * height * 0.45;
    const length = 70 + Math.random() * 80;
    const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;
    const speed = 7 + Math.random() * 6;

    this.shootingStars.push({
      x: startX,
      y: startY,
      length,
      angle,
      speed,
      opacity: 1,
      life: 0,
      maxLife: 45 + Math.random() * 30
    });
  }

  start() {
    if (this.animationId) return;

    let lastTime = performance.now();
    const render = (now) => {
      const dt = Math.min(100, now - lastTime);
      lastTime = now;

      if (this.isEnabled && this.ctx) {
        this.draw(now, dt);
      }

      this.animationId = requestAnimationFrame(render);
    };

    this.animationId = requestAnimationFrame(render);
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  setEnabled(enabled) {
    this.isEnabled = Boolean(enabled);
    if (this.canvas) {
      this.canvas.style.opacity = this.isEnabled ? '1' : '0';
    }
  }

  setTheme(theme) {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.generateStars();
    }
  }

  draw(now, dt) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Twinkling Celestial Stars
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      const brightness = s.baseAlpha + Math.sin(now * s.twinkleSpeed + s.phase) * 0.35;
      const alpha = Math.max(0.1, Math.min(0.9, brightness));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${s.colorPrefix}${alpha.toFixed(2)})`;
      ctx.fill();
    }

    // 2. Spawn & Draw Subtle Shooting Stars
    if (now - this.lastShootingStarTime > 12000 + Math.random() * 8000) {
      this.lastShootingStarTime = now;
      if (this.shootingStars.length < 2) {
        this.spawnShootingStar();
      }
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const ss = this.shootingStars[i];
      ss.life++;
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;

      const progress = ss.life / ss.maxLife;
      const alpha = Math.max(0, 1 - progress);

      const tailX = ss.x - Math.cos(ss.angle) * ss.length;
      const tailY = ss.y - Math.sin(ss.angle) * ss.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      if (this.currentTheme === 'light') {
        gradient.addColorStop(0, 'rgba(100, 116, 139, 0)');
        gradient.addColorStop(0.7, `rgba(100, 116, 139, ${(alpha * 0.4).toFixed(2)})`);
        gradient.addColorStop(1, `rgba(71, 85, 105, ${alpha.toFixed(2)})`);
      } else {
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
        gradient.addColorStop(0.7, `rgba(56, 189, 248, ${(alpha * 0.4).toFixed(2)})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha.toFixed(2)})`);
      }

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (ss.life >= ss.maxLife) {
        this.shootingStars.splice(i, 1);
      }
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
  }
}

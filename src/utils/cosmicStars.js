/**
 * Cosmic Starfield & Nebula Particle Background Engine
 * Renders atmospheric twinkling stars, diamond flares, and subtle celestial dust.
 */

export class CosmicStarfield {
  constructor(canvasId = 'cosmic-stars-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = null;
    this.stars = [];
    this.nebulae = [];
    this.animationId = null;
    this.width = 0;
    this.height = 0;
  }

  init() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'cosmic-stars-canvas';
      this.canvas.className = 'cosmic-stars-canvas';
      const app = document.getElementById('app') || document.body;
      app.insertBefore(this.canvas, app.firstChild);
    }

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.generateStars();
    this.animate();

    window.addEventListener('resize', () => {
      this.resize();
      this.generateStars();
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  generateStars() {
    this.stars = [];
    // Generate ~180 sparkling stars of 3 distinct layers
    const count = Math.min(220, Math.floor((this.width * this.height) / 6000));

    for (let i = 0; i < count; i++) {
      const isFlare = Math.random() > 0.92; // 8% diamond flare stars
      const isCyan = Math.random() > 0.7;
      const isWarm = Math.random() > 0.85;

      let color = 'rgba(255, 255, 255,';
      if (isCyan) color = 'rgba(125, 211, 252,';
      else if (isWarm) color = 'rgba(254, 240, 138,';

      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: isFlare ? (Math.random() * 1.5 + 1.2) : (Math.random() * 1.1 + 0.5),
        baseAlpha: Math.random() * 0.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        isFlare,
        color
      });
    }

    // 3 subtle colored deep space nebula light clouds
    this.nebulae = [
      { x: this.width * 0.2, y: this.height * 0.3, r: 380, color: 'rgba(56, 189, 248, 0.04)' },
      { x: this.width * 0.8, y: this.height * 0.7, r: 450, color: 'rgba(139, 92, 246, 0.035)' },
      { x: this.width * 0.5, y: this.height * 0.85, r: 350, color: 'rgba(20, 184, 166, 0.03)' }
    ];
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Render soft deep space nebulae glows
    this.nebulae.forEach(neb => {
      const grad = this.ctx.createRadialGradient(neb.x, neb.y, 10, neb.x, neb.y, neb.r);
      grad.addColorStop(0, neb.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 2. Render sparkling stars
    const now = Date.now() * 0.0015;

    this.stars.forEach(star => {
      // Calculate dynamic twinkling alpha
      const currentAlpha = star.baseAlpha + Math.sin(now * star.twinkleSpeed * 100 + star.twinklePhase) * 0.35;
      const alpha = Math.max(0.1, Math.min(1, currentAlpha));

      this.ctx.fillStyle = `${star.color} ${alpha})`;
      this.ctx.shadowColor = star.color.replace('rgba', 'rgb').replace(',', ')');
      this.ctx.shadowBlur = star.isFlare ? 8 : 4;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Render 4-point cross diffraction spikes on bright flare stars
      if (star.isFlare && alpha > 0.55) {
        this.ctx.strokeStyle = `${star.color} ${alpha * 0.5})`;
        this.ctx.lineWidth = 0.75;
        const spikeLen = star.radius * 4;

        this.ctx.beginPath();
        this.ctx.moveTo(star.x - spikeLen, star.y);
        this.ctx.lineTo(star.x + spikeLen, star.y);
        this.ctx.moveTo(star.x, star.y - spikeLen);
        this.ctx.lineTo(star.x, star.y + spikeLen);
        this.ctx.stroke();
      }
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

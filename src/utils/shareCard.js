import QRCode from 'qrcode';
import { shareUtil } from './share.js';
import { storage } from './storage.js';
import { CATEGORIES } from '../data/categories.js';
import { getDemoTrack } from '../data/demoTracks.js';
import { getSpotName, getSpotLocation } from './i18n.js';

let currentSpot = null;
let currentLanguage = 'zh';

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  if (!text) return y;
  const words = text.split('');
  let line = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lineCount++;
      if (lineCount >= maxLines) {
        ctx.fillText(line + '…', x, y);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      line = words[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
}

export const shareCardManager = {
  init(callbacks = {}) {
    this.showToast = callbacks.showToast || ((msg) => console.log(msg));
    this.getLanguage = callbacks.getLanguage || (() => 'zh');

    // DOM Elements
    this.modal = document.getElementById('share-modal');
    this.backdrop = document.getElementById('share-modal-backdrop');
    this.closeBtn = document.getElementById('btn-close-share-modal');
    this.downloadBtn = document.getElementById('btn-download-share-card');
    this.copyBtn = document.getElementById('btn-copy-share-url');

    // Card Inner Elements
    this.coverImg = document.getElementById('poster-cover-image');
    this.spotTitle = document.getElementById('poster-spot-title');
    this.locationText = document.getElementById('poster-location-text');
    this.categoryBadge = document.getElementById('poster-category-badge');
    this.musicText = document.getElementById('poster-music-text');
    this.storyText = document.getElementById('poster-story-text');
    this.commentLikes = document.getElementById('poster-comment-likes');
    this.commentText = document.getElementById('poster-comment-text');
    this.commentAuthor = document.getElementById('poster-comment-author');
    this.qrCanvas = document.getElementById('poster-qrcode-canvas');

    // Event Listeners
    this.closeBtn?.addEventListener('click', () => this.close());
    this.backdrop?.addEventListener('click', () => this.close());
    this.copyBtn?.addEventListener('click', () => this.copyLink());
    this.downloadBtn?.addEventListener('click', () => this.downloadCard());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  },

  isOpen() {
    return this.modal?.classList.contains('open');
  },

  async open(spot) {
    if (!spot) return;
    currentSpot = spot;
    currentLanguage = this.getLanguage();

    const name = getSpotName(spot, currentLanguage);
    const location = getSpotLocation(spot, currentLanguage);
    const coverUrl = spot.photos?.[0] || '/textures/earth_dark.jpg';

    if (this.spotTitle) this.spotTitle.textContent = name;
    if (this.locationText) this.locationText.textContent = location;
    if (this.coverImg) {
      this.coverImg.src = coverUrl;
      this.coverImg.alt = name;
    }

    // Top Liked Comment
    const comments = storage.getComments(spot.id) || [];
    const topComment = comments.length > 0
      ? [...comments].sort((a, b) => (Number(b.likes || 0) - Number(a.likes || 0)))[0]
      : {
          text: '“这段旋律不是把人带离生活，而是把散落在生活里的自己慢慢领回来。”',
          author: '把晚风装进口袋'
        };

    if (this.commentText) this.commentText.textContent = `“${topComment.text.replace(/^[“”]/g, '')}”`;
    if (this.commentAuthor) this.commentAuthor.textContent = `—— @${topComment.author}`;

    // Generate Clean QR Code
    const shareUrl = shareUtil.getSpotShareUrl(spot.id);
    if (this.qrCanvas) {
      try {
        await QRCode.toCanvas(this.qrCanvas, shareUrl, {
          width: 136,
          margin: 1,
          color: {
            dark: '#080c14',
            light: '#ffffff'
          }
        });
      } catch (err) {
        console.warn('[ShareCard] QR Code generation failed:', err);
      }
    }

    // Show Modal
    this.backdrop?.classList.add('open');
    this.modal?.classList.add('open');
    this.modal?.setAttribute('aria-hidden', 'false');
  },

  close() {
    this.backdrop?.classList.remove('open');
    this.modal?.classList.remove('open');
    this.modal?.setAttribute('aria-hidden', 'true');
  },

  async copyLink() {
    if (!currentSpot) return;
    const shareUrl = shareUtil.getSpotShareUrl(currentSpot.id);
    const success = await shareUtil.copyToClipboard(shareUrl);
    const name = getSpotName(currentSpot, currentLanguage);
    if (success) {
      this.showToast(currentLanguage === 'en' ? `Link for “${name}” copied` : `已复制《${name}》分享链接`);
    } else {
      this.showToast(`链接：${shareUrl}`);
    }
  },

  async downloadCard() {
    if (!currentSpot) return;
    const name = getSpotName(currentSpot, currentLanguage);
    const location = getSpotLocation(currentSpot, currentLanguage);
    const coverUrl = currentSpot.photos?.[0] || '/textures/earth_dark.jpg';

    this.showToast(currentLanguage === 'en' ? 'Generating high-res card…' : '正在生成高清分享图…');

    // Create high-res offscreen canvas
    const canvas = document.createElement('canvas');
    const width = 720;
    const height = 1050;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Load & Draw Full Bleed Background Image
    const coverImage = new Image();
    coverImage.crossOrigin = 'anonymous';
    coverImage.src = coverUrl;

    await new Promise((resolve) => {
      coverImage.onload = resolve;
      coverImage.onerror = () => resolve();
    });

    try {
      ctx.drawImage(coverImage, 0, 0, width, height);
    } catch (_) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Gradient Shadow Mask
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(2, 6, 12, 0.65)');
    grad.addColorStop(0.25, 'rgba(2, 6, 12, 0.15)');
    grad.addColorStop(0.55, 'rgba(2, 6, 12, 0.6)');
    grad.addColorStop(1, 'rgba(2, 6, 12, 0.96)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Outer Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // 3. Top-Left: Logo + GeoMelody
    ctx.fillStyle = 'rgba(2, 6, 12, 0.6)';
    ctx.fillRect(44, 44, 180, 42);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeRect(44, 44, 180, 42);

    const logoImg = new Image();
    logoImg.src = '/logo-128.jpg';
    await new Promise((res) => {
      logoImg.onload = res;
      logoImg.onerror = () => res();
    });

    try {
      ctx.drawImage(logoImg, 52, 51, 28, 28);
    } catch (_) {}

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('GeoMelody', 90, 72);

    // 4. Bottom Area: Spot Name, Location, Hot Comment & Clean QR
    const qrSize = 110;
    const qrX = width - 48 - qrSize;
    const qrY = height - 48 - qrSize;

    // Draw QR Code on bottom right
    if (this.qrCanvas) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12);
      ctx.drawImage(this.qrCanvas, qrX, qrY, qrSize, qrSize);
    }

    // Spot Title & Location
    const contentMaxWidth = width - 96 - qrSize - 24;
    let textY = height - 250;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fillText(name, 48, textY);
    ctx.shadowBlur = 0;

    textY += 32;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`📍 ${location}`, 48, textY);

    // Hot Comment Card
    textY += 24;
    const comments = storage.getComments(currentSpot.id) || [];
    const topComment = comments.length > 0
      ? [...comments].sort((a, b) => (Number(b.likes || 0) - Number(a.likes || 0)))[0]
      : {
          text: '“这段旋律不是把人带离生活，而是把散落在生活里的自己慢慢领回来。”',
          author: '把晚风装进口袋'
        };

    const commentBoxY = textY;
    const commentBoxH = 100;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(48, commentBoxY, contentMaxWidth, commentBoxH);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(48, commentBoxY, 4, commentBoxH);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'italic 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    wrapText(ctx, `“${topComment.text.replace(/^[“”]/g, '')}”`, 64, commentBoxY + 34, contentMaxWidth - 32, 24, 2);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`—— @${topComment.author}`, 64, commentBoxY + 84);

    // 5. Trigger Image Download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `GeoMelody-${name}.png`;
      link.href = dataUrl;
      link.click();
      this.showToast(currentLanguage === 'en' ? 'Card saved to album/local' : '分享卡片已保存到相册/本地');
    } catch (e) {
      console.error('[ShareCard] Export failed:', e);
      this.showToast('导出图片失败，请使用系统截图分享');
    }
  }
};

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
    const track = getDemoTrack(spot);
    const categoryInfo = CATEGORIES[spot.category] || { label: '探索', enLabel: 'Explore' };
    const categoryLabel = currentLanguage === 'en' ? categoryInfo.enLabel : categoryInfo.label;
    const coverUrl = spot.photos?.[0] || '/textures/earth_dark.jpg';

    if (this.spotTitle) this.spotTitle.textContent = name;
    if (this.locationText) this.locationText.textContent = location;
    if (this.categoryBadge) this.categoryBadge.textContent = categoryLabel;
    if (this.musicText) this.musicText.textContent = `♫ ${track.title} · ${spot.audioRecipe?.instruments || '专属音景'}`;
    if (this.storyText) this.storyText.textContent = spot.description || '';
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
          author: '把晚风装进口袋',
          likes: 2480
        };

    if (this.commentLikes) this.commentLikes.textContent = `❤️ ${Number(topComment.likes || 0).toLocaleString()}`;
    if (this.commentText) this.commentText.textContent = `“${topComment.text.replace(/^[“”]/g, '')}”`;
    if (this.commentAuthor) this.commentAuthor.textContent = `—— @${topComment.author}`;

    // Generate QR Code
    const shareUrl = shareUtil.getSpotShareUrl(spot.id);
    if (this.qrCanvas) {
      try {
        await QRCode.toCanvas(this.qrCanvas, shareUrl, {
          width: 144,
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
    const track = getDemoTrack(currentSpot);
    const coverUrl = currentSpot.photos?.[0] || '/textures/earth_dark.jpg';

    this.showToast(currentLanguage === 'en' ? 'Generating high-res card…' : '正在生成高清分享图…');

    // Create high-res offscreen canvas
    const canvas = document.createElement('canvas');
    const width = 720;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.5, '#090d16');
    bgGrad.addColorStop(1, '#04070d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle Cyan Outer Border
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // 2. Header Brand
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('境音地图 · GeoMelody', 48, 64);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('3D 沉浸式全球视听与治愈音乐', 48, 92);

    // 3. Load & Draw Cover Image
    const coverImage = new Image();
    coverImage.crossOrigin = 'anonymous';
    coverImage.src = coverUrl;

    await new Promise((resolve) => {
      coverImage.onload = resolve;
      coverImage.onerror = () => resolve();
    });

    const coverX = 48;
    const coverY = 120;
    const coverW = width - 96;
    const coverH = 340;

    // Rounded rectangle clip for image
    ctx.save();
    ctx.beginPath();
    const r = 16;
    ctx.moveTo(coverX + r, coverY);
    ctx.arcTo(coverX + coverW, coverY, coverX + coverW, coverY + coverH, r);
    ctx.arcTo(coverX + coverW, coverY + coverH, coverX, coverY + coverH, r);
    ctx.arcTo(coverX, coverY + coverH, coverX, coverY, r);
    ctx.arcTo(coverX, coverY, coverX + coverW, coverY, r);
    ctx.closePath();
    ctx.clip();

    try {
      ctx.drawImage(coverImage, coverX, coverY, coverW, coverH);
    } catch (_) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(coverX, coverY, coverW, coverH);
    }

    // Location Pill on Cover
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(coverX + 16, coverY + coverH - 48, 220, 32);
    ctx.restore();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`📍 ${location}`, coverX + 28, coverY + coverH - 27);

    // 4. Spot Title
    let currentY = 500;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(name, 48, currentY);

    // Music Info Pill
    currentY += 36;
    ctx.fillStyle = '#38bdf8';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`♫ ${track.title} · ${currentSpot.audioRecipe?.instruments || '专属音景'} (${currentSpot.audioRecipe?.bpm || 72} BPM)`, 48, currentY);

    // Description / Story
    currentY += 30;
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'italic 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    currentY = wrapText(ctx, currentSpot.description || '', 48, currentY, width - 96, 26, 3);

    // 5. Hot Comment Box
    currentY += 15;
    const boxY = currentY;
    const boxH = 150;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(48, boxY, width - 96, boxH);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(48, boxY, 4, boxH);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('精选热评 · HOT COMMENT', 66, boxY + 28);

    const comments = storage.getComments(currentSpot.id) || [];
    const topComment = comments.length > 0
      ? [...comments].sort((a, b) => (Number(b.likes || 0) - Number(a.likes || 0)))[0]
      : {
          text: '“这段旋律不是把人带离生活，而是把散落在生活里的自己慢慢领回来。”',
          author: '把晚风装进口袋'
        };

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    wrapText(ctx, `“${topComment.text.replace(/^[“”]/g, '')}”`, 66, boxY + 62, width - 132, 24, 2);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`—— @${topComment.author}`, width - 180, boxY + 126);

    // 6. QR Code & Guide
    const footerY = height - 140;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(48, footerY - 15);
    ctx.lineTo(width - 48, footerY - 15);
    ctx.stroke();
    ctx.setLineDash([]);

    if (this.qrCanvas) {
      ctx.drawImage(this.qrCanvas, 48, footerY, 96, 96);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('扫码或长按直接进入', 162, footerY + 36);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('在 3D 地球上聆听此胜景与专属音乐', 162, footerY + 68);

    // 7. Trigger Image Download
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

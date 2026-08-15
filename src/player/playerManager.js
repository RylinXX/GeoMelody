import { soundEngine } from '../audio/soundEngine.js';
import { storage } from '../utils/storage.js';
import { shareUtil } from '../utils/share.js';
import { CATEGORY_MAP } from '../data/categories.js';
import { getSpotSunStatus } from '../utils/sunTerminator.js';
import { getDemoTrack } from '../data/demoTracks.js';
import {
  LANGUAGES,
  getCategoryName,
  getSpotDescription,
  getSpotLocation,
  getSpotName,
  getSpotSecondaryName,
  getSunLabel,
  t
} from '../utils/i18n.js';

export class PlayerManager {
  constructor({ spots, onSpotChange, onExit, showToast, getLanguage = () => LANGUAGES.ZH }) {
    this.spots = spots;
    this.onSpotChange = onSpotChange;
    this.onExit = onExit;
    this.showToast = showToast;
    this.getLanguage = getLanguage;

    this.currentSpot = null;
    this.currentPhotoIndex = 0;
    this.photoTimer = null;
    this.isAutoTourActive = false;
    this.autoTourTimer = null;
    this.autoTourIntervalSec = 35;

    this.isZenMode = false;
    this.idleTimer = null;
    this.visualizerAnimationId = null;

    // Elements cache
    this.overlay = document.getElementById('immersive-player');
    this.uiLayer = document.getElementById('player-ui-layer');
    this.bgCanvas = document.getElementById('player-bg-canvas');
    this.photoDots = document.getElementById('player-photo-dots');
    this.visualizerContainer = document.getElementById('player-visualizer');

    this.initVisualizer();
    this.bindEvents();
  }

  initVisualizer() {
    if (!this.visualizerContainer) return;
    this.visualizerContainer.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const bar = document.createElement('div');
      bar.className = 'viz-bar';
      this.visualizerContainer.appendChild(bar);
    }
  }

  bindEvents() {
    if (this.overlay) {
      this.overlay.addEventListener('mousemove', () => this.handleUserActivity());
      this.overlay.addEventListener('click', () => {
        if (this.uiLayer.classList.contains('ui-hidden')) {
          this.revealUI();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!this.currentSpot || !this.overlay.classList.contains('active')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowRight') {
        this.nextSpot();
      } else if (e.code === 'ArrowLeft') {
        this.prevSpot();
      } else if (e.code === 'KeyZ') {
        this.toggleZenMode();
      } else if (e.code === 'KeyF') {
        this.toggleFullscreen();
      } else if (e.code === 'Escape') {
        this.close();
      }
    });
  }

  handleUserActivity() {
    this.revealUI();
    if (this.isZenMode) {
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        if (this.isZenMode && this.currentSpot) {
          this.uiLayer.classList.add('ui-hidden');
        }
      }, 4000);
    }
  }

  revealUI() {
    this.uiLayer.classList.remove('ui-hidden');
  }

  openSpot(spot, autoStartAudio = true) {
    if (!spot) return;
    this.currentSpot = spot;
    this.currentPhotoIndex = 0;

    this.renderSpotInfo(spot);
    this.renderPhotos(spot.photos);
    this.updateFavoriteButton();

    this.overlay.classList.add('active');
    shareUtil.updateUrl(spot.id);

    if (autoStartAudio) {
      soundEngine.playSpot(spot);
      this.updatePlayButton(true);
    }

    this.startPhotoSlideshow();
    this.startVisualizerLoop();

    if (this.onSpotChange) {
      this.onSpotChange(spot);
    }
  }

  setLanguage() {
    if (!this.currentSpot) return;
    this.renderSpotInfo(this.currentSpot);
    this.renderPhotos(this.currentSpot.photos);
  }

  renderSpotInfo(spot) {
    const cat = CATEGORY_MAP[spot.category] || { name: '探索', color: '#38bdf8' };
    const sunStatus = getSpotSunStatus(spot.lat, spot.lng, new Date());
    const language = this.getLanguage();
    
    // Category & Coordinates & Solar State
    const categoryEl = document.getElementById('player-category-badge');
    if (categoryEl) {
      categoryEl.textContent = getCategoryName(cat, language);
      categoryEl.style.color = cat.color;
    }

    const coordsEl = document.getElementById('player-coords-badge');
    if (coordsEl) {
      coordsEl.innerHTML = `<span>${getSunLabel(sunStatus, language)}</span> · <span>${spot.lat.toFixed(2)}°, ${spot.lng.toFixed(2)}°</span> · <span>${getSpotLocation(spot, language)}</span>`;
    }

    // Titles
    const titleEl = document.getElementById('player-spot-title');
    if (titleEl) titleEl.textContent = getSpotName(spot, language);

    const enTitleEl = document.getElementById('player-spot-en-title');
    if (enTitleEl) enTitleEl.textContent = getSpotSecondaryName(spot, language);

    // Poetic Story Quote
    const storyEl = document.getElementById('player-story-quote');
    if (storyEl) storyEl.textContent = getSpotDescription(spot, language);

    // AI Audio Formula
    const formulaEl = document.getElementById('player-audio-formula');
    if (formulaEl) {
      const rec = spot.audioRecipe;
      const scale = language === LANGUAGES.EN ? t('regionalMode', language) : rec.scale;
      const instruments = language === LANGUAGES.EN ? t('localInstruments', language) : rec.instruments;
      formulaEl.innerHTML = `<span><strong>${t('scaleLabel', language)}：</strong>${scale}</span><span class="formula-separator">·</span><span><strong>${t('instrumentsLabel', language)}：</strong>${instruments}</span><span class="formula-separator">·</span><span><strong>${t('tempoLabel', language)}：</strong>${rec.bpm} BPM</span>`;
    }

    const creditEl = document.getElementById('player-track-credit');
    if (creditEl) {
      const track = getDemoTrack(spot);
      const prefix = spot.audioTrack?.url ? t('userUpload', language) : t('demoMusic', language);
      const credit = `${prefix} · ${track.title} — ${track.creator} · ${track.license}`;
      creditEl.innerHTML = track.sourceUrl
        ? `<a href="${track.sourceUrl}" target="_blank" rel="noopener noreferrer">${credit}</a>`
        : credit;
    }
  }

  renderPhotos(photos) {
    if (!this.bgCanvas) return;
    this.bgCanvas.innerHTML = '';
    this.photoDots.innerHTML = '';

    photos.forEach((url, index) => {
      const img = document.createElement('img');
      if (index === 0) img.src = url;
      else img.dataset.src = url;
      img.alt = getSpotName(this.currentSpot, this.getLanguage());
      img.className = `scenery-slide-img ${index === 0 ? 'visible' : ''}`;
      img.loading = index === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.fetchPriority = index === 0 ? 'high' : 'low';
      this.bgCanvas.appendChild(img);

      // Dot indicator
      const dot = document.createElement('div');
      dot.className = `scenery-dot ${index === 0 ? 'active' : ''}`;
      dot.title = t('photo', this.getLanguage(), { number: index + 1 });
      dot.addEventListener('click', () => this.switchPhoto(index));
      this.photoDots.appendChild(dot);
    });
  }

  switchPhoto(index) {
    const imgs = this.bgCanvas.querySelectorAll('.scenery-slide-img');
    const dots = this.photoDots.querySelectorAll('.scenery-dot');
    if (!imgs.length) return;

    this.currentPhotoIndex = (index + imgs.length) % imgs.length;

    const activeImage = imgs[this.currentPhotoIndex];
    if (activeImage && !activeImage.hasAttribute('src') && activeImage.dataset.src) {
      activeImage.src = activeImage.dataset.src;
      activeImage.fetchPriority = 'high';
    }

    imgs.forEach((img, i) => {
      img.classList.toggle('visible', i === this.currentPhotoIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentPhotoIndex);
    });
  }

  nextPhoto() {
    this.switchPhoto(this.currentPhotoIndex + 1);
  }

  prevPhoto() {
    this.switchPhoto(this.currentPhotoIndex - 1);
  }

  startPhotoSlideshow() {
    this.stopPhotoSlideshow();
    this.photoTimer = setInterval(() => {
      this.nextPhoto();
    }, 10000);
  }

  stopPhotoSlideshow() {
    if (this.photoTimer) {
      clearInterval(this.photoTimer);
      this.photoTimer = null;
    }
  }

  // Navigation Between Spots
  nextSpot() {
    if (!this.currentSpot) return;
    const currentIndex = this.spots.findIndex(s => s.id === this.currentSpot.id);
    const nextIndex = (currentIndex + 1) % this.spots.length;
    this.openSpot(this.spots[nextIndex]);
  }

  prevSpot() {
    if (!this.currentSpot) return;
    const currentIndex = this.spots.findIndex(s => s.id === this.currentSpot.id);
    const prevIndex = (currentIndex - 1 + this.spots.length) % this.spots.length;
    this.openSpot(this.spots[prevIndex]);
  }

  randomRoam() {
    const otherSpots = this.spots.filter(s => !this.currentSpot || s.id !== this.currentSpot.id);
    const randomSpot = otherSpots[Math.floor(Math.random() * otherSpots.length)] || this.spots[0];
    if (randomSpot) {
      this.openSpot(randomSpot, true);
      this.showToast(t('roamTo', this.getLanguage(), { name: getSpotName(randomSpot, this.getLanguage()) }));
    }
  }

  // Auto Cruise Mode (Desktop Wallpaper Tour)
  toggleAutoTour() {
    this.isAutoTourActive = !this.isAutoTourActive;
    if (this.isAutoTourActive) {
      if (!this.currentSpot) {
        const spot = this.spots[Math.floor(Math.random() * this.spots.length)] || this.spots[0];
        this.openSpot(spot, true);
      } else {
        this.nextSpot();
      }
      this.showToast(t('autoTourOn', this.getLanguage()));
      if (this.autoTourTimer) clearInterval(this.autoTourTimer);
      this.autoTourTimer = setInterval(() => {
        this.nextSpot();
      }, 16000);
    } else {
      this.showToast(t('autoTourOff', this.getLanguage()));
      if (this.autoTourTimer) {
        clearInterval(this.autoTourTimer);
        this.autoTourTimer = null;
      }
    }
    return this.isAutoTourActive;
  }

  // Zen Mode / Fullscreen
  toggleZenMode() {
    this.isZenMode = !this.isZenMode;
    if (this.isZenMode) {
      this.uiLayer.classList.add('ui-hidden');
      this.showToast(t('zenOn', this.getLanguage()));
    } else {
      this.uiLayer.classList.remove('ui-hidden');
      clearTimeout(this.idleTimer);
    }
    const zenBtn = document.getElementById('player-zen-btn');
    zenBtn?.classList.toggle('active', this.isZenMode);
    zenBtn?.setAttribute('aria-pressed', String(this.isZenMode));
    return this.isZenMode;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      this.showToast(t('fullscreenOn', this.getLanguage()));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  // Audio & Visualizer
  togglePlay() {
    if (!this.currentSpot) return;
    soundEngine.togglePlay(this.currentSpot);
    this.updatePlayButton(soundEngine.isPlaying);
  }

  updatePlayButton(isPlaying) {
    const playBtn = document.getElementById('player-play-btn');
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
    playBtn.setAttribute('aria-pressed', String(isPlaying));
  }

  startVisualizerLoop() {
    const bars = this.visualizerContainer?.querySelectorAll('.viz-bar') || [];
    if (!bars.length) return;

    const render = () => {
      if (this.overlay.classList.contains('active') && soundEngine.isPlaying) {
        const data = soundEngine.getVisualizerData();
        bars.forEach((bar, i) => {
          const val = data[i * 2] || 0;
          const height = Math.max(3, (val / 255) * 16);
          bar.style.height = `${height}px`;
        });
      }
      this.visualizerAnimationId = requestAnimationFrame(render);
    };

    if (this.visualizerAnimationId) {
      cancelAnimationFrame(this.visualizerAnimationId);
    }
    this.visualizerAnimationId = requestAnimationFrame(render);
  }

  // Favorites & Share
  toggleFavorite() {
    if (!this.currentSpot) return;
    const { isFavorite } = storage.toggleFavorite(this.currentSpot.id);
    this.updateFavoriteButton();
    this.showToast(isFavorite
      ? t('favoriteAdded', this.getLanguage(), { name: getSpotName(this.currentSpot, this.getLanguage()) })
      : t('favoriteRemoved', this.getLanguage()));
    return isFavorite;
  }

  updateFavoriteButton() {
    const favBtn = document.getElementById('player-fav-btn');
    if (!favBtn || !this.currentSpot) return;
    const isFav = storage.isFavorite(this.currentSpot.id);
    favBtn.classList.toggle('active', isFav);
    favBtn.setAttribute('aria-pressed', String(isFav));
    favBtn.innerHTML = isFav
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#fb7185"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
  }

  async shareCurrentSpot() {
    if (!this.currentSpot) return;
    const shareUrl = shareUtil.getSpotShareUrl(this.currentSpot.id);
    const success = await shareUtil.copyToClipboard(shareUrl);
    if (success) {
      this.showToast(t('shareCopied', this.getLanguage(), { name: getSpotName(this.currentSpot, this.getLanguage()) }));
    } else {
      this.showToast(t('shareFallback', this.getLanguage(), { url: shareUrl }));
    }
  }

  close() {
    this.overlay.classList.remove('active');
    this.stopPhotoSlideshow();
    shareUtil.updateUrl(null);
    if (this.onExit) {
      this.onExit(this.currentSpot);
    }
  }
}

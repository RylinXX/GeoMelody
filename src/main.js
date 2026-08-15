import { SCENIC_SPOTS } from './data/spots.js';
import { CATEGORY_MAP } from './data/categories.js';
import { MAP_REGIONS, getRegionName } from './data/regions.js';
import { DEMO_TRACKS_LIST, getDemoTrack } from './data/demoTracks.js';
import { GlobeManager } from './map/globeManager.js';
import { PlayerManager } from './player/playerManager.js';
import { CommunityManager } from './community/communityManager.js';
import { soundEngine } from './audio/soundEngine.js';
import { storage, DEFAULT_SETTINGS } from './utils/storage.js';
import { shareUtil } from './utils/share.js';
import { shareCardManager } from './utils/shareCard.js';
import { CosmicStarfield } from './utils/cosmicStars.js';
import {
  LANGUAGES,
  applyTranslations,
  getCategoryName,
  getInitialLanguage,
  getSpotLocation,
  getSpotName,
  persistLanguage,
  t
} from './utils/i18n.js';

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Cosmic Outer-Space Twinkling Starfield
  try {
    const starfield = new CosmicStarfield();
    starfield.init();
  } catch (err) {
    console.warn('Cosmic starfield fallback:', err);
  }

  const THEME_STORAGE_KEY = 'geomelody-theme';
  let viewMode = '3d';
  let activeRegion = 'asia';
  let currentLanguage = getInitialLanguage();
  let currentTheme = 'dark';
  try {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  } catch {}
  let currentSettings = storage.getSettings();
  if (currentSettings.mapSkin === 'dataviz-light') {
    currentSettings.mapSkin = 'streets-dark';
    storage.saveSettings({ mapSkin: 'streets-dark' });
  }

  storage.getCommunityPosts().forEach(post => {
    if (!SCENIC_SPOTS.some(spot => spot.id === post.id)) SCENIC_SPOTS.unshift(post);
  });

  const regionNavigation = document.getElementById('region-navigation');
  const searchInput = document.getElementById('spot-search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const toggleViewModeBtn = document.getElementById('dock-btn-toggle-view-mode');
  const viewModeText = document.getElementById('view-mode-btn-text');
  const autoTourBtn = document.getElementById('dock-btn-auto-tour');
  const autoTourText = document.getElementById('auto-tour-btn-text');
  const languageBtn = document.getElementById('btn-language-toggle');
  const playerLanguageBtn = document.getElementById('player-language-toggle');
  const playerLanguageLabel = document.getElementById('player-language-label');
  const themeBtn = document.getElementById('btn-theme-toggle');
  const playerThemeBtn = document.getElementById('player-theme-toggle');

  const miniIsland = document.getElementById('mini-audio-island');
  const miniThumb = document.getElementById('mini-audio-thumb');
  const miniName = document.getElementById('mini-audio-name');
  const miniDesc = document.getElementById('mini-audio-desc');
  const miniPlayBtn = document.getElementById('mini-play-toggle-btn');

  const favDrawer = document.getElementById('fav-drawer');
  const favBackdrop = document.getElementById('fav-drawer-backdrop');
  const favCountBadge = document.getElementById('fav-count-badge');
  const favListContainer = document.getElementById('fav-list-container');
  const favToggleBtn = document.getElementById('btn-toggle-favorites');

  // Leaderboard Drawer Elements
  const leaderboardDrawer = document.getElementById('leaderboard-drawer');
  const leaderboardBackdrop = document.getElementById('leaderboard-drawer-backdrop');
  const leaderboardToggleBtn = document.getElementById('btn-toggle-leaderboard');
  const closeLeaderboardBtn = document.getElementById('btn-close-leaderboard');
  const leaderboardListContainer = document.getElementById('leaderboard-list-container');
  const navLanguageLabel = document.getElementById('nav-language-label');

  // Settings Drawer Elements
  const settingsDrawer = document.getElementById('settings-drawer');
  const settingsBackdrop = document.getElementById('settings-drawer-backdrop');
  const settingsToggleBtn = document.getElementById('btn-toggle-settings');
  const closeSettingsBtn = document.getElementById('btn-close-settings-drawer');
  const resetSettingsBtn = document.getElementById('btn-reset-settings');

  const selectMapSkinInput = document.getElementById('setting-select-mapskin');
  const toggleStarsInput = document.getElementById('setting-toggle-stars');
  const toggleHaloInput = document.getElementById('setting-toggle-halo');
  const toggleAutoSpinInput = document.getElementById('setting-toggle-autospin');
  const toggleAutoPlayInput = document.getElementById('setting-toggle-autoplay');

  // Spot Preview Bottom Card Elements
  const spotPreviewCard = document.getElementById('spot-preview-card');
  const btnCloseSpotPreview = document.getElementById('btn-close-spot-preview');
  const btnSpotPreviewEnter = document.getElementById('btn-spot-preview-enter');
  let previewSpotTarget = null;

  function showSpotPreviewCard(spot) {
    if (!spot || !spotPreviewCard) return;

    // If tapping the already open preview spot again, directly enter full player!
    if (previewSpotTarget && previewSpotTarget.id === spot.id && spotPreviewCard.classList.contains('visible')) {
      hideSpotPreviewCard();
      playerManager.openSpot(spot, true);
      return;
    }

    previewSpotTarget = spot;
    globeManager.flyToSpot(spot, 6.2);

    const coverEl = document.getElementById('spot-preview-img');
    const catEl = document.getElementById('spot-preview-category');
    const nameEl = document.getElementById('spot-preview-name');
    const locEl = document.getElementById('spot-preview-loc');
    const storyEl = document.getElementById('spot-preview-story');
    const trackTitleEl = document.getElementById('spot-preview-track-title');

    if (coverEl) coverEl.src = spot.photos?.[0] || '';
    if (catEl) {
      const cat = CATEGORY_MAP[spot.category];
      catEl.textContent = getCategoryName(cat, currentLanguage);
    }
    if (nameEl) nameEl.textContent = getSpotName(spot, currentLanguage);
    if (locEl) locEl.textContent = `${getSpotLocation(spot, currentLanguage)} · ${spot.lat.toFixed(2)}°, ${spot.lng.toFixed(2)}°`;
    if (storyEl) storyEl.textContent = getSpotDescription(spot, currentLanguage);
    if (trackTitleEl) {
      const track = getDemoTrack(spot);
      trackTitleEl.textContent = track ? `${track.title} — ${track.creator}` : (spot.audioRecipe?.scale || '');
    }

    miniIsland?.classList.remove('visible');
    spotPreviewCard.classList.add('visible');
    spotPreviewCard.setAttribute('aria-hidden', 'false');
  }

  function hideSpotPreviewCard() {
    if (!spotPreviewCard) return;
    spotPreviewCard.classList.remove('visible');
    spotPreviewCard.setAttribute('aria-hidden', 'true');
    previewSpotTarget = null;
  }

  btnCloseSpotPreview?.addEventListener('click', event => {
    event.stopPropagation();
    hideSpotPreviewCard();
  });

  spotPreviewCard?.addEventListener('click', event => {
    if (event.target.closest('#btn-close-spot-preview')) return;
    if (previewSpotTarget) {
      const target = previewSpotTarget;
      hideSpotPreviewCard();
      playerManager.openSpot(target, true);
    }
  });

  let playerManager;
  let communityManager;

  const globeManager = new GlobeManager({
    containerId: 'globe-container',
    spots: SCENIC_SPOTS,
    language: currentLanguage,
    theme: currentTheme,
    settings: currentSettings,
    onSpotSelect: spot => showSpotPreviewCard(spot),
    onMapClick: () => hideSpotPreviewCard()
  });
  try {
    globeManager.init();
  } catch (error) {
    document.documentElement.dataset.mapError = error?.message || String(error);
    console.error('[GeoMelody map] Initialization failed.', error);
  }

  playerManager = new PlayerManager({
    spots: SCENIC_SPOTS,
    getLanguage: () => currentLanguage,
    onSpotChange: spot => {
      globeManager.flyToSpot(spot);
      updateMiniAudioIsland(spot, soundEngine.isPlaying);
      communityManager?.setActiveSpot(spot);
    },
    onExit: spot => updateMiniAudioIsland(spot, soundEngine.isPlaying),
    showToast
  });

  communityManager = new CommunityManager({
    spots: SCENIC_SPOTS,
    getLanguage: () => currentLanguage,
    showToast,
    onBeforeOpen: () => {
      hideSpotPreviewCard();
      toggleFavDrawer(false);
      toggleSettingsDrawer(false);
      toggleLeaderboardDrawer(false);
    },
    onPublish: spot => {
      globeManager.renderLightDotMarkers();
      playerManager.openSpot(spot, true);
    }
  });

  shareCardManager.init({
    showToast,
    getLanguage: () => currentLanguage
  });

  function renderRegionNavigation() {
    if (!regionNavigation) return;
    regionNavigation.innerHTML = '';
    MAP_REGIONS.forEach(region => {
      const chip = document.createElement('button');
      const regionName = getRegionName(region, currentLanguage);
      chip.className = `category-chip region-chip ${region.id === activeRegion ? 'active' : ''}`;
      chip.dataset.region = region.id;
      chip.setAttribute('aria-pressed', String(region.id === activeRegion));
      chip.innerHTML = `<span class="region-chip-icon">${region.icon}</span><span>${regionName}</span>`;
      chip.addEventListener('click', () => {
        activeRegion = region.id;
        globeManager.flyToRegion(region);
        renderRegionNavigation();
        showToast(t('regionFocused', currentLanguage, { name: regionName }));
      });
      regionNavigation.appendChild(chip);
    });
  }

  function getMatches(query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return SCENIC_SPOTS.filter(spot => {
      const track = getDemoTrack(spot);
      return [
        spot.name,
        spot.enName,
        spot.location,
        spot.enLocation,
        spot.country,
        spot.category,
        track?.title,
        track?.enTitle,
        track?.creator,
        ...(spot.tags || [])
      ].some(value => value?.toLowerCase().includes(normalizedQuery));
    }).slice(0, 8);
  }

  function selectSearchSpot(spot) {
    if (!spot) return;
    playerManager.openSpot(spot, currentSettings.autoPlay);
    searchDropdown?.classList.remove('visible');
    if (searchInput) searchInput.value = '';
    globeManager.setSearchQuery('');
  }

  function renderSearchRecommendations() {
    if (!searchDropdown) return;
    const isZh = currentLanguage !== LANGUAGES.EN;

    const hotSpots = [
      { id: 'westlake_5a', name: '杭州西湖', enName: 'West Lake' },
      { id: 'forbidden_city', name: '北京故宫', enName: 'Forbidden City' },
      { id: 'everest', name: '珠穆朗玛峰', enName: 'Mt. Everest' },
      { id: 'mount_tai', name: '泰山', enName: 'Mount Tai' },
      { id: 'guilin_5a', name: '桂林漓江', enName: 'Li River' },
      { id: 'paris', name: '巴黎铁塔', enName: 'Eiffel Tower' },
      { id: 'santorini', name: '圣托里尼', enName: 'Santorini' }
    ];

    const hotTags = [
      { tag: '5A景区', label: isZh ? '5A 级胜景' : '5A Scenic' },
      { tag: '世界遗产', label: isZh ? '世界遗产' : 'World Heritage' },
      { tag: '古镇', label: isZh ? '江南古镇' : 'Water Towns' },
      { tag: '雪山', label: isZh ? '雪山高原' : 'Snow Mountains' },
      { tag: '海岛', label: isZh ? '海岛沙滩' : 'Islands' },
      { tag: '治愈', label: isZh ? '治愈助眠' : 'Healing' }
    ];

    searchDropdown.innerHTML = `
      <div class="search-dropdown-section">
        <div class="search-section-header">${isZh ? '🔥 热门胜景推荐' : '🔥 Popular Spots'}</div>
        <div class="search-tag-group">
          ${hotSpots.map(s => `
            <button class="search-tag-chip" type="button" data-action="spot" data-id="${s.id}">
              ${isZh ? s.name : s.enName}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="search-dropdown-section">
        <div class="search-section-header">${isZh ? '🎵 热门曲目探索' : '🎵 Featured Tracks'}</div>
        <div class="search-track-list">
          ${DEMO_TRACKS_LIST.slice(0, 4).map(track => `
            <button class="search-track-item" type="button" data-action="track" data-track-id="${track.id}">
              <span class="search-track-title">${isZh ? track.title : (track.enTitle || track.title)}</span>
              <span class="search-track-artist">${track.creator}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="search-dropdown-section">
        <div class="search-section-header">${isZh ? '🏷️ 热门城市与标签' : '🏷️ Trending Tags'}</div>
        <div class="search-tag-group">
          ${hotTags.map(t => `
            <button class="search-tag-chip" type="button" data-action="tag" data-tag="${t.tag}">
              # ${t.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    searchDropdown.classList.add('visible');

    searchDropdown.querySelectorAll('[data-action="spot"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const spot = SCENIC_SPOTS.find(s => s.id === btn.dataset.id);
        if (spot) selectSearchSpot(spot);
      });
    });

    searchDropdown.querySelectorAll('[data-action="track"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const trackId = btn.dataset.trackId;
        const matchingSpot = SCENIC_SPOTS.find(s => getDemoTrack(s).id === trackId) || SCENIC_SPOTS[0];
        selectSearchSpot(matchingSpot);
      });
    });

    searchDropdown.querySelectorAll('[data-action="tag"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const tag = btn.dataset.tag;
        if (searchInput) {
          searchInput.value = tag;
          renderSearchResults(tag);
          globeManager.setSearchQuery(tag);
        }
      });
    });
  }

  function renderSearchResults(query) {
    if (!searchDropdown) return;
    const cleanQuery = query?.trim() || '';
    if (!cleanQuery) {
      renderSearchRecommendations();
      return;
    }

    const matches = getMatches(cleanQuery);
    if (!matches.length) {
      searchDropdown.innerHTML = `<div class="search-empty-state">${t('noResults', currentLanguage)}</div>`;
      searchDropdown.classList.add('visible');
      return;
    }

    searchDropdown.innerHTML = `
      <div class="search-dropdown-section">
        <div class="search-section-header">${currentLanguage !== LANGUAGES.EN ? `匹配到 ${matches.length} 个胜景` : `Found ${matches.length} spots`}</div>
        ${matches.map(spot => {
          const category = CATEGORY_MAP[spot.category] || { name: t('explore', currentLanguage), enName: t('explore', currentLanguage) };
          const track = getDemoTrack(spot);
          return `
            <button class="search-result-item" type="button" data-id="${spot.id}">
              <span class="search-result-info">
                <span class="search-result-name">${getSpotName(spot, currentLanguage)}</span>
                <span class="search-result-loc">${getSpotLocation(spot, currentLanguage)} · ♫ ${track?.title || ''}</span>
              </span>
              <span class="search-result-cat">${getCategoryName(category, currentLanguage)}</span>
            </button>`;
        }).join('')}
      </div>
    `;

    searchDropdown.classList.add('visible');
    searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => selectSearchSpot(SCENIC_SPOTS.find(spot => spot.id === item.dataset.id)));
    });
  }

  function updateMiniPlayButton(isPlaying) {
    if (!miniPlayBtn) return;
    miniPlayBtn.innerHTML = isPlaying
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
    miniPlayBtn.setAttribute('aria-pressed', String(isPlaying));
  }

  function updateMiniAudioIsland(spot, isPlaying) {
    if (!spot || !miniIsland) {
      miniIsland?.classList.remove('visible');
      return;
    }
    const playerIsOpen = document.getElementById('immersive-player')?.classList.contains('active');
    if (!playerIsOpen && isPlaying) {
      miniIsland.classList.add('visible');
      const track = getDemoTrack(spot);
      miniThumb.src = spot.photos[0];
      miniThumb.alt = getSpotName(spot, currentLanguage);
      miniName.textContent = track ? `${track.title} · ${track.creator}` : getSpotName(spot, currentLanguage);
      miniDesc.textContent = `${getSpotName(spot, currentLanguage)} · ${getSpotLocation(spot, currentLanguage)}`;
    } else {
      miniIsland.classList.remove('visible');
    }
    miniIsland.classList.toggle('paused', !isPlaying);
    updateMiniPlayButton(isPlaying);
  }

  function updateFavoriteBadge() {
    if (favCountBadge) favCountBadge.textContent = storage.getFavorites().length;
  }

  function renderFavoritesList() {
    if (!favListContainer) return;
    const favoriteSpots = storage.getFavorites()
      .map(id => SCENIC_SPOTS.find(spot => spot.id === id))
      .filter(Boolean);
    if (!favoriteSpots.length) {
      favListContainer.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <p>${t('emptyFavorites', currentLanguage)}</p>
          <span>${t('emptyFavoritesHint', currentLanguage)}</span>
        </div>`;
      return;
    }
    favListContainer.innerHTML = favoriteSpots.map(spot => {
      const category = CATEGORY_MAP[spot.category] || { name: t('explore', currentLanguage) };
      return `
        <article class="fav-item-card" data-id="${spot.id}" tabindex="0">
          <img src="${spot.photos[0]}" class="fav-thumb" alt="${getSpotName(spot, currentLanguage)}" loading="lazy"/>
          <div class="fav-info">
            <span class="fav-name">${getSpotName(spot, currentLanguage)}</span>
            <span class="fav-location">${getSpotLocation(spot, currentLanguage)}</span>
            <span class="fav-tag">${getCategoryName(category, currentLanguage)}</span>
          </div>
          <button class="fav-remove-btn" title="${t('removeFavorite', currentLanguage)}" aria-label="${t('removeFavorite', currentLanguage)}" data-remove="${spot.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </article>`;
    }).join('');
    favListContainer.querySelectorAll('.fav-item-card').forEach(card => {
      const openCard = () => {
        const spot = SCENIC_SPOTS.find(item => item.id === card.dataset.id);
        if (!spot) return;
        playerManager.openSpot(spot, true);
        toggleFavDrawer(false);
      };
      card.addEventListener('click', event => {
        if (event.target.closest('.fav-remove-btn')) return;
        openCard();
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCard();
        }
      });
    });
    favListContainer.querySelectorAll('.fav-remove-btn').forEach(btn => {
      btn.addEventListener('click', event => {
        event.stopPropagation();
        storage.toggleFavorite(btn.dataset.remove);
        updateFavoriteBadge();
        renderFavoritesList();
        playerManager.updateFavoriteButton();
        showToast(t('favoriteRemoved', currentLanguage));
      });
    });
  }

  function toggleFavDrawer(open) {
    const nextState = open ?? !favDrawer?.classList.contains('open');
    if (nextState) {
      hideSpotPreviewCard();
      communityManager.close();
      toggleSettingsDrawer(false);
      toggleLeaderboardDrawer(false);
      renderFavoritesList();
    }
    favDrawer?.classList.toggle('open', nextState);
    favBackdrop?.classList.toggle('open', nextState);
    favToggleBtn?.setAttribute('aria-expanded', String(nextState));
    favDrawer?.setAttribute('aria-hidden', String(!nextState));
  }

  // ==================== Hot Leaderboard Drawer Management ====================
  function renderLeaderboard() {
    if (!leaderboardListContainer) return;
    const ranked = storage.getLeaderboardSpots(SCENIC_SPOTS);

    if (!ranked.length) {
      leaderboardListContainer.innerHTML = `<div class="empty-state"><span>暂无排行榜数据</span></div>`;
      return;
    }

    leaderboardListContainer.innerHTML = ranked.map((item, index) => {
      const { spot, likes } = item;
      const rank = index + 1;
      const rankClass = rank === 1 ? 'rank-1' : (rank === 2 ? 'rank-2' : (rank === 3 ? 'rank-3' : ''));
      const rankIcon = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : `${rank}`));
      const spotName = getSpotName(spot, currentLanguage);
      const spotLocation = getSpotLocation(spot, currentLanguage);
      const track = getDemoTrack(spot);
      const photo = spot.photos?.[0] || '/textures/earth_day.jpg';

      return `
        <div class="leaderboard-card ${rankClass}" data-spot-id="${spot.id}" role="button" tabindex="0">
          <div class="leaderboard-rank-badge">${rankIcon}</div>
          <img class="leaderboard-thumb" src="${photo}" alt="${spotName}" loading="lazy" />
          <div class="leaderboard-info">
            <div class="leaderboard-spot-title">${spotName}</div>
            <div class="leaderboard-track-name">♫ ${track.title} · ${track.creator}</div>
            <div class="leaderboard-meta-row">
              <span>${spotLocation}</span>
              <span class="leaderboard-likes-count">♥ ${likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    leaderboardListContainer.querySelectorAll('.leaderboard-card').forEach(card => {
      const openCard = () => {
        const spotId = card.dataset.spotId;
        const target = SCENIC_SPOTS.find(s => s.id === spotId);
        if (target) {
          hideSpotPreviewCard();
          toggleLeaderboardDrawer(false);
          globeManager.flyToSpot(target);
          playerManager.openSpot(target, true);
          showToast(`◎ 已切换至《${getSpotName(target, currentLanguage)}》`);
        }
      };
      card.addEventListener('click', openCard);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCard();
        }
      });
    });
  }

  function toggleLeaderboardDrawer(open) {
    const nextState = open ?? !leaderboardDrawer?.classList.contains('open');
    if (nextState) {
      hideSpotPreviewCard();
      communityManager.close();
      toggleFavDrawer(false);
      toggleSettingsDrawer(false);
      renderLeaderboard();
    }
    leaderboardDrawer?.classList.toggle('open', nextState);
    leaderboardBackdrop?.classList.toggle('open', nextState);
    leaderboardToggleBtn?.setAttribute('aria-expanded', String(nextState));
    leaderboardDrawer?.setAttribute('aria-hidden', String(!nextState));
  }

  leaderboardToggleBtn?.addEventListener('click', () => toggleLeaderboardDrawer());
  closeLeaderboardBtn?.addEventListener('click', () => toggleLeaderboardDrawer(false));
  leaderboardBackdrop?.addEventListener('click', () => toggleLeaderboardDrawer(false));

  // ==================== Settings Drawer Management ====================
  function syncSettingsInputs() {
    currentSettings = storage.getSettings();
    if (selectMapSkinInput) selectMapSkinInput.value = currentSettings.mapSkin || 'streets-dark';
    if (toggleStarsInput) toggleStarsInput.checked = Boolean(currentSettings.showStars);
    if (toggleHaloInput) toggleHaloInput.checked = Boolean(currentSettings.showHalo);
    if (toggleAutoSpinInput) toggleAutoSpinInput.checked = Boolean(currentSettings.autoSpin);
    if (toggleAutoPlayInput) toggleAutoPlayInput.checked = Boolean(currentSettings.autoPlay);
  }

  function toggleSettingsDrawer(open) {
    const nextState = open ?? !settingsDrawer?.classList.contains('open');
    if (nextState) {
      hideSpotPreviewCard();
      communityManager.close();
      toggleFavDrawer(false);
      toggleLeaderboardDrawer(false);
      syncSettingsInputs();
    }
    settingsDrawer?.classList.toggle('open', nextState);
    settingsBackdrop?.classList.toggle('open', nextState);
    settingsToggleBtn?.setAttribute('aria-expanded', String(nextState));
    settingsDrawer?.setAttribute('aria-hidden', String(!nextState));
  }

  function handleSettingChange(key, value) {
    currentSettings = storage.saveSettings({ [key]: value });
    globeManager.applyMapSettings({ [key]: value });
    showToast(t('settingsSaved', currentLanguage));
  }

  selectMapSkinInput?.addEventListener('change', e => handleSettingChange('mapSkin', e.target.value));
  toggleStarsInput?.addEventListener('change', e => handleSettingChange('showStars', e.target.checked));
  toggleHaloInput?.addEventListener('change', e => handleSettingChange('showHalo', e.target.checked));
  toggleAutoSpinInput?.addEventListener('change', e => handleSettingChange('autoSpin', e.target.checked));
  toggleAutoPlayInput?.addEventListener('change', e => handleSettingChange('autoPlay', e.target.checked));

  resetSettingsBtn?.addEventListener('click', () => {
    currentSettings = storage.resetSettings();
    syncSettingsInputs();
    globeManager.applyMapSettings(currentSettings);
    showToast(t('settingsReset', currentLanguage));
  });

  settingsToggleBtn?.addEventListener('click', () => toggleSettingsDrawer());
  closeSettingsBtn?.addEventListener('click', () => toggleSettingsDrawer(false));
  settingsBackdrop?.addEventListener('click', () => toggleSettingsDrawer(false));

  function applyLanguage(nextLanguage = currentLanguage) {
    currentLanguage = nextLanguage;
    persistLanguage(currentLanguage);
    document.documentElement.lang = currentLanguage === LANGUAGES.EN ? 'en' : 'zh-CN';
    applyTranslations(document, currentLanguage);
    globeManager.setLanguage(currentLanguage);
    playerManager.setLanguage(currentLanguage);
    communityManager.setLanguage(currentLanguage);
    renderRegionNavigation();
    renderFavoritesList();
    if (leaderboardDrawer?.classList.contains('open')) renderLeaderboard();
    if (searchInput?.value) renderSearchResults(searchInput.value);
    if (playerManager.currentSpot) updateMiniAudioIsland(playerManager.currentSpot, soundEngine.isPlaying);
    viewModeText.textContent = viewMode === '3d' ? t('view3d', currentLanguage) : t('view2d', currentLanguage);
    if (autoTourText) {
      autoTourText.textContent = playerManager.isAutoTourActive
        ? t('touring', currentLanguage)
        : t('autoTour', currentLanguage);
    }
    if (navLanguageLabel) navLanguageLabel.textContent = currentLanguage === LANGUAGES.EN ? 'EN' : '中';
    if (playerLanguageLabel) playerLanguageLabel.textContent = currentLanguage === LANGUAGES.EN ? 'EN' : '中';
  }

  function applyTheme(nextTheme, updateMap = true) {
    if (nextTheme === 'light' || nextTheme === 'dark') {
      currentTheme = nextTheme;
    } else {
      currentTheme = 'dark';
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    } catch {}
    document.documentElement.dataset.theme = currentTheme;
    document.documentElement.style.colorScheme = currentTheme;
    if (updateMap) {
      globeManager.setTheme(currentTheme);
    }
    const isLight = currentTheme === 'light';
    const themeTitle = isLight
      ? (currentLanguage === LANGUAGES.EN ? 'Switch to Dark Theme' : '切换为深色模式')
      : (currentLanguage === LANGUAGES.EN ? 'Switch to Light Theme' : '切换为浅色模式');

    [themeBtn, playerThemeBtn].forEach(btn => {
      if (!btn) return;
      btn.classList.toggle('is-light', isLight);
      btn.setAttribute('aria-pressed', String(isLight));
      btn.setAttribute('title', themeTitle);
      btn.setAttribute('aria-label', themeTitle);
    });
  }

  function toggleTheme() {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
    showToast(t(nextTheme === 'light' ? 'switchedLight' : 'switchedDark', currentLanguage));
  }

  function toggleLanguage() {
    applyLanguage(currentLanguage === LANGUAGES.ZH ? LANGUAGES.EN : LANGUAGES.ZH);
  }

  languageBtn?.addEventListener('click', toggleLanguage);
  playerLanguageBtn?.addEventListener('click', toggleLanguage);
  themeBtn?.addEventListener('click', toggleTheme);
  playerThemeBtn?.addEventListener('click', toggleTheme);

  toggleViewModeBtn?.addEventListener('click', () => {
    viewMode = viewMode === '3d' ? '2d' : '3d';
    globeManager.setViewMode(viewMode);
    viewModeText.textContent = viewMode === '3d' ? t('view3d', currentLanguage) : t('view2d', currentLanguage);
    toggleViewModeBtn.classList.toggle('highlight', viewMode === '3d');
    toggleViewModeBtn.setAttribute('aria-pressed', String(viewMode === '3d'));
    showToast(t(viewMode === '3d' ? 'switched3d' : 'switched2d', currentLanguage));
  });

  document.getElementById('btn-brand-home')?.addEventListener('click', () => {
    globeManager.resetView();
    showToast(t('viewReset', currentLanguage));
  });

  document.getElementById('dock-btn-wander')?.addEventListener('click', () => playerManager.randomRoam());

  autoTourBtn?.addEventListener('click', () => {
    const isActive = playerManager.toggleAutoTour();
    autoTourBtn.classList.toggle('primary', isActive);
    autoTourBtn.setAttribute('aria-pressed', String(isActive));
    if (autoTourText) {
      autoTourText.textContent = isActive ? t('touring', currentLanguage) : t('autoTour', currentLanguage);
    }
  });

  document.getElementById('dock-btn-reset-view')?.addEventListener('click', () => {
    globeManager.resetView();
    showToast(t('viewReset', currentLanguage));
  });

  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  const locateBtn = document.getElementById('dock-btn-locate-me');
  locateBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast(t('locateError', currentLanguage));
      return;
    }

    showToast(t('locating', currentLanguage));
    locateBtn.classList.add('loading');

    navigator.geolocation.getCurrentPosition(
      position => {
        locateBtn.classList.remove('loading');
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        globeManager.setUserLocation({ lng, lat, accuracy });

        // Find nearest scenic spot
        let closestSpot = null;
        let minDistance = Infinity;

        SCENIC_SPOTS.forEach(spot => {
          const dist = calculateDistanceKm(lat, lng, spot.lat, spot.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closestSpot = spot;
          }
        });

        if (closestSpot && minDistance < 12000) {
          showToast(t('locateSuccess', currentLanguage, {
            name: getSpotName(closestSpot, currentLanguage),
            distance: minDistance
          }));
        } else {
          showToast(t('locateSuccessSimple', currentLanguage));
        }
      },
      error => {
        locateBtn.classList.remove('loading');
        console.warn('[GeoMelody Geolocation]', error);
        if (error.code === error.PERMISSION_DENIED) {
          showToast(t('locateDenied', currentLanguage));
        } else {
          showToast(t('locateError', currentLanguage));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });

  searchInput?.addEventListener('input', event => renderSearchResults(event.target.value));
  searchInput?.addEventListener('focus', () => renderSearchResults(searchInput.value));
  searchInput?.addEventListener('click', () => renderSearchResults(searchInput.value));
  searchInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      selectSearchSpot(getMatches(searchInput.value)[0]);
    } else if (event.key === 'Escape') {
      event.stopPropagation();
      searchDropdown?.classList.remove('visible');
      searchInput.blur();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.search-box-wrapper')) searchDropdown?.classList.remove('visible');
  });

  document.getElementById('player-play-btn')?.addEventListener('click', () => playerManager.togglePlay());
  document.getElementById('player-btn-next')?.addEventListener('click', () => playerManager.nextSpot());
  document.getElementById('player-btn-prev')?.addEventListener('click', () => playerManager.prevSpot());
  document.getElementById('player-close-btn')?.addEventListener('click', () => playerManager.close());
  document.getElementById('player-fav-btn')?.addEventListener('click', () => {
    playerManager.toggleFavorite();
    updateFavoriteBadge();
  });
  document.getElementById('player-share-btn')?.addEventListener('click', () => playerManager.shareCurrentSpot());
  document.getElementById('player-zen-btn')?.addEventListener('click', () => playerManager.toggleZenMode());
  document.getElementById('player-fullscreen-btn')?.addEventListener('click', () => playerManager.toggleFullscreen());
  document.getElementById('player-btn-open-mixer')?.addEventListener('click', () => toggleMixerDrawer(true));

  const volumeSlider = document.getElementById('player-volume-slider');
  const muteBtn = document.getElementById('player-btn-mute');
  volumeSlider?.addEventListener('input', event => soundEngine.setMasterVolume(parseFloat(event.target.value)));
  muteBtn?.addEventListener('click', () => {
    const isMuted = soundEngine.toggleMute();
    muteBtn.classList.toggle('active', isMuted);
    muteBtn.setAttribute('aria-pressed', String(isMuted));
    showToast(t(isMuted ? 'muted' : 'unmuted', currentLanguage));
  });
  document.addEventListener('fullscreenchange', () => {
    const fullscreenBtn = document.getElementById('player-fullscreen-btn');
    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenBtn?.classList.toggle('active', isFullscreen);
    fullscreenBtn?.setAttribute('aria-pressed', String(isFullscreen));
  });

  miniIsland?.addEventListener('click', event => {
    if (event.target.closest('#mini-close-btn')) {
      event.stopPropagation();
      soundEngine.pause();
      miniIsland.classList.remove('visible');
      return;
    }
    if (event.target.closest('#mini-play-toggle-btn')) {
      event.stopPropagation();
      playerManager.togglePlay();
      return;
    }
    if (playerManager.currentSpot) {
      playerManager.openSpot(playerManager.currentSpot, true);
    }
  });

  document.getElementById('mini-expand-btn')?.addEventListener('click', event => {
    event.stopPropagation();
    if (playerManager.currentSpot) {
      playerManager.openSpot(playerManager.currentSpot, true);
    }
  });

  document.getElementById('mini-close-btn')?.addEventListener('click', event => {
    event.stopPropagation();
    soundEngine.pause();
    miniIsland?.classList.remove('visible');
  });
  soundEngine.subscribe((event, data) => {
    if (event === 'playStateChange') {
      playerManager.updatePlayButton(data.isPlaying);
      updateMiniAudioIsland(data.spot, data.isPlaying);
    }
  });

  favToggleBtn?.addEventListener('click', () => toggleFavDrawer());
  document.getElementById('btn-close-fav-drawer')?.addEventListener('click', () => toggleFavDrawer(false));
  favBackdrop?.addEventListener('click', () => toggleFavDrawer(false));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (settingsDrawer?.classList.contains('open')) {
      event.stopPropagation();
      toggleSettingsDrawer(false);
    } else if (document.getElementById('community-drawer')?.classList.contains('open')) {
      event.stopPropagation();
      communityManager.close();
    } else if (favDrawer?.classList.contains('open')) {
      event.stopPropagation();
      toggleFavDrawer(false);
    }
  });

  updateFavoriteBadge();
  syncSettingsInputs();
  applyTheme(currentTheme, false);
  applyLanguage();
  globeManager.flyToRegion(MAP_REGIONS.find(region => region.id === activeRegion));

  const initialSpot = SCENIC_SPOTS.find(spot => spot.id === shareUtil.getInitialSpotId());
  if (initialSpot) {
    setTimeout(() => {
      globeManager.flyToSpot(initialSpot, 7.5);
      updateMiniAudioIsland(initialSpot, false);
      const name = getSpotName(initialSpot, currentLanguage);
      showToast(currentLanguage === 'en' ? `Arrived at “${name}” · Tap to enter` : `已定位至「${name}」· 点击即可进入视听`);
    }, 600);
  }
});

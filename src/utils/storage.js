/**
 * LocalStorage management for favorites & user preferences
 */

const STORAGE_KEYS = {
  FAVORITES: 'geomelody_favorites',
  PREFERENCES: 'geomelody_preferences',
  SETTINGS: 'geomelody_settings',
  RECENT: 'geomelody_recent',
  COMMUNITY_POSTS: 'geomelody_community_posts',
  COMMENTS: 'geomelody_comments',
  COMMENT_SEED_VERSIONS: 'geomelody_comment_seed_versions',
  SPOT_LIKES: 'geomelody_spot_likes'
};

export const DEFAULT_SETTINGS = {
  mapSkin: 'streets-dark', // 默认经典深色街道 (Streets Dark)
  showStars: true, // 深空点点星宿背景
  showHalo: false, // 3D 大气层微光晕 (默认关闭)
  autoSpin: true, // 闲置慢速自转
  autoPlay: true // 选中景点自动播放音乐
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_) {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
}

export function seedLikeCount(spotId = '') {
  return [...String(spotId)].reduce((sum, char) => (sum * 33 + char.charCodeAt(0)) % 10000, 5381) % 4200 + 480;
}

export const storage = {
  // Settings (Map layers, geography labels, autoplay, autospin)
  getSettings() {
    const saved = readJson(STORAGE_KEYS.SETTINGS, {});
    const validSkins = ['streets-dark', 'dataviz-dark', 'satellite', 'backdrop-dark', 'dataviz-light'];
    const skin = validSkins.includes(saved.mapSkin) ? saved.mapSkin : 'streets-dark';
    return { ...DEFAULT_SETTINGS, ...saved, mapSkin: skin };
  },

  saveSettings(settings) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    writeJson(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  resetSettings() {
    writeJson(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  },

  // Favorites
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to get favorites', e);
      return [];
    }
  },

  isFavorite(spotId) {
    const list = this.getFavorites();
    return list.includes(spotId);
  },

  toggleFavorite(spotId) {
    const list = this.getFavorites();
    const index = list.indexOf(spotId);
    let isFav = false;
    if (index > -1) {
      list.splice(index, 1);
      isFav = false;
    } else {
      list.unshift(spotId);
      isFav = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
    return { isFavorite: isFav, favorites: list };
  },

  // Preferences (e.g., volume, auto-tour interval)
  getPreferences() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? JSON.parse(data) : { masterVolume: 0.8, autoTourInterval: 30 };
    } catch (e) {
      return { masterVolume: 0.8, autoTourInterval: 30 };
    }
  },

  savePreferences(prefs) {
    try {
      const current = this.getPreferences();
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify({ ...current, ...prefs }));
    } catch (e) {}
  },

  getCommunityPosts() {
    return readJson(STORAGE_KEYS.COMMUNITY_POSTS, []);
  },

  saveCommunityPost(post) {
    const posts = this.getCommunityPosts();
    posts.unshift(post);
    writeJson(STORAGE_KEYS.COMMUNITY_POSTS, posts.slice(0, 40));
    return posts;
  },

  getComments(spotId) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    return allComments[spotId] || [];
  },

  ensureComments(spotId, seedComments, seedVersion = 'legacy-v1') {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const seedVersions = readJson(STORAGE_KEYS.COMMENT_SEED_VERSIONS, {});
    if (seedVersions[spotId] !== seedVersion) {
      const userComments = (allComments[spotId] || []).filter(comment => comment.isUser);
      allComments[spotId] = [...userComments, ...seedComments];
      seedVersions[spotId] = seedVersion;
      writeJson(STORAGE_KEYS.COMMENTS, allComments);
      writeJson(STORAGE_KEYS.COMMENT_SEED_VERSIONS, seedVersions);
    } else if (!allComments[spotId]?.length) {
      allComments[spotId] = seedComments;
      writeJson(STORAGE_KEYS.COMMENTS, allComments);
    }
    return allComments[spotId];
  },

  addComment(spotId, comment) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const comments = allComments[spotId] || [];
    comments.unshift(comment);
    allComments[spotId] = comments;
    writeJson(STORAGE_KEYS.COMMENTS, allComments);
    return comments;
  },

  toggleCommentLike(spotId, commentId) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const comments = allComments[spotId] || [];
    const comment = comments.find(item => item.id === commentId);
    if (!comment) return comments;
    comment.liked = !comment.liked;
    comment.likes = Math.max(0, Number(comment.likes || 0) + (comment.liked ? 1 : -1));
    allComments[spotId] = comments;
    writeJson(STORAGE_KEYS.COMMENTS, allComments);
    return comments;
  },

  deleteComment(spotId, commentId) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    allComments[spotId] = (allComments[spotId] || []).filter(comment => comment.id !== commentId);
    writeJson(STORAGE_KEYS.COMMENTS, allComments);
    return allComments[spotId];
  },

  getSpotLike(spotId, seedCount = 0) {
    const likes = readJson(STORAGE_KEYS.SPOT_LIKES, {});
    const seed = seedCount || seedLikeCount(spotId);
    return likes[spotId] || { count: seed, liked: false };
  },

  toggleSpotLike(spotId, seedCount = 0) {
    const likes = readJson(STORAGE_KEYS.SPOT_LIKES, {});
    const seed = seedCount || seedLikeCount(spotId);
    const current = likes[spotId] || { count: seed, liked: false };
    current.liked = !current.liked;
    current.count = Math.max(0, Number(current.count || 0) + (current.liked ? 1 : -1));
    likes[spotId] = current;
    writeJson(STORAGE_KEYS.SPOT_LIKES, likes);
    return current;
  },

  getLeaderboardSpots(spots = []) {
    return [...spots]
      .map(spot => {
        const seed = seedLikeCount(spot.id);
        const likeState = this.getSpotLike(spot.id, seed);
        return {
          spot,
          likes: likeState.count,
          liked: likeState.liked
        };
      })
      .sort((a, b) => b.likes - a.likes);
  }
};

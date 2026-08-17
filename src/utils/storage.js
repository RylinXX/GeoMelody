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
  mapSkin: '03-fast-blue', // 默认极速深海蓝 (Dataviz Blue · 极轻量秒速加载)
  planeSkin: '01-airliner', // 巡航航天飞行器模型皮肤
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
  // Settings (Map layers, geography labels, autoplay, autospin, plane skin)
  getSettings() {
    const saved = readJson(STORAGE_KEYS.SETTINGS, {});
    const skin = saved.mapSkin || '03-fast-blue';
    const planeSkin = saved.planeSkin || '01-airliner';
    return { ...DEFAULT_SETTINGS, ...saved, mapSkin: skin, planeSkin };
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

  // User Profile / Nickname
  getUserNickname(fallback = '音乐旅人') {
    try {
      let nick = localStorage.getItem('geomelody_user_nickname');
      if (!nick) {
        // Generate a unique 4-digit traveler identity, e.g. 音乐旅人 #3824
        const randId = Math.floor(1000 + Math.random() * 9000);
        nick = `${fallback} #${randId}`;
        localStorage.setItem('geomelody_user_nickname', nick);
      }
      return nick;
    } catch {
      return fallback;
    }
  },

  setUserNickname(name) {
    if (!name || !name.trim()) return;
    try {
      localStorage.setItem('geomelody_user_nickname', name.trim());
    } catch {}
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

  ensureComments(spotId, seedComments, seedVersion = 'nested-v2') {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const seedVersions = readJson(STORAGE_KEYS.COMMENT_SEED_VERSIONS, {});

    const normalizeComment = (c) => {
      if (!c.replies) {
        if (c.reply) {
          c.replies = [{
            id: `${c.id}-reply-1`,
            author: c.reply.author,
            enAuthor: c.reply.enAuthor,
            replyToAuthor: null,
            text: c.reply.text,
            enText: c.reply.enText,
            likes: Math.floor((c.likes || 10) * 0.15) + 1,
            liked: false,
            createdAt: c.createdAt
          }];
        } else {
          c.replies = [];
        }
      }
      return c;
    };

    if (seedVersions[spotId] !== seedVersion) {
      const userComments = (allComments[spotId] || []).filter(comment => comment.isUser).map(normalizeComment);
      const normalizedSeeds = seedComments.map(normalizeComment);
      allComments[spotId] = [...userComments, ...normalizedSeeds];
      seedVersions[spotId] = seedVersion;
      writeJson(STORAGE_KEYS.COMMENTS, allComments);
      writeJson(STORAGE_KEYS.COMMENT_SEED_VERSIONS, seedVersions);
    } else if (!allComments[spotId]?.length) {
      allComments[spotId] = seedComments.map(normalizeComment);
      writeJson(STORAGE_KEYS.COMMENTS, allComments);
    } else {
      allComments[spotId] = allComments[spotId].map(normalizeComment);
    }
    return allComments[spotId];
  },

  addComment(spotId, comment) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const comments = allComments[spotId] || [];
    if (!comment.replies) comment.replies = [];
    comments.unshift(comment);
    allComments[spotId] = comments;
    writeJson(STORAGE_KEYS.COMMENTS, allComments);
    return comments;
  },

  addReply(spotId, rootCommentId, reply) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const comments = allComments[spotId] || [];
    const rootComment = comments.find(item => item.id === rootCommentId);
    if (!rootComment) return comments;
    if (!rootComment.replies) rootComment.replies = [];
    rootComment.replies.push(reply);
    allComments[spotId] = comments;
    writeJson(STORAGE_KEYS.COMMENTS, allComments);
    return comments;
  },

  toggleCommentLike(spotId, commentId, replyId = null) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    const comments = allComments[spotId] || [];
    const rootComment = comments.find(item => item.id === commentId);
    if (!rootComment) return comments;

    if (replyId) {
      const reply = (rootComment.replies || []).find(r => r.id === replyId);
      if (reply) {
        reply.liked = !reply.liked;
        reply.likes = Math.max(0, Number(reply.likes || 0) + (reply.liked ? 1 : -1));
      }
    } else {
      rootComment.liked = !rootComment.liked;
      rootComment.likes = Math.max(0, Number(rootComment.likes || 0) + (rootComment.liked ? 1 : -1));
    }

    allComments[spotId] = comments;
    writeJson(STORAGE_KEYS.COMMENTS, allComments);
    return comments;
  },

  deleteComment(spotId, commentId, replyId = null) {
    const allComments = readJson(STORAGE_KEYS.COMMENTS, {});
    if (replyId) {
      const comments = allComments[spotId] || [];
      const rootComment = comments.find(item => item.id === commentId);
      if (rootComment && rootComment.replies) {
        rootComment.replies = rootComment.replies.filter(r => r.id !== replyId);
      }
      allComments[spotId] = comments;
    } else {
      allComments[spotId] = (allComments[spotId] || []).filter(comment => comment.id !== commentId);
    }
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
  },

  // ==================== Scenery Photo Gallery, Likes & Moderation ====================
  getPhotoAuditMode() {
    return localStorage.getItem('geomelody_photo_audit_mode') || 'auto_approve';
  },

  setPhotoAuditMode(mode) {
    localStorage.setItem('geomelody_photo_audit_mode', mode);
  },

  getCommunityPhotos(spotId) {
    const all = readJson('geomelody_community_photos', {});
    return all[spotId] || [];
  },

  getPhotoLike(photoId) {
    const allLikes = readJson('geomelody_photo_likes', {});
    if (allLikes[photoId]) return allLikes[photoId];
    // Authentic seed likes based on photo ID hash
    let hash = 0;
    for (let i = 0; i < photoId.length; i++) {
      hash = (hash << 5) - hash + photoId.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash % 38) + 12;
    return { count: seed, liked: false };
  },

  togglePhotoLike(photoId) {
    const allLikes = readJson('geomelody_photo_likes', {});
    const current = this.getPhotoLike(photoId);
    current.liked = !current.liked;
    current.count = Math.max(0, Number(current.count || 0) + (current.liked ? 1 : -1));
    allLikes[photoId] = current;
    writeJson('geomelody_photo_likes', allLikes);
    return current;
  },

  getSpotPhotos(spot) {
    if (!spot) return [];
    const records = this.getSpotPhotoRecords(spot);
    return records.filter(p => p.status === 'approved').map(p => p.url);
  },

  getSpotPhotoRecords(spot, spotName = '') {
    if (!spot) return [];
    const basePhotos = (spot.photos || []).map((url, i) => {
      const id = `builtin_${spot.id}_${i}`;
      const likeInfo = this.getPhotoLike(id);
      return {
        id,
        spotId: spot.id,
        url,
        author: '官方精选壁纸',
        caption: `${spotName || spot.name} · ${i + 1}`,
        timestamp: 0,
        isBuiltin: true,
        status: 'approved',
        likes: likeInfo.count,
        liked: likeInfo.liked
      };
    });

    const userPhotos = this.getCommunityPhotos(spot.id).map(p => {
      const likeInfo = this.getPhotoLike(p.id);
      return {
        ...p,
        likes: likeInfo.count,
        liked: likeInfo.liked
      };
    });

    const all = [...basePhotos, ...userPhotos];
    // Sort by likes descending (higher likes first) so most-popular wallpapers show first in gallery and slideshow
    return all.sort((a, b) => b.likes - a.likes);
  },

  addSpotPhoto(spotId, { url, author, caption }) {
    const all = readJson('geomelody_community_photos', {});
    const list = all[spotId] || [];
    const auditMode = this.getPhotoAuditMode();
    const isAuto = auditMode === 'auto_approve';

    const newPhoto = {
      id: 'photo_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      spotId,
      url,
      author: author?.trim() || (localStorage.getItem('geomelody_user_nickname') || '旅行摄影师'),
      caption: caption?.trim() || '胜景留影',
      timestamp: Date.now(),
      status: isAuto ? 'approved' : 'pending',
      isBuiltin: false,
      isUserUploaded: true
    };

    list.unshift(newPhoto);
    all[spotId] = list;
    writeJson('geomelody_community_photos', all);
    return newPhoto;
  },

  updatePhotoStatus(spotId, photoId, status) {
    const all = readJson('geomelody_community_photos', {});
    const list = all[spotId] || [];
    const photo = list.find(p => p.id === photoId);
    if (photo) {
      photo.status = status;
      all[spotId] = list;
      writeJson('geomelody_community_photos', all);
    }
    return list;
  },

  deleteSpotPhoto(spotId, photoId) {
    const all = readJson('geomelody_community_photos', {});
    const list = all[spotId] || [];
    all[spotId] = list.filter(p => p.id !== photoId);
    writeJson('geomelody_community_photos', all);
    return all[spotId];
  },

  getAllPendingPhotos(spots = []) {
    const all = readJson('geomelody_community_photos', {});
    const result = [];
    Object.keys(all).forEach(spotId => {
      const spot = spots.find(s => s.id === spotId);
      (all[spotId] || []).forEach(photo => {
        if (photo.status === 'pending') {
          result.push({ ...photo, spotName: spot ? spot.name : spotId });
        }
      });
    });
    return result;
  },

  getAllCommunityPhotosList(spots = []) {
    const all = readJson('geomelody_community_photos', {});
    const result = [];
    Object.keys(all).forEach(spotId => {
      const spot = spots.find(s => s.id === spotId);
      (all[spotId] || []).forEach(photo => {
        result.push({ ...photo, spotName: spot ? spot.name : spotId });
      });
    });
    return result;
  }
};

// pages/index/index.js - GeoMelody Mini Program Controller
const app = getApp();

Page({
  data: {
    webUrl: 'https://etgq.com?from=miniprogram',
    currentSpot: null,
    shareTitle: 'GeoMelody - 3D 沉浸式全球视听治愈体验',
    shareImageUrl: 'https://etgq.com/covers/1.1.png'
  },

  onLoad(options) {
    console.log('[GeoMelody MP] Index Loaded with query:', options);
    
    // Support direct spot deep-linking via query ?spot=wuzhen
    if (options && options.spot) {
      this.setData({
        webUrl: `https://etgq.com?spot=${options.spot}&from=miniprogram`
      });
    }
  },

  // Handle messages posted from Web page via wx.miniProgram.postMessage
  handleWebMessage(e) {
    console.log('[GeoMelody MP] Message received from WebView:', e.detail);
    const dataList = e.detail?.data || [];
    if (!dataList.length) return;

    // Get the latest message payload
    const msg = dataList[dataList.length - 1];

    // 1. Play background track with lock screen controls
    if (msg.action === 'playTrack' && msg.track) {
      const track = msg.track;
      const spot = msg.spot || {};
      app.playTrack({
        title: track.title || spot.name || 'GeoMelody 音律',
        epname: spot.name || '3D Soundscape',
        singer: track.creator || spot.location || 'GeoMelody AI',
        coverImgUrl: spot.photos?.[0] ? (spot.photos[0].startsWith('http') ? spot.photos[0] : `https://etgq.com${spot.photos[0]}`) : 'https://etgq.com/logo-128.png',
        src: track.url
      });

      this.setData({
        currentSpot: spot,
        shareTitle: `正在聆听：${spot.name || track.title} · GeoMelody 专属音律`,
        shareImageUrl: spot.photos?.[0] ? (spot.photos[0].startsWith('http') ? spot.photos[0] : `https://etgq.com${spot.photos[0]}`) : 'https://etgq.com/covers/1.1.png'
      });
    }

    // 2. Update Share Card Metadata
    if (msg.action === 'updateShare' && msg.spot) {
      const spot = msg.spot;
      this.setData({
        currentSpot: spot,
        shareTitle: `探索 ${spot.name} · GeoMelody 全球 3D 音景地图`,
        shareImageUrl: spot.photos?.[0] ? (spot.photos[0].startsWith('http') ? spot.photos[0] : `https://etgq.com${spot.photos[0]}`) : 'https://etgq.com/covers/1.1.png'
      });
    }
  },

  onWebLoad() {
    console.log('[GeoMelody MP] WebView Loaded Successfully');
  },

  onWebError(e) {
    console.warn('[GeoMelody MP] WebView Load Error:', e.detail);
  },

  // WeChat Share to Chat (Friends & Groups)
  onShareAppMessage() {
    const spot = this.data.currentSpot;
    const spotId = spot?.id || 'wuzhen';
    return {
      title: this.data.shareTitle,
      path: `/pages/index/index?spot=${spotId}`,
      imageUrl: this.data.shareImageUrl
    };
  },

  // WeChat Share to Moments (朋友圈)
  onShareTimeline() {
    const spot = this.data.currentSpot;
    const spotId = spot?.id || 'wuzhen';
    return {
      title: this.data.shareTitle,
      query: `spot=${spotId}`,
      imageUrl: this.data.shareImageUrl
    };
  }
});

// app.js - GeoMelody WeChat Mini Program Entry
App({
  globalData: {
    baseUrl: 'https://etgq.com',
    currentSpot: null,
    isPlaying: false,
    userInfo: null,
    version: '1.0.0'
  },

  onLaunch() {
    console.log('[GeoMelody MP] App Launched');
    this.initUpdateManager();
    this.initBackgroundAudio();
  },

  // Auto-Update Checker for WeChat Mini Program
  initUpdateManager() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本 GeoMelody 已准备好，是否重启应用？',
              success(modalRes) {
                if (modalRes.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
        }
      });
    }
  },

  // Setup Native Background Audio Manager
  initBackgroundAudio() {
    const bgAudio = wx.getBackgroundAudioManager();
    this.bgAudio = bgAudio;

    bgAudio.onPlay(() => {
      this.globalData.isPlaying = true;
    });

    bgAudio.onPause(() => {
      this.globalData.isPlaying = false;
    });

    bgAudio.onStop(() => {
      this.globalData.isPlaying = false;
    });

    bgAudio.onEnded(() => {
      this.globalData.isPlaying = false;
    });

    bgAudio.onError((err) => {
      console.warn('[GeoMelody Audio] Background Audio Error:', err);
      this.globalData.isPlaying = false;
    });
  },

  // Helper method to play any track with lock screen notification controls
  playTrack({ title, epname, singer, coverImgUrl, src }) {
    if (!src) return;
    const bgAudio = this.bgAudio || wx.getBackgroundAudioManager();
    bgAudio.title = title || 'GeoMelody 胜景音律';
    bgAudio.epname = epname || 'GeoMelody 3D Soundscape';
    bgAudio.singer = singer || 'GeoMelody AI';
    bgAudio.coverImgUrl = coverImgUrl || 'https://etgq.com/logo-128.png';
    bgAudio.src = src.startsWith('http') ? src : `https://etgq.com${src}`;
  }
});

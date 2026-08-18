// pages/player/player.js - Native Standalone Audio Player Controller
const app = getApp();

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

Page({
  data: {
    spotName: '乌镇 · 水乡晨曦',
    location: '中国 · 浙江',
    trackTitle: '江南晨雾 · 水乡桨声',
    creator: 'GeoMelody AI',
    currentCover: 'https://etgq.com/covers/1.1.png',
    isPlaying: false,
    currentTime: 0,
    duration: 180,
    currentTimeText: '00:00',
    durationText: '03:00'
  },

  onLoad() {
    this.bgAudio = app.bgAudio || wx.getBackgroundAudioManager();
    this.bindAudioEvents();
  },

  onShow() {
    this.setData({
      isPlaying: !this.bgAudio.paused && this.bgAudio.src
    });
  },

  bindAudioEvents() {
    const bgAudio = this.bgAudio;

    bgAudio.onPlay(() => {
      this.setData({ isPlaying: true });
    });

    bgAudio.onPause(() => {
      this.setData({ isPlaying: false });
    });

    bgAudio.onStop(() => {
      this.setData({ isPlaying: false });
    });

    bgAudio.onTimeUpdate(() => {
      const cur = bgAudio.currentTime || 0;
      const dur = bgAudio.duration || 180;
      this.setData({
        currentTime: cur,
        duration: dur,
        currentTimeText: formatTime(cur),
        durationText: formatTime(dur)
      });
    });
  },

  handleTogglePlay() {
    if (this.data.isPlaying) {
      this.bgAudio.pause();
    } else {
      if (this.bgAudio.src) {
        this.bgAudio.play();
      } else {
        // Fallback default track
        app.playTrack({
          title: this.data.trackTitle,
          coverImgUrl: this.data.currentCover,
          src: 'https://etgq.com/audio/01.mp3'
        });
      }
    }
  },

  handleSliderChange(e) {
    const value = e.detail.value;
    this.bgAudio.seek(value);
  },

  handlePrevTrack() {
    wx.showToast({ title: '已切换至上一首', icon: 'none' });
  },

  handleNextTrack() {
    wx.showToast({ title: '已切换至下一首', icon: 'none' });
  },

  handleReturnGlobe() {
    wx.navigateBack({
      fail() {
        wx.redirectTo({ url: '/pages/index/index' });
      }
    });
  }
});

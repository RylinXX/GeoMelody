// pages/about/about.js - About GeoMelody Controller
Page({
  data: {},

  handleCopyWebsite() {
    wx.setClipboardData({
      data: 'https://etgq.com',
      success() {
        wx.showToast({
          title: '官网链接已复制',
          icon: 'success'
        });
      }
    });
  }
});

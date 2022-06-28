// pages/map/map.js
// var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  toMapS(){
    wx.navigateTo({
      url: '/pages/mapS/mapS',
     
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
//     qqmapsdk = new QQMapWX({
//       key: '6UDBZ-6NHWV-WEMPR-UVOZH-2UPL2-3JBFI'
//   });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // // 调用接口
    // qqmapsdk.search({
    //   keyword: '酒店',
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
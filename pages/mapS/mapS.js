// pages/mapS/mapS.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    mapSList:[
        {id:1,name:"虹口区",percent:Math.floor(Math.random()*100)},
        {id:2,name:"黄浦区",percent:Math.floor(Math.random()*100)},
        {id:3,name:"徐汇区",percent:Math.floor(Math.random()*100)},
        {id:4,name:"长宁区",percent:Math.floor(Math.random()*100)},
        {id:5,name:"静安区",percent:Math.floor(Math.random()*100)},
        {id:6,name:"普陀区",percent:Math.floor(Math.random()*100)},
        {id:7,name:"杨浦区",percent:Math.floor(Math.random()*100)},
        {id:8,name:"闵行区",percent:Math.floor(Math.random()*100)},
        {id:9,name:"宝山区",percent:Math.floor(Math.random()*100)},
        {id:10,name:"嘉定区",percent:Math.floor(Math.random()*100)},
    ],
    rgb:{
        r:Math.floor(Math.random()*256),
        g:Math.floor(Math.random()*256),
        b:Math.floor(Math.random()*256),
    },
    randomColor:'0,0,0'

  },

  toMapT(){
    wx.navigateTo({
        url: '/pages/mapT/mapT',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
        randomColor:`${this.data.rgb.r},${this.data.rgb.g},${this.data.rgb.b}`
    })
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
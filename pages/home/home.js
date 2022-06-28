// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[
      {id:1,src:"/images/baike.png",title:"活动百科"},
      {id:2,src:"/images/huodong.png",title:"近期活动"},
      {id:3,src:"/images/dati.png",title:"PK竞答"},
      {id:4,src:"/images/bangdan.png",title:"榜单查询"}
    ],
    colorList:[],
    isloding: false


  },

  //获取色块
  getColor(){
    this.setData({
      isloding:true
    })
    //展示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://test-api-roan.vercel.app/api/color',
      method:"GET",
      success: ({data:res})=>{
        console.log(res)
        this.setData({
          colorList:[...this.data.colorList,...res.data]
        })
      },
      complete:()=>{
        wx.hideLoading()
        this.setData({
          isloding:false
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    if(this.data.isloding) return

    this.getColor()
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
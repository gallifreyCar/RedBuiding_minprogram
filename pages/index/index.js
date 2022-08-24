// pages/index/index.js
var app = getApp() //获取全局app实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [{
        id: 1,
        src: "/images/team.png",
        title: "团队介绍"
      },
      {
        id: 2,
        src: "/images/progress.png",
        title: "打卡进度"
      },
      {
        id: 3,
        src: "/images/where.png",
        title: "建筑分布"
      },
      {
        id: 4,
        src: "/images/getmore.png",
        title: "更多内容"
      }
    ],
    buildingInfoList: [],
    len: 0,
    clocked: 0,
  },

  //登陆方法
  loginMe() {
    wx.login({
      timeout: 1000,
      success: (res) => {
        if (res.code) {
          // console.log(res.code)
          //发起网络请求 成功则跳转
          wx.request({
            url: 'https://gallifrey.asia/redBuildings/loginMe',
            data: {
              code: res.code
            },
            success: (res) => {
              console.log(res);
              if (res.statusCode == 200) {
                app.globalData.openid = res.data.openid //拿到openid
                // console.log(app.globalData.openid)

                wx.showToast({
                  title: '网络请求成功',
                })
                this.getBuildingsInfo()
              } else {
                wx.showToast({
                  icon: "error",
                  title: '网络请求失败',
                })
              }

            }

          })
        } else {
          console.log('网络请求失败！' + res.errMsg)
        }
      }
    })

  },
  //发起网络请求获取建筑数据
  getBuildingsInfo() {
    wx.request({
      url: 'https://gallifrey.asia/redBuildings/getBuildingInfo',
      method: 'GET',
      data: {
        openid: app.globalData.openid,
      },
      success: (res) => {

        console.log(res.data);

        this.setData({
          buildingInfoList: res.data.buildingsInfo,
          len: res.data.len,
          clocked: res.data.clocked
        })
        app.globalData.buildingInfoList = res.data.buildingsInfo


      }
    })
  },


  ///点击方法
  future(e) {
    console.log(e.target.dataset.info);
    var num = e.target.dataset.info;

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loginMe()


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
    this.getBuildingsInfo()
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
    this.getBuildingsInfo()
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
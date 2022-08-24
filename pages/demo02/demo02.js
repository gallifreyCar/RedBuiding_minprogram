// pages/demo02/demo02.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
var qqmapsdk
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bd_id: 0,
    howfar: 0,
    info: "base",
    wego: '',
    infoList: null,
    isClock: false
  },
  //切换信息
  switchInfo(e) {
    this.setData({
      info: e.target.dataset.info
    })
  },
  //发起网络请求获取建筑数据
  getBuildingsInfo() {
    wx.request({
      url: 'https://gallifrey.asia/redBuildings/getBuildingInfo',
      method: 'GET',
      success: (res) => {
        console.log(res.data.buildingsInfo[0]);
        this.setData({
          buildingInfoList: res.data.buildingsInfo[0],
          title: res.data.buildingsInfo[0][2],
          topImageUrl: res.data.buildingsInfo[0][3]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var index = options.index;
    this.setData({
      infoList: app.globalData.buildingInfoList[index],
      wego: app.globalData.buildingInfoList[index][13],
      bd_id: index + 1
    })

    qqmapsdk = new QQMapWX({
      key: '6UDBZ-6NHWV-WEMPR-UVOZH-2UPL2-3JBFI'
    });

    // console.log(app.globalData.buildingInfoList[index])

  },

  //传输数据到数据库
  sendMessage() {

    console.log(app.globalData.openid)
    wx.request({
      url: 'https://gallifrey.asia/redBuildings/clock',
      method: 'GET',
      data: {
        bd_id: this.data.bd_id,
        openid: app.globalData.openid
      },

      success: (res) => {
        wx.showToast({
          title: '打卡成功',
        })
        this.setData({
          isClock: true
        })
        console.log(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  },


  // 打卡功能的实现
  clocking() {
    // 已经打卡则请勿重复打卡
    if (this.data.isClock) {
      wx.showToast({
        title: '你已经打卡成功',
      })
      return
    }

    //地址解析
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: this.data.wego, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: (res) => { //成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置

        this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示

          poi: [{ //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }]

        });
        // console.log(this.data.poi)
        // console.log("目标经纬度为: lat: "+this.data.poi.latitude+',lng: '+this.data.poi.longitude)
      },
      fail: function (error) {
        console.error(error);
      },

    })
    // 获取当前地址经纬度
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      isHighAccuracy: true, // 开启地图精准定位
    }).then(res => {
      // 计算距离
      qqmapsdk.calculateDistance({

        //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from: res || '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: this.data.poi, //终点坐标

        success: (res) => { //成功后的回调
          console.log(res);
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }

          //设置距离
          this.setData({
            howfar: res.elements[0].distance
          })

          if (this.data.howfar >= 100) {

            wx.showToast({
              title: '超出打卡点100米范围，打卡失败',
              icon: 'none'
            })
          } else {
            this.sendMessage()

          }

        },
        fail: function (error) {
          console.error(error);
        },
        complete: (res) => {
          // console.log(res.result.elements[0].distance);
          this.setData({
            howfar: res.result.elements[0].distance
          })
          // console.log(this.data.howfar)
        }

      });
    }).catch(() => {
      wx.showToast({
        title: '请授权定位信息并且打开手机定位',
        icon: 'none'
      })
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
  onShow() {},

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
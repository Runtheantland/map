
var app = getApp();

Page({
  data: {
    url:'',
    listData: [
      {
        "id": 1,
        "placeName": "中关村广场",
        "placeImageUrl": "",
        "placeOpenTime": 1505854800,
        "placeCloseTime": 1505919600,
        "placeAddress": "北京市海淀区中关广场",
        "placeLongitude": "116.303900",
        "placeLatitude": "39.976460"
      }, {
        "id": 2,
        "placeName": "虎丘的广场",
        "placeImageUrl": "",
        "placeOpenTime": 1506286800,
        "placeCloseTime": 1506258000,
        "placeAddress": "江苏省苏州虎丘",
        "placeLongitude": "120.410770",
        "placeLatitude": "31.325370"
      }, {
        "id": 3,
        "placeName": "东城区广场",
        "placeImageUrl": "",
        "placeOpenTime": 1506200400,
        "placeCloseTime": 1506265200,
        "placeAddress": "北京市东城区广场",
        "placeLongitude": "116.407526",
        "placeLatitude": "39.904030"
      }, {
        "id": 4,
        "placeName": "回龙观广场",
        "placeImageUrl": "",
        "placeOpenTime": 1506243600,
        "placeCloseTime": 1506265200,
        "placeAddress": "北京市昌平区回龙观东大街",
        "placeLongitude": "116.362300",
        "placeLatitude": "40.083480"
      }, {
        "id": 5,
        "placeName": "吴中的广场",
        "placeImageUrl": "",
        "placeOpenTime": 1506286800,
        "placeCloseTime": 1506351600,
        "placeAddress": "江苏苏州吴中",
        "placeLongitude": "120.416152",
        "placeLatitude": "31.322980"
      }
		],
    scale:'15',
    Height:'0',
    controls:'40',
    latitude:'',
    longitude:'',
    markers: [],
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    var that = this;

    that.setData({
      url: app.globalData.url
    })

    var data = JSON.stringify({
      page: 1,
      pageSize: 10,
      request: {
        placeLongitude: app.globalData.longitude,
        placeLatitude: app.globalData.latitude,
        userId: app.globalData.userId
      }
    })
   
       

        wx.getLocation({
          type: 'wgs84', //返回可以用于wx.openLocation的经纬度
          success: (res) => {
            that.setData({
              markers: that.getSchoolMarkers(),
              scale: 12,
              longitude: res.longitude,
              latitude: res.latitude
            })
          }
        });
    
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },

        })
      }
    })
  },
  controltap(e) {
    this.moveToLocation()
  },
  getSchoolMarkers() {
   
    var market = [];
    
    for (let item of this.data.listData) {

      let marker1 = this.createMarker(item);

      market.push(marker1)
    }
    return market;
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  strSub:function(a){
    var str = a.split(".")[1];
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str;
  },
  createMarker(point) {
    
    let latitude = this.strSub(point.placeLatitude);
    let longitude = point.placeLongitude;
    let marker = {
      iconPath: "../../image/banner5.jpeg",
      id: point.id || 0,
      name: point.placeName || '',
      title: point.placeName || '',
      latitude: latitude,
      longitude: longitude,
      label:{
        x:-24,
        y:-26,
        content: point.placeName
      },
      width: 30,
      height: 30
    };
    return marker;
  }
})
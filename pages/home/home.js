Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    picturesItems: "",
    currentIndex: 0,
    proList: "",
    scrollTop: {
      scroll_top: 0,
      goTop_show: false
    }
  },
  toDetail:function(e){
    console.log(e.currentTarget.dataset.goodsid)
     wx.navigateTo({
        url: '../detail/detail?goodsid=00'+(e.currentTarget.dataset.goodsid*1+1),
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  ajaxBigPictures: function (url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success

        let data = res.data;
        console.log(data.list);
        that.setData({
          picturesItems: data.list
        })
      }

    })
  },
  changeListAjax: function (url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success

        let data = res.data;
        console.log(data.list);
        that.setData({
          proList: data.list
        });
      }

    });
  },
  changeList1: function (index) {
    this.setData({
      currentIndex: 0
    });
    this.changeListAjax('http://127.0.0.1:8080/goods1.json')
  },
  changeList2: function (index) {
    this.setData({
      currentIndex: 1
    });
    this.changeListAjax('http://127.0.0.1:8080/goods2.json')
  },
  changeList3: function (index) {
    this.setData({
      currentIndex: 2
    });
    this.changeListAjax('http://127.0.0.1:8080/goods3.json')
  },
  scrollTopFun: function (e) {
    //console.log(e.detail);  
    if (e.detail.scrollTop > 200) {//触发gotop的显示条件  
      this.setData({
        'scrollTop.goTop_show': true
      });
      //console.log(this.data.scrollTop)
    } else {
      this.setData({
        'scrollTop.goTop_show': false
      });
    }
  },
  goTop: function (e) {

    var _top = this.data.scrollTop.scroll_top;//发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
    if (_top == 1) {
      _top = 0;
    } else {
      _top = 1;
    }
    this.setData({
      scrollTop: {
        scroll_top: _top,
        goTop_show: false
      }
    });
    console.log("top", this.data.scrollTop)
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    //console.log(123);
    // wx.request({
    //   url: 'https://datainfo.duapp.com/shopdata/getGoods.php?callback=',
    //   data: {},
    //   method: 'POST',

    //   success: function(res){
    //     // success
    //     //console.log(res.data)
    //     let data = JSON.parse(res.data.substring(1,res.data.length-1));
    //     console.log(data)
    //   }
    // });

    //大图展示区ajax
    this.ajaxBigPictures("http://127.0.0.1:8080/data1.json");
    this.changeList1();

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
// pages/cart/cart.js
Page({
  data: {
    islogin: true,
    isShow: true,
    num: 1,
    list: 1,
    balance: 1,
    total: 1,
    singleprice: "",
    price: "",
    allprice: "",
    cen: 1,
    shopCart: {}
  },
  viewChange: function (e) {
    var isShow = this.data.isShow;
    var num = e.target.dataset.num;
    if (isShow) {
      this.setData({
        isShow: false,
        num: 1
      })
    } else {
      this.setData({
        isShow: true,
        num: 2
      })
    }
  },
  rec: function () {
    var total = this.data.total * 1;
    var price = this.data.price * 1;
    var singleprice = this.data.singleprice;
    if (total == 1) {
      total = 1;
      singleprice = (total * price).toFixed(2);
      this.setData({
        total: total,
        singleprice: singleprice
      })
    } else {
      total -= 1;
      singleprice = (total * price).toFixed(2);
      this.setData({
        total: total,
        singleprice: singleprice
      })
    }
  },
  add: function () {
    var total = this.data.total * 1;
    var price = this.data.price * 1;
    var singleprice = this.data.singleprice;
    total += 1;
    singleprice = (total * price).toFixed(2);
    this.setData({
      total: total,
      singleprice: singleprice
    })
  },
  bgChange: function (e) {
    var list = e.target.dataset.list;
    var balance = this.data.balance;
    console.log(list)
    if (balance == 1) {
      this.setData({
        list: 2,
        balance: 2,

      })
    } else {
      this.setData({
        list: 1,
        balance: 1
      })
    }
  },
  toLogin: function () {
    wx.redirectTo({
      url: './../login/login?type=cart',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  allpick: function (e) {
    var pick = e.target.dataset.pick;
    var cen = this.data.cen;
    var list = this.data.list;
    if (cen == 1) {
      this.setData({
        pick: 2,
        cen: 2,
        balance: 2,
        list: 2
      })
    } else {
      this.setData({
        pick: 1,
        cen: 1,
        list: 1,
        balance: 1
      })
    }
  },
  getCart: function () {
    var that = this;
    wx.getStorage({
      key: 'shopCart',
      success: function (res) {
        // success
        console.log(res.data)
        that.setData({
          shopCart: res.data,
         
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '购物空空如也',
          icon: "loading",
          duration: 3000
        })
      },

    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getStorage({
      key: 'isLogin',
      success: function (res) {
        //console.log(res.data)
        if (res.data == "ok") {
          //console.log("!11111111")
          that.getCart();
          var total = that.data.total * 1;
          var price = that.data.price * 1;
          var singleprice = (total * price).toFixed(2);
          that.setData({
            islogin: false,
            singleprice: singleprice,

          })
          //console.log("111111111",singleprice);


        }else{
          wx.navigateTo({
            url: '../login/login?type=cart',
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
        }
      }

    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})

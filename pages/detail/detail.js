Page({
  data: {
    detailInfo: "",
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    currentNum: 1,
    proList: "",
    cartInfo: {
      num: 1
    },
    totalStock: 1,//库存

    currentIndex: 0,
    scrollTop: {
      scroll_top: 0,
      goTop_show: false
    },
    cartNum: 0,
    isShow: false,
    propsIndex0: 0,
    propsIndex1: 0
  },
  ajax: function (url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        let data = res.data;
        //console.log(data.result);

        //转换日期
        let date = new Date();
        let len = data.result.rate.list.length;
        console.log(len);
        console.log(date.getTime());
        for (let i = 0; i < len; i++) {
          let createdTime = data.result.rate.list[i].created;
          let createdDate = date.getTime() - createdTime;
          let time = new Date(createdDate);
          let y = time.getFullYear();//年
          let m = time.getMonth() + 1;//月
          let d = time.getDate();//日
          /*let h = time.getHours();//时
          let mm = time.getMinutes();//分
          let s = time.getSeconds();//秒*/
          //alert(y+"-"+m+"-"+d+" "+h+":"+mm+":"+s)
          data.result.rate.list[i].createdDate = y + "-" + m + "-" + d

        }
        console.log(data.result);

        that.setData({
          detailInfo: data.result,
          totalStock: data.result.skuInfo.totalStock,

        });
        //预先存入商品信息操作
        let props = data.result.skuInfo.props;
        console.log(props)
        for (let i = 0; i < props.length; i++) {
          let label = props[i].label;
          let name = props[i].list[0].name;
          that.data.cartInfo[label] = name;
        }

      }

    })
  },
  changeNum: function (e) {//左下角图片编号
    this.setData({
      currentNum: e.detail.current + 1
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
  active0: function () {
    this.setData({
      currentIndex: 0
    });
  },
  active1: function () {
    this.setData({
      currentIndex: 1
    });
  },
  active2: function () {
    this.setData({
      currentIndex: 2
    });
  },
  active3: function () {
    this.setData({
      currentIndex: 3
    });
  },
  scrollTopFun: function (e) {
    //console.log(e.detail);  
    if (e.detail.scrollTop > 200) {//触发gotop的显示条件  
      this.setData({
        'scrollTop.goTop_show': true
      });
      // console.log(this.data.scrollTop)
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
    //console.log("top", this.data.scrollTop)
  },

  showAddCart: function () {//显现选择商品模态框
    this.setData({
      isShow: true
    });

  },
  closeAddCart: function () {//隐藏选择商品模态框
    this.setData({
      isShow: false
    });
  },
  choseProps0: function (e) {//选取商品属性：尺码、款式 储存data中
    //console.log(e);
    let label = e.currentTarget.dataset.label;
    let name = e.currentTarget.dataset.name;
    // console.log(label, name);
    this.data.cartInfo[label] = name;
    //console.log(this.data.cartInfo);
    //console.log(e.currentTarget.dataset.index)
    this.setData({
      propsIndex0: e.currentTarget.dataset.index
    })

  },
  choseProps1: function (e) {//选取商品属性：尺码、款式 储存data中
    //console.log(e);
    let label = e.currentTarget.dataset.label;
    let name = e.currentTarget.dataset.name;
    console.log(label, name);
    this.data.cartInfo[label] = name;
    console.log(this.data.cartInfo);
    this.setData({
      propsIndex1: e.currentTarget.dataset.index
    })
  },
  numReduce: function () {//加数量
    let that = this;
    let num = this.data.cartInfo.num * 1;
    // console.log(num);
    if (num > 1) {
      this.setData({
        cartInfo: {
          num: num - 1
        }
      })
    } else {
      wx.showToast({
        title: '至少选择一件',
        icon: "loading",
        duration: 2000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }
  },
  numAdd: function () {//减数量
    let that = this;
    let num = this.data.cartInfo.num * 1;
    let totalStock = this.data.totalStock;
    //console.log(num, totalStock);
    if (num < totalStock) {
      this.setData({
        cartInfo: {
          num: num + 1
        }
      })
    } else {
      wx.showToast({
        title: '库存不足',
        icon: "loading",
        duration: 2000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    }
  },
  addCart: function () {//加入购物车 并存入本地储存 重新刷新购物车数量
    /*
      结构{
        shopId1:{
  
        },
        shopId2:{
  
        }
      }
    */
    let that = this;
    let cartInfo = this.data.cartInfo;
    //console.log(this.data.cartInfo);
    let shopId = this.data.detailInfo.itemInfo.iid;
    //console.log(shopId);
    let shopCart = {};
    //查看本地储存有没有数据
    let value = wx.getStorageSync('shopCart');
    if (value) {
      shopCart = value;
    }
    //console.log("shopid", shopCart);
    //加入购物车商品列表
    if (shopCart[shopId]) {//判断查看本地储存有没有当前商品
      let good = shopCart[shopId];
      // console.log("good", good);
      //加上本地数量
      good.num = good.num * 1 + cartInfo.num * 1;
      shopCart[shopId] = good;
    } else {
      //存入其他信息：店铺 商品名字 商品描素 
      let shopName = this.data.detailInfo.shopInfo.name;
      let goodImg = this.data.detailInfo.itemInfo.topImages[0];
      let price = this.data.detailInfo.itemInfo.price;
      let oldPrice = this.data.detailInfo.itemInfo.oldPrice;
      cartInfo["shopName"] = shopName;
      cartInfo["goodImg"] = goodImg;
      cartInfo["price"] = price;
      cartInfo["oldPrice"] = oldPrice;

      shopCart[shopId] = cartInfo;
    }


    //存入本地
    wx.setStorage({
      key: 'shopCart',
      data: shopCart,
      success: function (res) {
        // success
        wx.showToast({
          title: '加入购物车成功',
          icon: "loading",
          duration: 2000
        })
        //console.log(res);
        //关闭商品选择框框
        that.closeAddCart();
        //更新商品数量
        that.setCartNum();

        setTimeout(function () {
          wx.hideToast()
        }, 1500)
      }
    });

  },
  setCartNum: function () {
    let that = this;
    let value = wx.getStorageSync('shopCart');

    if (value) {
      let len = 0;
      //console.log(value)
      for (let goodid in value) {
        //console.log(goodid)
        len += value[goodid].num * 1
      }
      //console.log(len)
      that.setData({
        cartNum: len
      });
    }

  },
  goCart: function () {
    wx.getStorage({
      key: 'isLogin',
      success: function (res) {
        //console.log(res.data)
        if (res.data == "ok") {
          wx.switchTab({
            url: '../cart/cart?type=detail',
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
        } else {
          wx.redirectTo({
            url: '../login/login?type=detail',
            success: function (res) {
              // success
            },
            complete: function () {
              // complete
            }
          })
        }
      },
      fail: function () {
        // fail
        wx.redirectTo({
            url: '../login/login?type=detail',
            success: function (res) {
              // success
            },
            complete: function () {
              // complete
            }
          })
      }
    });

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    //console.log(options);


    this.changeListAjax('http://127.0.0.1:8080/goods1.json');
    if (!options.goodsid) {
      this.ajax('http://127.0.0.1:8080/001.json');
    } else {
      this.ajax('http://127.0.0.1:8080/' + options.goodsid + '.json');
    }
    //cartNum数量
    this.setCartNum()
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
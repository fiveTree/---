// pages/user/user.js
Page({
  data:{
    name:"",
  
    isShow:false
  },
  toLogin:function(){
    wx.redirectTo({
      url: '../login/login',
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
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    
    wx.getStorage({
      key: 'userID',
      success: function(res) {
          //console.log(res.data)
          that.setData({
            name:res.data
          })
      } 
    });
    wx.getStorage({
      key: 'isLogin',
      success: function(res){
        // success
        if(res.data=="ok"){
that.setData({
            isShow:true
          })
        }else{
          that.setData({
            isShow:false
          })
        }
        
      },
      fail: function() {
        // fail
        that.setData({
            isShow:false
          })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
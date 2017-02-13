// pages/register/register.js
Page({
  data:{
    phone:"",
    pass:""
  },
  phone:function(e){
        console.log(e.detail.value)
      this.setData({
      phone:e.detail.value
    })
  },
  pass:function(e){

    this.setData({
      pass:e.detail.value
    })
  },
  register:function(){
    var that=this;
    var phone=this.data.phone;
    var pass=this.data.pass;
     if(phone==""){
        wx.showToast({
          title: '手机号不能为空',
          icon:"loading",
          duration: 3000
        })

        setTimeout(function(){
          wx.hideToast()
        },2000)
   }else if(pass==""){
      wx.showToast({
          title: '密码不能为空',
          icon:"loading",
          duration: 10000
        })

        setTimeout(function(){
          wx.hideToast()
        },2000)
   }else{
        wx.request({
          url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
          data: {
              "userID":phone,
              "password":pass,
              "status":"register"
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            if(res.data=="0"){
               wx.showToast({
                title: '用户名重名',
                icon:"loading",
                duration: 10000
              })

              setTimeout(function(){
                wx.hideToast()
              },2000)
            }else if(res.data=="2"){
               wx.showToast({
                title: '数据库报错',
                icon:"loading",
                duration: 10000
              })

              setTimeout(function(){
                wx.hideToast()
              },2000)
            }else if(res.data=="1"){
              wx.showToast({
                title: '注册成功',
                icon:"success",
                duration: 10000
              })

              setTimeout(function(){
                wx.hideToast()
              },2000)
            }
            

          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
   }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
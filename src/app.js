//app.js
App({
    // onLaunch: function() {
    //     wx.login({
    //         success: function(res) {
    //             if (res.code) {
    //                 //发起网络请求
    //                 // wx.request({
    //                 //   url: 'https://test.com/onLogin',
    //                 //   data: {
    //                 //     code: res.code
    //                 //   }
    //                 // })

    //                 console.log(res.code)
    //             } else {
    //                 console.log('获取用户登录态失败！' + res.errMsg)
    //             }
    //         }

    //     })
 // onLaunch: function() { 
    //     wx.getUserInfo({
    //         success: function(res) {

    //             let userInfo=res.userInfo;
    //             console.log(userInfo.nickName)
    //             console.log(userInfo.avatarUrl)
    //             console.log(userInfo.gender )//性别 0：未知、1：男、2：女 
    //             console.log(userInfo.province)
    //             console.log(userInfo.city)
    //             console.log(userInfo.country)
    //         }
    //     })
    // },
    // onShareAppMessage: function(){
    //     return {
    //         title: '自定义分享标题',
    //         desc: '自定义分享描述',
    //         path: '/page/user?id=123'
    //     }
    // },

    globalData: {
        userInfo: null
    }
})

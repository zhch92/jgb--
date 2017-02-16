var app = getApp();


Page({
        loginOut: function() {
        wx.removeStorage({
            key: 'JSESSIONID',
            success: function(res) {
                wx.redirectTo({ url: '../index/index' })
            }
        })

    }

})

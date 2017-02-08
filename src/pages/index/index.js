var app = getApp();


Page({
    data: {
        eye: false,
        user: '',
        pwd: ''
    },
    switchEye: function(e) {
        this.setData({
            eye: !this.data.eye
        });
    },
    bindPwd: function(e) {
        let val = e.detail.value;
        this.setData({
            pwd: val
        })
    },

    bindUser: function(e) {
        let val = e.detail.value;
        this.setData({
            user: val
        })
    },
    login: function() {
        let user = this.data.user;
        let pwd = this.data.pwd;

        if (!user) {
            wx.showModal({
                title: '提示',
                content: '请填写账号',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })

        }
        if (!pwd) {
            wx.showModal({
                title: '提示',
                content: '请填写密码',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })

        }
        if (user != '' && pwd != '') {
            wx.request({
                url: 'http://10.10.10.204/jgb-web/v1/organ/login',
                data: {
                    telphone: user,
                    passwd: pwd
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    let resData = res.data
                    if (resData.errCode == 'J0009') {
                        wx.showModal({
                            title: '提示',
                            content: '账户名或密码错误',
                            success: function(res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        })
                    }
                }
            })

        }
    }
})

let util = require('../../utils/util.js');
var app = getApp();



Page({
    data: {
        logged: true,
        eye: false,
        user: '',
        pwd: '',
        hiddenLoading: true
    },
    // onLoad: function() {
    //     wx.getStorage({
    //         key: 'logged',
    //         success: function(res) {
    //             console.log(res.data);
    //             wx.switchTab({ url: '../wealth/wealth' });

    //         }
    //     });
    // },
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
        let user = 13661788228;
        // let user = 15868147269;
        // let user = this.data.user;15868147269
        let pwd = 123456;
        // let pwd = this.data.pwd;
        let $this = this;
        if (!user) {
            util.hint('请填写账号')
        }
        if (!pwd) {
            util.hint('请填写密码')

        }
        if (user != '' && pwd != '') {
            $this.setData({
                hiddenLoading: false
            });
            wx.request({
                url: 'http://10.10.10.204/jgb-web/v1/organ/login',
                data: {
                    telphone: user,
                    passwd: pwd
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json',
                },
                success: function(res) {
                    $this.setData({
                        hiddenLoading: true
                    });
                        let resData = res.data
                        if (resData.errCode == 'J0009') {
                            util.hint('账户名或密码错误')
                        } else {
                            wx.setStorage({ key: "userInfo", data: resData.data })
                            wx.setStorage({ key: "logged", data: 'true' })
                            wx.setStorage({ key: "JSESSIONID", data: resData.data.sessionId})
                            wx.switchTab({ url: '../wealth/wealth' });
                        }
                }
            })

        }
    }


})

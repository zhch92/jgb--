let app = getApp();
let util = require('../../utils/util.js');
// wx.showToast({
//   title: '加载中',
//   icon: 'loading',
//   duration: 10000
// })

// wx.showModal({
//   title: '提示',
//   content: '这是一个模态弹窗',
//   success: function(res) {
//     if (res.confirm) {
//       console.log('用户点击确定')
//     }
//   }
// })

Page({
    data: {
        time: 60,
        intension: 0,
        imgUrl: 'http://10.10.10.204/jgb-web/v1/captcha',
        telphone: '',
        imageVerifiCode: '',
        telVerifiCode: '',
        passwd: '',
        verifiPasswd: ''
    },
    setTelPhone: function(e) {
        let val = e.detail.value;
        this.setData({
            telphone: val
        })
    },
    setImageVerifiCode: function(e) {
        let val = e.detail.value;
        this.setData({
            imageVerifiCode: val
        })
    },
    setTelVerifiCode: function(e) {
        let val = e.detail.value;
        this.setData({
            telVerifiCode: val
        })
    },
    setPasswd: function(e) {
        let val = e.detail.value;
        this.setData({
            passwd: val,
            intension: val.length
        });
    },
    setVerifiPasswd: function(e) {
        let val = e.detail.value;
        this.setData({
            verifiPasswd: val
        })
    },
    gainMsg: function() {
        let $this = this;
        let currentTime = $this.data.time;
        let mobile = $this.data.telphone;
        let mobile1=Number(mobile);
        console.log(typeof(mobile1))
        if (!mobile) {
            util.hint('请填写手机号码')

        } else {

            if (currentTime == 60) {
                let countDown = setInterval(function() {
                    $this.setData({
                        time: $this.data.time - 1

                    });
                    if ($this.data.time == 0) {
                        console.log($this.data.time)
                        clearInterval(countDown);
                        $this.setData({
                            time: 60
                        });
                    }
                }, 100);
                wx.request({
                    url: 'http://10.10.10.204/jgb-web/v1/sms', //仅为示例，并非真实的接口地址
                    data: {
                        mobile: mobile1
                    },
                    method:'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res.data);
                        switch(res.data.errCode) {
                        	case 'J0006':util.hint('发送短信失败');
                        		break;
                        	case 'J0005':util.hint('发送太频繁');
                        		break;
                        }
                    }
                })
            }
        }
    },
    refreshImg: function() {
        let src = 'http://10.10.10.204/jgb-web/v1/captcha?v=';
        let time = new Date().getTime();
        this.setData({
            imgUrl: src + time
        })

    },
    refer: function() {
        let $thisData = this.data;
        let telphone = $thisData.telphone;
        let imageVerifiCode = $thisData.imageVerifiCode;
        let telVerifiCode = $thisData.telVerifiCode;
        let passwd = $thisData.passwd;
        let verifiPasswd = $thisData.verifiPasswd;

        if (!telphone) {
            util.hint('请填写手机号')
        } else if (!telVerifiCode) {
            util.hint('请填写手机验证码')

        } else if (!imageVerifiCode) {
            util.hint('请填写图片验证码')

        } else if (!passwd) {
            util.hint('请填写密码')

        } else if (!verifiPasswd) {
            util.hint('请确认密码')
        } else if (passwd != verifiPasswd) {
            util.hint('两次密码不一致')

        } else {
            util.hint('提交信息', '完成')

        }
    }

})

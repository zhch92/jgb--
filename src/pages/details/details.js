var app = getApp();

Page({
    data: {
        hiddenLoading: true,
        // details: { investorName: "", taWealthAcctlist:[{prodName:'',issueId:0,totalAsset:0,]}
        details: {}
    },
    onLoad: function() {
        let $this = this;
        $this.setData({
            hiddenLoading: false
        })
        wx.getStorage({
            key: 'JSESSIONID',
            success: function(res) {
                wx.request({
                    url: 'http://10.10.10.204/jgb-web/v1/wealth/taAcctDetail',
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            let newData = resData.data.orgTaAcctlist;
                            $this.setData({
                                hiddenLoading: true,
                                details: newData
                            });
                        }
                    }
                })

            },
            fail: function() {
                // wx.switchTab({ url: '../wealth/wealth' });
                wx.redirectTo({ url: '../index/index' })

            }
        });

    }

})

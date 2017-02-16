let util = require('../../utils/util.js');

var app = getApp();

Page({
    data: {
        details: false,
        point: { totalPoint: 0, availPoint: 0, frozePoint: 0, availDate: 0 },
        wealth: { orgNo: "", totalAsset: 0, nowdayIncome: 0, totalIncome: 0 }
    },
    onLoad: function() {
        let $this = this;
        wx.getStorage({
            key: 'JSESSIONID',
            success: function(res) {
                wx.request({
                    url: 'http://10.10.10.204/jgb-web/v1/points/point',
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            let oldData = resData.data;
                            let newData = {};
                            newData['totalPoint'] = util.thousands(oldData.totalPoint);
                            newData['availPoint'] = util.thousands(oldData.availPoint);
                            newData['frozePoint'] = util.thousands(oldData.frozePoint);
                            newData['availDate'] = util.dateFormat(oldData.availDate, 'MM月dd日');
                            $this.setData({
                                point: newData
                            });
                        }
                    }
                });

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
                        	let oldData = resData.data;
                            let newData = {};
                            newData['totalAsset'] = util.formatMoney(oldData.totalAsset);
                            newData['nowdayIncome'] = util.formatMoney(oldData.nowdayIncome);
                            newData['totalIncome'] = util.formatMoney(oldData.totalIncome);
                            $this.setData({
                                wealth: newData
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

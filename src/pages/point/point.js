let util = require('../../utils/util.js');

var app = getApp();

Page({
    data: {
        point: { totalPoint: 0, availPoint: 0.1, frozePoint: 0, availDate: 0 },
        pointList: []
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
                    url: 'http://10.10.10.204/jgb-web/v1/points',
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    data: {
                        type: -1,
                        pageNo: 1
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            let oldData = resData.data.resultList;
                            let newData = oldData.map(((obj) => {
                                let rObj = {};
                                rObj['time'] = util.dateFormat(obj.time, 'yyyy-MM-dd');
                                rObj['actionDesc']=obj.actionDesc;
                                rObj['investorName']=obj.investorName;
                                rObj['point']=obj.point;
                                rObj['productName']=obj.productName;
                                rObj['memo']=util.formatMoney(obj.memo);
                                return rObj
                            }))
                            $this.setData({
                                pointList: newData
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

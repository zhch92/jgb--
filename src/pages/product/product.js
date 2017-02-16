let util = require('../../utils/util.js');

var app = getApp();


Page({
    data: {
        hiddenLoading: true,
        current: true,
        product: []
    },
    productSwitch: function() {
        this.setData({
            current: !this.data.current
        })
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
                    url: 'http://10.10.10.204/jgb-web/v1/products',
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
                            let newData = oldData.map((obj) => {
                                let rObj = {};
                                rObj['id']=obj.id;
                                rObj['securityMarketType']=obj.securityMarketType;
                                rObj['name'] = obj.name;
                                rObj['seventhYearYield'] =util.toPercent(obj.seventhYearYield);
                                rObj['yieldPerMillion'] = util.keepDecimal(obj.yieldPerMillion);
                                rObj['pointRate'] = util.tonIteger(obj.pointRate);
                                rObj['uptTime'] = util.dateFormat(obj.uptTime,'yyyy.MM.dd');
                                rObj['valueDuration'] = obj.valueDuration;
                                rObj['fundAccessDate'] = util.dateFormat(obj.fundAccessDate,'yyyy.MM.dd');
                                rObj['yieldStartDate'] = util.dateFormat(obj.yieldStartDate,'yyyy.MM.dd');
                                rObj['yieldEndDate'] = util.dateFormat(obj.yieldEndDate,'yyyy.MM.dd');
                                rObj['fundExitDate'] = util.dateFormat(obj.fundExitDate,'yyyy.MM.dd');
                                return rObj
                            })

                            $this.setData({
                                hiddenLoading: true,
                                product:newData
                            });
                        }
                    }
                });

            },
            fail: function() {
                // wx.switchTab({ url: '../wealth/wealth' });
                wx.redirectTo({ url: '../index/index' })

            }
        });

    },


})

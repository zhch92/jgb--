var app = getApp();


Page({
    data: {
        trade: true,
        hiddenLoading: true,
        purchase: true,
        redemption: true,
        tradeList: [],
        earningsList: []
    },
    tradeSwitch: function() {
        this.setData({
            trade: true
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
                    url: 'http://10.10.10.204/jgb-web/v1/tradelist',
                    data: {
                        startDate: '',
                        endDate: '',
                        pageNo: 1,
                        txnType: ''
                    },
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            $this.setData({
                                hiddenLoading: true,

                                tradeList: resData.data.resultList
                            });
                        }
                    }
                });

            },
            fail: function() {
                wx.redirectTo({ url: '../index/index' })

            }
        });
    },
    purchase: function() {
        let $this = this;
        $this.setData({
            hiddenLoading: false
        });
        
        wx.getStorage({
            key: 'JSESSIONID',
            success: function(res) {
                wx.request({
                    url: 'http://10.10.10.204/jgb-web/v1/tradelist',
                    data: {
                        startDate: '',
                        endDate: '',
                        pageNo: 1,
                        txnType: 0
                    },
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            $this.setData({
                                hiddenLoading: true,
                                tradeList: resData.data.resultList
                            });
                        }
                    }
                });

            },
            fail: function() {
                wx.redirectTo({ url: '../index/index' })

            }
        });

    },
    redemption: function() {
        let $this = this;
        $this.setData({
            hiddenLoading: false
        })
        wx.getStorage({
            key: 'JSESSIONID',
            success: function(res) {
                wx.request({
                    url: 'http://10.10.10.204/jgb-web/v1/tradelist',
                    data: {
                        startDate: '',
                        endDate: '',
                        pageNo: 1,
                        txnType: 1
                    },
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            $this.setData({
                                hiddenLoading: true,

                                tradeList: resData.data.resultList
                            });
                        }
                    }
                });

            },
            fail: function() {
                wx.redirectTo({ url: '../index/index' })

            }
        });

    },
    earnings: function() {
        let $this = this;
        $this.setData({
            hiddenLoading: false
        })

        wx.getStorage({
            key: 'JSESSIONID',
            success: function(res) {
                wx.request({
                    url: 'http://10.10.10.204/jgb-web/v1/wealth/income',
                    data: {
                        startDate: '',
                        endDate: '',
                        pageNo: 1,
                    },
                    header: {
                        'content-type': 'application/json',
                        'Cookie': 'JSESSIONID=' + res.data + ''
                    },
                    success: function(res) {
                        let resData = res.data
                        if (resData.errCode == '-1004') {
                            wx.redirectTo({ url: '../index/index' })
                        } else {
                            $this.setData({
                                trade: false,
                                hiddenLoading: true,

                                earningsList: resData.data.resultList
                            });
                        }
                    }
                });

            },
            fail: function() {
                wx.redirectTo({ url: '../index/index' })

            }
        });

    }


})

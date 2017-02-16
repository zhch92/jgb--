function getTrade(startDate,endDate,pageNo=1,txnType){
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
                            console.log(resData.data);
                            return 111
                                                    }
                    }
                });
                console.log(res.data)

            },
            fail: function() {
                wx.redirectTo({ url: '../index/index' })

            }
        });
  
}

module.exports.getTrade = getTrade



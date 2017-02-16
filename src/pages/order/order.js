const util = require('../../utils/util.js');
var app = getApp();


Page({
    data: {
        order: 1,
        array: ['美国', '中国', '巴西', '日本']
    },
    onLoad: function(options) {
        let orderNum = Number(options.order);
        let title;
        this.setData({
            order: orderNum
        });
        switch (orderNum) {
            case 1:
                util.setTitle('场外确权')
                break;
            case 2:
                util.setTitle('场内确权')
                break;
            case 3:
                util.setTitle('申购')
                break;
            case 4:
                util.setTitle('赎回')
                break;
        }
    },

    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    }

})

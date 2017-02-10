var app = getApp();


Page({
    data: {
        order: false
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    }


})

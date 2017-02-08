
function hint(msg , headline='提示') {
    wx.showModal({
        title: headline,
        content: msg,
        success: function(res) {
            if (res.confirm) {
                console.log('用户点击确定')
            }
        }
    })
}


 module.exports.hint = hint

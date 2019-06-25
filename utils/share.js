
function send(arch) {
    return {
        title: '分享标题',
        path: '/pages/home/home?promoterId=' + uid,
        imageUrl: "微信预览图",
        bgImgUrl: "支付宝预览图",
        success: function (res) { },
        fail: function (res) { }
    };
}

module.exports = {
    send: send
};
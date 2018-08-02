import config from '../config/config.js';

function send(res) {
    if (res.from === 'button') {
        console.log(res.target);
    }

    let userInfo = getApp().getUserInfo();
    let uid = 0;
    if (userInfo) {
        uid = userInfo.uid;
    }
    if (config.isAlipay) {
        return {
            title: '分享标题',
            path: '/pages/home/home?promoterId=' + uid,
            imageUrl: '',
            success: function (res) {},
            fail: function (res) {}
        };
    } else {
        return {
            title: '分享标题',
            path: '/pages/index/index?promoterId=' + uid,
            imageUrl: '',
            success: function (res) {},
            fail: function (res) {}
        };
    }
}

module.exports = {
    send: send
};
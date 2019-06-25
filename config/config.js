let isAlipay = false;

module.exports = {
    isDebug: false, //true 为测试环境，false 为线上环境
    isAlipay: isAlipay, //true 为支付宝小程序，false 为微信小程序
    platform: isAlipay ? "支付宝" : "微信",//true 为支付宝小程序，false 为微信小程序
    cacheKey: {//缓存key
        deviceInfo: {
            //设备信息
            screen: "screen", //屏幕信息
            location: "location" //位置
        },
    }
};
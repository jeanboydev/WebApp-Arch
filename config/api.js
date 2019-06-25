import config from '../config/config.js'; //由于微信只能使用相对路径，所以统一用相对路径

let host = "https://gapi.xxx.com/"; //正式环境
let signature = "xxxx"; //正式默认加密秘钥

let debugHost = "https://dev.xxxx.com/"; //测试环境
let debugSignature = "xxx"; //测试默认加密秘钥

module.exports = {
    host: config.isDebug ? debugHost : host,
    signature: config.isDebug ? debugSignature : signature,
    package: "",
    version: 46,
    os: config.isAlipay ? 2 : 1, //平台 1-WeChat 2-AliPay 3-Android 4-iOS 5-Android人工洗车端 6-iOS人工洗车端
    payment: config.isAlipay ? 20 : 10, // 三方支付方式 0:不使用 10:微信小程序 11:app微信支付 20:支付宝小程序 21:app支付宝支付
    paymentNone: 0,
    header: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    cmd: "xxx",// API
};
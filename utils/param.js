import CryptoJSMin from '../utils/crypto-js.min.js';
import cache from '../arch/cache.js';
import api from '../config/api.js';

/**
 * rc4 Base64
 * 
 * @param {*} data 
 * @param {*} sid 
 */
function rc4Base64(data, sid) {
    var srcs = CryptoJSMin.enc.Utf8.parse(data);
    var encrypted = CryptoJSMin.RC4.encrypt(srcs, CryptoJSMin.enc.Utf8.parse(sid));
    return encrypted.toString();
}
/**
 * md5 Base64
 * 
 * @param {*} data 
 */
function md5Base64(data) {
    var encrypted = CryptoJSMin.MD5(decodeURIComponent(data)).toString(CryptoJSMin.enc.Base64);
    return encrypted;
}

/** 
 * 加密请求参数
 */
function getSignParams(cmd, params) {
    // console.log("======getSignParams========");
    var sid = api.signature;
    var uid = 0;
    params.package_name = api.package;
    params.version = api.version;
    params.os = api.os;
    try {
        var userInfo = cache.get(cache.userKey.userInfo);
        if (userInfo && userInfo.uid != 0) {
            uid = userInfo.uid;
            if (userInfo.sid) {
                sid = userInfo.sid;
            }
        }
    } catch (e) {}
    console.warn("-- uid =" + uid + "-- sid =" + sid + "-->>>>>");
    if (typeof params !== 'string') {
        params = JSON.stringify(params);
    }
    // console.log("--rc4加密-->>>>>");
    // console.log(params);
    //rc4加密
    params = rc4Base64(params, sid);
    var sign = "cmd=" + cmd + "&params=" + params + "&" + sid;
    sign = md5Base64(sign);
    var data = {
        cmd: cmd,
        params: params,
        sign: sign,
        uid: uid
    }
    return data;
}

/**
 * 解密 protocol
 */
function getDecryptProtocol(protocol) {
    var sid = api.signature;
    try {
        var userInfo = cache.get(cache.userKey.userInfo);
        if (userInfo && userInfo.uid != 0) {
            if (userInfo.sid) {
                sid = userInfo.sid;
            }
        }
        protocol = JSON.parse(CryptoJSMin.RC4.decrypt(protocol, CryptoJSMin.enc.Utf8.parse(sid)).toString(CryptoJSMin.enc.Utf8));
    } catch (e) {}
    return protocol;
}


module.exports = {
    getSignParams: getSignParams,
    getDecryptProtocol: getDecryptProtocol
};
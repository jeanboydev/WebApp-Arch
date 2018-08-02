function getParam(url, key) {
    let context = "";
    let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    if (url.indexOf("hemaxiche.com") != -1 && url.indexOf("?") != -1) {
        let strs = url.split("?");
        let param = "";
        if (strs.length > 1) {
            param = strs[1];
        }
        let r = param.match(reg);
        if (r != null) {
            context = r[2];
        }
        reg = null;
        r = null;
    }
    return (context == null || context == "" || context == "undefined") ? "" : context;
}

/**
 * 通过二维码内容获取机器Id
 */

function getPromoterId(url) {
    let key = "promoterId";
    return getParam(url, key);
}

function getMachineId(url) {
    let key = "mid";
    return getParam(url, key);
}

function getChannelId(url) {
    let key = "channel_id";
    return getParam(url, key);
}

module.exports = {
    getMachineId: getMachineId,
    getChannelId: getChannelId,
    getPromoterId: getPromoterId
};
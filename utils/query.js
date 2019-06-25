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

module.exports = {
    getParam: getParam,
};
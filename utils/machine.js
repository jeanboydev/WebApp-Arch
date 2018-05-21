/**
 * 通过二维码内容获取机器Id
 */
function getMachineId(code) {
    var name = "mid";
    var context = "";
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (code.indexOf("hemaxiche.com") != -1 && code.indexOf("?") != -1) {
        var strs = code.split("?");
        var param = "";
        if (strs.length > 1) {
            param = strs[1];
        }
        var r = param.match(reg);
        if (r != null) {
            context = r[2];
        }
        reg = null;
        r = null;
    }
    return (context == null || context == "" || context == "undefined") ? "" : context;
}

module.exports = {
    getMachineId: getMachineId
};
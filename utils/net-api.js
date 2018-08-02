import ui from '../arch/ui.js';
import page from '../arch/page.js';
import net from '../arch/net.js';
import api from '../config/api.js';
import param from '../utils/param.js';

/**
 * 根据 API 自定义 request
 * @param {*} param0 
 */
function request({
    cmd = '',
    params = {},
    onSuccess = function () {},
    onError = function () {}
}) {

    console.warn("== api request ==========>>>>> " + cmd);
    console.warn("== api params -->>>>> ");
    console.warn(JSON.stringify(params));

    let signParams = param.getSignParams(cmd, params);

    net.request({
        params: signParams,
        onSuccess: function (res) {
            console.warn("== api success ==========<<<<< " + cmd);

            if (!res.data) {
                onError(-1, "响应数据格式不正确，请稍后重试！");
                return;
            }

            if (res.statusCode && res.statusCode >= 500) {
                onError(-1, "服务器出错了，请稍后重试！");
                return;
            }

            if (res.data.status == 0) {
                let protocol = param.getDecryptProtocol(res.data.protocol);
                console.warn("-- api protocol --<<<<<");
                console.warn(JSON.stringify(protocol));

                onSuccess(protocol);
            } else {
                let desc = res.data.desc;
                onError(res.data.status, desc);
            }

        },
        onError: function (status, res) {
            console.error("== api fail ==========###### " + cmd);
            console.error(JSON.stringify(res));

            onError(-1, '请求失败，请稍后重试！');
        }
    });
}

module.exports = {
    request: request
};
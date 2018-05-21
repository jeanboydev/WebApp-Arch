import config from '../config/config.js';
import api from '../config/api.js';

/**
 * 请求网络
 */
function request({
    method = 'POST',
    params = {},
    onSuccess = function () {},
    onError = function () {}
}) {
    console.warn("== request ==========>>>>> ");
    // console.warn("== host -->>>>>" + api.host);
    console.warn("== request params -->>>>> ");
    console.warn(JSON.stringify(params));

    if (config.isAlipay) {
        my.httpRequest({
            header: api.header,
            url: api.host,
            method: method,
            data: params,
            dataType: 'json',
            success: function (res) {
                console.warn("== success ==========<<<<< ");
                console.warn(JSON.stringify(res));
                onSuccess(res);
            },
            fail: function (res) {
                console.error("== fail ==========###### ");
                console.error(JSON.stringify(res));
                onError(-1, res);
            }
        });
    } else {
        wx.request({
            header: api.header,
            url: api.host,
            method: method,
            data: params,
            success: function (res) {
                console.warn("== success ==========<<<<< ");
                console.warn(JSON.stringify(res));
                onSuccess(res);
            },
            fail: function (res) {
                console.error("== fail ==========###### ");
                console.error(JSON.stringify(res));
                onError(-1, res);
            }
        });
    }
}

module.exports = {
    request: request
};
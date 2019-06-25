import ui from '../core/ui.js';
import page from '../core/page.js';
import network from '../core/network.js';
import cache from '../core/cache.js';
import param from './param.js';

function request({
    cmd = '',
    params = {},
    onSuccess = function () { },
    onError = function () { }
}) {
    console.warn("== api request ==========>>>>> " + cmd);
    console.warn("== api params -->>>>> ");
    console.warn(JSON.stringify(params));

    let signParams = param.getSignParams(cmd, params);
    network.request({
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
            } else if (res.data.status == 104 || res.data.status == 140 || res.data.status == 121) {
                ui.hideLoading();

                if (getApp().globalData.isOpenedLooper) {
                    getApp().stopLoop();
                }
                getApp().globalData.isUserOnline = false;
                if (getApp().globalData.isShownOfflineModal) {
                    return;
                }
                console.error("*** 重新登录弹窗！！！<<<<<< cmd = " + cmd);
                getApp().globalData.isShownOfflineModal = true;
                ui.showAlert({
                    title: "提示",
                    content: "该账号在其它设备上登录，请重新登录！",
                    showCancel: false,
                    onSuccess: function () {
                        getApp().globalData.isShownOfflineModal = false;
                        cache.clear();// 清空缓存数据
                        page.navigateTo("/pages/login-wechat/login-wechat");
                    }
                });
            } else {
                onError(res.data.status, res.data.desc);
            }
        },
        onError: function (status, res) {
            console.error("== api fail ==========###### " + cmd);
            console.error(JSON.stringify(res));

            onError(-1, '请求超时，请检查网络并重试！');
        }
    });
}
module.exports = {
    request: request
};
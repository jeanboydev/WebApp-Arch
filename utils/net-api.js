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
            if (res.data.status == 0) {
                let protocol = param.getDecryptProtocol(res.data.protocol);
                console.warn("-- api protocol --<<<<<");
                console.warn(JSON.stringify(protocol));

                onSuccess(protocol);
            } else if (res.data.status == 104) {
                ui.hideLoading();

                if (cmd === api.auth.smsSend ||
                    cmd === api.auth.signInByOpenid ||
                    cmd === api.auth.signIn ||
                    cmd === api.auth.signOut ||
                    cmd === api.auth.ossToken ||
                    cmd === api.auth.WeChatOauthToken) return;

                if (getApp().globalData.isOpenedLooper) {
                    getApp().stopLoop();
                }

                if (getApp().globalData.isInvalid) return;
                getApp().globalData.isInvalid = true;

                console.error("*** 重新登录弹窗！！！<<<<<< cmd = " + cmd);
                ui.showAlert({
                    title: "提示",
                    content: "该账号在其它设备上登录，请重新登录！",
                    showCancel: false,
                    onSuccess: function () {
                        getApp().clearUserInfo();
                        page.reLaunch("/pages/sign-in/sign-in");
                    }
                });
            } else {
                onError(res.data.status, res.data.desc);
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
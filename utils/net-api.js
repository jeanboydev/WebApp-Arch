import arch from '../arch/arch';
import param from '../utils/param';

/**
 * 根据 API 自定义 request
 * @param {*} param0 
 */
function request({
    cmd,
    params,
    onSuccess = {},
    onError = {}
}) {

    console.warn("== request ==========>>>>> " + cmd);
    console.warn("== params -->>>>> " + JSON.stringify(params));

    let signParams = param.getSignParams(cmd, params);

    arch.net.request({
        params: signParams,
        onSuccess: function (res) {
            console.warn("== success ==========<<<<< " + cmd);
            console.warn(JSON.stringify(res));
            if (res.data.status == 0) {
                let protocol = util.getDecryptProtocol(res.data.protocol);
                console.warn("-- protocol --<<<<<");
                console.warn(protocol);
                console.warn(JSON.stringify(protocol));

                onSuccess(protocol);
            } else if (res.data.status == 104) {
                arch.ui.hideLoading();

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
                arch.ui.showAlert({
                    title: "提示",
                    content: "该账号在其它设备上登录，请重新登录！",
                    showCancel: false,
                    onSuccess: function () {
                        getApp().clearUserInfo();
                        arch.page.redirectTo({
                            url: "/pages/sign-in/sign-in"
                        });
                    }
                });
            } else {
                onError(res.data.status, res.data.desc);
            }
        },
        onError: function (res) {
            console.error("== fail ==========###### " + cmd);
            console.error(JSON.stringify(res));

            onError(-1, '请求失败，请稍后重试！');
        }
    });
}

module.exports = {
    request: request,
    getToken: getToken,
};
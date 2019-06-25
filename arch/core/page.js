import config from '../../config/config.js';

/**
 * 打印错误信息
 * @param {*} res 
 */
function printError(url, res) {
    console.error("== page == url = " + url);
    console.error("== page == res = " + JSON.stringify(res));
    console.error(res);
}

/**
 * 保留当前页面，跳转到应用内的某个指定页面，可以使用 navigateBack 返回到原来页面。
 * 注意：微信->目前页面路径最多只能十层。
 * 注意：支付宝->页面最大深度为5，即可连续调用 5 次 navigateTo。
 * @param {*} url 
 */
function navigateTo(url) {
    if (config.isAlipay) {
        my.navigateTo({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    } else {
        wx.navigateTo({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    }
}

/**
 * 关闭当前页面，返回上一页面或多级页面。
 * @param {*} delta 可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
 */
function navigateBack({
    delta = 1,
    onSuccess = function () { },
    onFail = function () { }
} = {}) {
    if (config.isAlipay) {
        my.navigateBack({
            delta: delta,
            success: function () {
                onSuccess();
            },
            fail: function (res) {
                onFail();
                printError(url, res);
            }
        });
    } else {
        wx.navigateBack({
            delta: delta,
            success: function () {
                onSuccess();
            },
            fail: function (res) {
                onFail();
                printError(url, res);
            }
        });
    }
}

/**
 * 关闭当前页面，跳转到应用内的某个页面。
 * @param {*} url 
 */
function redirectTo(url) {
    if (config.isAlipay) {
        my.redirectTo({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    } else {
        wx.redirectTo({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    }
}

/**
 * 关闭所有页面，打开到应用内的某个页面。
 * @param {*} url 
 */
function reLaunch(url) {
    if (config.isAlipay) {
        my.reLaunch({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    } else {
        wx.reLaunch({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    }
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
 * @param {*} url 
 */
function switchTab(url) {
    if (config.isAlipay) {
        my.switchTab({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    } else {
        wx.switchTab({
            url: url,
            fail: function (res) {
                printError(url, res);
            }
        });
    }
}

/**
 * 封装常用操作
 */
function goHome() {
    switchTab("/pages/home/home");
}
/**
 * 处理启动自动跳转活动页
 */
function activityLaunch(path) {
    config.isAlipay ? reLaunch(path) : navigateTo(path);
}


module.exports = {
    navigateTo: navigateTo,
    navigateBack: navigateBack,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    switchTab: switchTab,
    goHome: goHome,
    activityLaunch: activityLaunch,
};
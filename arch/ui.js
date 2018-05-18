import config from '../config/config.js';

/**
 * 打印错误信息
 * @param {*} res 
 */
function printError(tag, res) {
    console.error("== " + tag + " == res = " + JSON.stringify(res));
    console.error(res);
}

/**
 * 显示提示信息
 * @param type:微信(success/loading/none);支付宝(success/fail/exception/none)
 */
function showToast({
    type = 'none',
    content,
    duration = 1500,
    onSuccess = {},
    onError = {},
    onComplete = {}
}) {
    if (config.isAlipay) {
        my.showToast({
            type: type,
            content: content,
            duration: duration,
            success: function () {
                onSuccess();
            },
            fail: function (res) {
                printError("showToast", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    } else {
        wx.showToast({
            title: content,
            icon: type,
            duration: duration,
            success: function () {
                onSuccess();
            },
            fail: function (res) {
                printError("showToast", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    }
}

/**
 * 警告框
 */
function showAlert({
    title,
    content,
    confirmText = '确定',
    cancelText = '取消',
    showCancel = true,
    onSuccess = {},
    onCancel = {},
    onError = {},
    onComplete = {}
}) {
    if (config.isAlipay) {
        if (showCancel) {
            my.confirm({
                title: title,
                content: content,
                confirmButtonText: confirmText,
                cancelButtonText: cancelText,
                success: function (res) {
                    if (res.confirm) {
                        onSuccess();
                    } else {
                        onCancel();
                    }
                },
                fail: function (res) {
                    printError("showAlert", res);
                    onError(res);
                },
                complete: function (res) {
                    onComplete(res);
                }
            });
            return;
        }
        my.alert({
            title: title,
            content: content,
            buttonText: confirmText,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError("showAlert", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    } else {
        wx.showModal({
            title: title,
            content: content,
            confirmText: confirmText,
            cancelText: cancelText,
            showCancel: showCancel,
            success: function (res) {
                if (res.confirm) {
                    onSuccess();
                } else if (res.cancel) {
                    onCancel();
                }
            },
            fail: function (res) {
                printError("showAlert", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    }
}

/**
 * 显示加载提示
 */
function showLoading({
    content = '加载中...',
    delay = 0,
    onSuccess = {},
    onError = {},
    onComplete = {}
}) {
    if (config.isAlipay) {
        my.showLoading({
            content: content,
            delay: delay,
            success: function () {
                onSuccess();
            },
            fail: function (res) {
                printError("showLoading", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    } else {
        wx.showLoading({
            title: content,
            mask: true,
            success: function () {
                onSuccess();
            },
            fail: function (res) {
                printError("showLoading", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    }
}

/**
 * 隐藏加载提示
 */
function hideLoading() {
    if (config.isAlipay) {
        my.hideLoading();
    } else {
        wx.hideLoading();
    }
}

/**
 * 显示操作菜单
 */
function showActionSheet({
    itemList = [],
    onSuccess = {},
    onError = {},
    onComplete = {}
}) {
    if (config.isAlipay) {
        my.showActionSheet({
            title: '',
            items: itemList,
            cancelButtonText: '',
            success: function (res) {
                if (res.index === -1) return;
                onSuccess(res.index);
            },
            fail: function (res) {
                printError("showActionSheet", res);
                onError(res);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    } else {
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                onSuccess(res.tapIndex);
            },
            fail: function (res) {
                printError("showActionSheet", res);
                onError(res.errMsg);
            },
            complete: function (res) {
                onComplete(res);
            }
        });
    }
}

/**
 * 在当前页面显示导航条加载动画
 */
function showNavigationBarLoading() {
    if (config.isAlipay) {
        my.showNavigationBarLoading();
    } else {
        wx.showNavigationBarLoading();
    }
}

/**
 * 隐藏导航条加载动画。\
 */
function showNavigationBarLoading() {
    if (config.isAlipay) {
        my.hideNavigationBarLoading();
    } else {
        wx.hideNavigationBarLoading();
    }
}

module.exports = {
    showToast: showToast,
    showAlert: showAlert,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showActionSheet: showActionSheet,
    showNavigationBarLoading: showNavigationBarLoading,
    hideNavigationBarLoading: hideNavigationBarLoading
};
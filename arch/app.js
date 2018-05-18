import config from '../config/config.js';

/**
 * 打印错误信息
 * @param {*} res 
 */
function printError(res) {
    console.error("== app == res = " + JSON.stringify(res));
    console.error(res);
}

/**
 * 获取系统信息
 */
function getSystemInfo({
    onSuccess = {}
}) {
    if (config.isAlipay) {
        my.getSystemInfo({
            ssuccess: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    } else {
        wx.getSystemInfo({
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 同步获取系统信息
 */
function getSystemInfoSync() {
    if (config.isAlipay) {
        return my.getSystemInfoSync();
    } else {
        return wx.getSystemInfoSync();
    }
}

/**
 * 拨打电话号码
 */
function makePhoneCall(number) {
    if (config.isAlipay) {
        my.makePhoneCall({
            number: number
        });
    } else {
        wx.makePhoneCall({
            phoneNumber: number,
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 调起客户端扫码界面，扫码成功后返回对应的结果
 */
function scanCode({
    onlyFromCamera = false,
    onSuccess = {}
}) {
    if (config.isAlipay) {
        my.scan({
            type: 'qr',
            success: function (res) {
                onSuccess(res.code);
            },
            fail: function (res) {
                printError(res);
            }
        });
    } else {
        wx.scanCode({
            onlyFromCamera: onlyFromCamera,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 设置系统剪贴板的内容
 */
function setClipboardData({
    data,
    onSuccess = {}
}) {
    if (config.isAlipay) {
        my.setClipboard({
            text: data,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    } else {
        wx.setClipboardData({
            data: data,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 获取系统剪贴板的内容
 */
function getClipboardData({
    onSuccess = {}
}) {
    if (config.isAlipay) {
        my.getClipboard({
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    } else {
        wx.getClipboardData({
            success: function (res) {
                onSuccess(res.data);
            },
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 获取当前的地理位置、速度。
 * @param {*} type 微信(默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标)
 * 支付宝(0：默认，获取经纬度
 *        1：获取经纬度和详细到区县级别的逆地理编码数据
 *        2：获取经纬度和详细到街道级别的逆地理编码数据，不推荐使用
 *        3：获取经纬度和详细到POI级别的逆地理编码数据，不推荐使用)
 */
function getLocation({
    type,
    onSuccess = {}
}) {
    if (config.isAlipay) {
        my.getLocation({
            type: type,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    } else {
        wx.getLocation({
            type: type,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 使用内置地图查看位置。
 */
function openLocation({
    latitude,
    longitude,
    name,
    address,
    scale = 14,
    onSuccess = {}
}) {
    if (config.isAlipay) {
        my.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: name,
            address: address,
            scale: scale,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    } else {
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: name,
            address: address,
            scale: scale,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
            }
        });
    }
}

/**
 * 发起支付。
 */
function requestPayment({
    param,
    onSuccess = {},
    onCancel = {},
    onError = {}
}) {
    if (config.isAlipay) {
        my.tradePay({
            orderStr: param,
            success: function (res) {
                if (res.resultCode === 6001 || res.resultCode === 99) {
                    onCancel();
                } else if (res.resultCode === 9000) {
                    onSuccess(res);
                } else if (res.resultCode === 8000) {
                    //处理中...
                } else {
                    onError(res);
                }
            },
            fail: function (res) {
                onError(res);
            }
        });
    } else {
        wx.requestPayment({
            timeStamp: param.timeStamp,
            nonceStr: param.nonceStr,
            package: param.package,
            signType: 'MD5',
            paySign: param.paySign,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                if (res.cancel) {
                    onCancel(res);
                    return;
                }
                onError(res);
            }
        });
    }
}

module.exports = {
    getSystemInfo: getSystemInfo,
    getSystemInfoSync: getSystemInfoSync,
    makePhoneCall: makePhoneCall,
    scanCode: scanCode,
    setClipboardData: setClipboardData,
    getClipboardData: getClipboardData,
    getLocation: getLocation,
    openLocation: openLocation,
    requestPayment: requestPayment,
};
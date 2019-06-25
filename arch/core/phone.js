import config from '../../config/config.js';

/**
 * 打印错误信息
 * @param {*} res 
 */
function printError(res) {
    console.error("== app == res = " + JSON.stringify(res));
    console.error(res);
}

function getSDKVersion() {
    return config.isAlipay ? my.SDKVersion : wx.SDKVersion;
}

/**
 * 获取系统信息
 */
function getSystemInfo({
    onSuccess = function () { }
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
    onSuccess = function () { },
    onCancel = function () { },
    onError = function () { }
}) {
    if (config.isAlipay) {
        my.scan({
            hideAlbum: onlyFromCamera,
            type: 'qr',
            success: function (res) {
                onSuccess(res.code);
            },
            fail: function (res) {
                printError(res);
                if (res.error == 10) {
                    onCancel(res);
                } else {
                    onError(res);
                }
            }
        });
    } else {
        wx.scanCode({
            onlyFromCamera: onlyFromCamera,
            scanType: ['qrCode'],
            success: function (res) {
                onSuccess(res.result);
            },
            fail: function (res) {
                printError(res);
                if (res.errMsg && res.errMsg.indexOf("fail cancel") != -1) {
                    onCancel(res);
                    wx.getSystemInfo({
                        success: function (res) {
                            if (res.platform == "android") {
                                wx.switchTab({
                                    url: '/pages/home/home',
                                });
                            }
                        }
                    });
                    return;
                }
                onError(res);
                wx.getSystemInfo({
                    success: function (res) {
                        if (res.platform == "android") {
                            wx.switchTab({
                                url: '/pages/home/home',
                            });
                        }
                    }
                });
            }
        });
    }
}

/**
 * 设置系统剪贴板的内容
 */
function setClipboardData({
    data = '',
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
    onSuccess = function () { }
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
    onSuccess = function () { },
    onError = function () { }
}) {
    if (config.isAlipay) {
        my.getLocation({
            type: 0,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
                onError(res);
            },
        });
    } else {
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                printError(res);
                onError(res);
            }
        });
    }
}

/**
 * 使用内置地图查看位置。
 */
function openLocation({
    latitude = 0.0,
    longitude = 0.0,
    name = '',
    address = '',
    scale = 18,
    onSuccess = function () { }
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
    params = {},
    onSuccess = function () { },
    onCancel = function () { },
    onError = function () { }
}) {
    if (config.isAlipay) {
        my.tradePay({
            orderStr: params,
            success: function (res) {
                if (res.resultCode === "6001" || res.resultCode === "99") {
                    onCancel();
                } else if (res.resultCode === "9000") {
                    onSuccess(res);
                } else if (res.resultCode === "8000") {
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
        if (params == null || params == "") {
            onSuccess("");
            return;
        }
        let paramObj = JSON.parse(params);
        wx.requestPayment({
            timeStamp: paramObj.time_stamp,
            nonceStr: paramObj.nonce_str,
            package: paramObj.package,
            signType: paramObj.sign_type,
            paySign: paramObj.pay_sign,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                if (res.errMsg && res.errMsg.indexOf("fail cancel") != -1) {
                    onCancel(res);
                    return;
                }
                onError(res);
            }
        });
    }
}
/**
 * 播放音频
 * @param {*} param0 
 */
function playAudio({
    url = '',
    autoPlay = false,
    isLoop = false,
}) {
    if (config.isAlipay) { } else {
        let audioContext = wx.createInnerAudioContext();
        audioContext.autoplay = autoPlay;
        audioContext.loop = isLoop;
        audioContext.src = url;
        audioContext.onPlay(function () { });
        audioContext.onError(function (res) {
            onError(res);
        });
        return audioContext;
    }
}
/**
 * 停止播放音频
 * @param {*} context 
 */
function stopAudio(context) {
    if (context) {
        if (config.isAlipay) { } else {
            context.stop();
        }
    }
}

/**
 * 检查更新
 */
function checkUpdate() {
    if (config.isAlipay) {
        if (!my.getUpdateManager) {
            my.alert({
                title: '提示',
                content: '当前支付宝版本过低，无法使用此功能，请升级最新版本支付宝。'
            });
            return;
        }
        //支付宝检查更新
        const updateManager = my.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log("onCheckForUpdate");
        });
        updateManager.onUpdateReady(function () {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            console.log("onUpdateReady");
            updateManager.applyUpdate();
        });
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            console.log("onUpdateFailed");
        });
    } else {
        if (!wx.getUpdateManager) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            });
            return;
        }
        //微信检查更新
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log("onCheckForUpdate:" + res.hasUpdate);
        });
        updateManager.onUpdateReady(function () {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            console.log("onUpdateReady");
            updateManager.applyUpdate();
        });
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            console.log("onUpdateFailed");
        });
    }
}

/**
 * 获取 url 启动的参数
 * @param {*} options 
 */
function getParamsFromApp(options) {
    if (config.isAlipay) {
        if (options && options.query && options.query.qrCode) {
            return options.query.qrCode;
        }
    } else {
        if (options) {
            if (options.query && options.query.q) {
                return decodeURIComponent(options.query.q);
            } else if (options.q) {
                return decodeURIComponent(options.q);
            }
        }
    }
}
/**
 * 获取 路径 启动的参数
 * @param {*} options 
 */
function getParamsFromPage(options) {
    if (config.isAlipay) {
        if (options) {
            return options;
        }
    } else {
        if (options) {
            return options.query ? options.query : options;
        }
    }
}

/**
 * 获取登录凭证
 */
function getAuthCode({
    onSuccess = {},
    onError = {}
}) {
    if (config.isAlipay) {
        my.getAuthCode({
            scopes: 'auth_user',
            success: function (res) {
                if (res.authCode) {
                    onSuccess(res.authCode);
                } else {
                    onError();
                }
            },
            fail: function () {
                onError();
            }
        });
    } else {
        // 暂不使用
        // wx.checkSession({
        //     success: function () {
        //         // session_key 未过期，并且在本生命周期一直有效
        //     },
        //     fail: function () {
        //         // session_key 已经失效，需要重新执行登录流程
        //         wx.login() // 重新获取登录凭证
        //     }
        // })
        wx.login({
            success: function (res) {
                if (res.code) {
                    // 包含 openid，session_key
                    onSuccess(res.code);
                } else {
                    onError();
                }
            },
            fail: function () {
                onError();
            }
        })
    }
}

/**
 * 获取用户信息
 */
function getUserInfo({
    onSuccess = {},
    onError = {}
}) {
    if (config.isAlipay) {
        my.getAuthUserInfo({
            success: function (res) {
                // 包含用户昵称，头像
                onSuccess(res);
            },
            fail: function () {
                onError();
            }
        });
    } else {
        // 检查是否已授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            // 包含 UnionID
                            // 包含用户昵称，头像，性别，国家，省份，城市
                            if (res.userInfo) {
                                onSuccess(res.userInfo);
                            } else {
                                onError();
                            }
                        },
                        fail: function () {
                            onError();
                        }
                    });
                } else {
                    onError();
                }
            },
            fail: function () {
                onError();
            }
        });
    }
}



/**
 * 获取图片信息
 */
function getImageInfo({
    path = "",
    onSuccess = {},
    onOpenSetting = {},
    onError = {}
}) {
    if (config.isAlipay) {
        my.getImageInfo({
            src: path,
            success: function (res) {
                onSuccess(res);
            },
            fail: function () {
                onError("图片下载失败，请检查权限并重试！");
            }
        })
    } else {
        // 检查是否已授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.writePhotosAlbum']) {
                    // 已经授权
                    wx.getImageInfo({
                        src: path,
                        success: function (res) {
                            onSuccess(res);
                        },
                        fail: function (res) {
                            console.error("===getImageInfo===", res);
                            onError("图片下载失败，请检查权限并重试！");
                        }
                    });
                } else {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: function () {
                            // 已经授权
                            wx.getImageInfo({
                                src: path,
                                success: function (res) {
                                    onSuccess(res);
                                },
                                fail: function (res) {
                                    console.error("===getImageInfo===", res);
                                    onError("图片下载失败，请检查权限并重试！");
                                }
                            })
                        },
                        fail: function (res) {
                            onOpenSetting();
                        }
                    });
                }
            },
            fail: function (res) {
                onError("操作失败，请检查权限并重试！");
            }
        });
    }
}


/**
 * 保存图片
 */
function saveImage({
    path = "",
    onSuccess = {},
    onOpenSetting = {},
    onError = {}
}) {
    if (config.isAlipay) {
        my.saveImage({
            url: path,
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                if (res.error == 2001) {
                    onOpenSetting();
                    return;
                }
                onError(res.errorMessage);
            }
        });
    } else {
        // 检查是否已授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.writePhotosAlbum']) {
                    // 已经授权，可以直接调用 saveImageToPhotosAlbum
                    wx.saveImageToPhotosAlbum({
                        filePath: path,
                        success: function (res) {
                            onSuccess(res);
                        },
                        fail: function (res) {
                            onError("保存失败，请检查权限并重试！");
                        }
                    });
                } else {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: function () {
                            // 已经授权，可以直接调用 saveImageToPhotosAlbum
                            wx.saveImageToPhotosAlbum({
                                filePath: path,
                                success: function (res) {
                                    onSuccess(res);
                                },
                                fail: function (res) {
                                    onError("保存失败，请检查权限并重试！");
                                }
                            });
                        },
                        fail: function (res) {
                            onOpenSetting();
                        }
                    });
                }
            },
            fail: function (res) {
                onError("操作失败，请检查权限并重试！");
            }
        });
    }
}

/**
 * 打开设置页面
 */
function openSetting({
    onSuccess = {},
    onError = {}
}) {
    if (config.isAlipay) {
        my.openSetting({
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                onError();
            }
        });
    } else {
        wx.openSetting({
            success: function (res) {
                onSuccess(res);
            },
            fail: function (res) {
                onError();
            }
        });
    }
}

/**
 * 是否有读写相册权限
 */
function isPhotoAuthorized(res) {
    if (!res.authSetting) return false;
    if (config.isAlipay) {
        if (!res.authSetting.album) return false;
        return res.authSetting.album;
    } else {
        if (!res.authSetting["scope.writePhotosAlbum"]) return false;
        return res.authSetting[["scope.writePhotosAlbum"]];
    }
}

module.exports = {
    getSDKVersion: getSDKVersion,
    getSystemInfo: getSystemInfo,
    getSystemInfoSync: getSystemInfoSync,
    makePhoneCall: makePhoneCall,
    scanCode: scanCode,
    setClipboardData: setClipboardData,
    getClipboardData: getClipboardData,
    getLocation: getLocation,
    openLocation: openLocation,
    requestPayment: requestPayment,
    playAudio: playAudio,
    stopAudio: stopAudio,
    checkUpdate: checkUpdate,
    getParamsFromApp: getParamsFromApp,
    getParamsFromPage: getParamsFromPage,
    getAuthCode: getAuthCode,
    getUserInfo: getUserInfo,
    getImageInfo: getImageInfo,
    saveImage: saveImage,
    openSetting: openSetting,
    isPhotoAuthorized: isPhotoAuthorized,
};
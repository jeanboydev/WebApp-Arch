import config from '../config/config.js';

/**
 * 保存数据
 * @param {*} key 
 * @param {*} value 
 */
function set(key, value) {
    if (config.isAlipay) {
        my.setStorageSync({
            key: key,
            data: value,
        });
    } else {
        wx.setStorageSync(key, value);
    }
}

/**
 * 获取数据
 * @param {*} key 
 */
function get(key) {
    if (config.isAlipay) {
        let value = my.getStorageSync({
            key: key
        });
        if (value && value.data) {
            return value.data;
        }
        return null;
    } else {
        return wx.getStorageSync(key);
    }
}

/**
 * 删除数据
 * @param {*} key 
 */
function remove(key) {
    if (config.isAlipay) {
        return my.removeStorageSync({
            key: key
        });
    } else {
        return wx.removeStorageSync(key);
    }
}

/**
 * 清空所有数据
 */
function clear() {
    if (config.isAlipay) {
        return my.clearStorageSync();
    } else {
        return wx.clearStorageSync();
    }
}

module.exports = {
    set: set,
    get: get,
    remove: remove,
    clear: clear,
    userKey: {
        weChatUserInfo: "weChatUserInfo",
        screenWidth: "screenWidth",
        screenHeight: "screenHeight",
        isOpenedLooper: "isOpenedLooper", //当前looper状态
        gotQuickTips: "gotQuickTips", //读过快洗洗车提示
        userInfo: "userInfo", //用户信息
        userToken: "userToken", //用户Token
        selectedCoupon: "selectedCoupon", //用户选择的代金券
        currentOrder: "currentOrder", //用户当前未完成订单
        machineId: "machineId", //上次扫码的机器id
        machineLatestTime: "machineLatestTime", //上次扫码的时间
        washServiceLatestNumber: "washServiceLatestNumber", //代洗服务上次车牌号
        washServiceLatestSite: "washServiceLatestSite", //代洗服务上次洗车点
        serviceTelNumber: "serviceTelNumber", //客服电话
        selfOrderCreateTime: "selfOrderCreateTime", //用户自洗订单创建时间
        selfOrderActionTime: "selfOrderActionTime", //用户自洗订单等待出水时间
    }
};
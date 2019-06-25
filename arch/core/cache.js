import config from '../../config/config.js';

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
};
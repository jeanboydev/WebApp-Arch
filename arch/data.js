import config from '../config/config.js';

/**
 * 获取 item 点击的数据
 * @param {*} event 
 */
function getDataset(event) {
    if (config.isAlipay) {
        return event.target.dataset;
    } else {
        return event.currentTarget.dataset;
    }
}

module.exports = {
    getDataset: getDataset
};
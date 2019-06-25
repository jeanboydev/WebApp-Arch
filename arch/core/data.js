import config from '../../config/config.js';

function getItemDataset(event) {
    if (config.isAlipay) {
        return event.target.dataset;
    } else {
        return event.currentTarget.dataset;
    }
}

function getButtonDataset(event) {
    if (config.isAlipay) {
        return event.buttonTarget.dataset;
    } else {
        return event.detail.target.dataset;
    }
}
module.exports = {
    getItemDataset: getItemDataset,
    getButtonDataset: getButtonDataset
};
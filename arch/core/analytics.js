import config from '../../config/config.js';

function report(event, value = {}) {
    if (config.isAlipay) {
        my.reportAnalytics(event, value);
    } else {
        wx.reportAnalytics(event, value);
    }
}

function reportAction(event, action = 0) {
    report(event, {
        action: action
    });
}

module.exports = {
    report: report,
    reportAction: reportAction,
};

import config from '../config/config.js';

/**
 * 上报数据
 * @param {*} event 
 * @param {*} value 
 */
function report(event, value = {}) {
    if (config.isAlipay) {
        my.reportAnalytics(event, value);
    } else {
        wx.reportAnalytics(event, {
            event,
            value
        });
    }
}

module.exports = {
    report: report,
    event: {
        exception: "exception", //异常事件：一般指客户端代码异常
        error: "error", //错误事件：一般指服务器响应的错误
    }
};
import cache from '../arch/cache.js';
import net from '../arch/net.js';
import page from '../arch/page.js';
import phone from '../arch/phone.js';
import ui from '../arch/ui.js';
// config
import api from '../config/api.js';
import config from '../config/config.js';
// utils
import date from '../utils/date.js';
import money from '../utils/money.js';
import netApi from '../utils/net-api.js'; //自定义的API请求
import param from '../utils/param.js';

module.exports = {
    cache: cache,
    page: page,
    phone: phone,
    ui: ui,
    api: api,
    config: config,
    date: date,
    machine: machine,
    money: money,
    //net: net, //使用通用的网络请求
    net: netApi, //使用自定义的API请求
    param: param
};
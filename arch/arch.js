import cache from '../arch/cache.js';
import page from '../arch/page.js';
import phone from '../arch/phone.js';
import ui from '../arch/ui.js';
import analytics from '../arch/analytics.js';
import data from '../arch/data.js';
// config
import api from '../config/api.js';
import config from '../config/config.js';
// utils
import date from '../utils/date.js';
import query from '../utils/query.js';
import money from '../utils/money.js';
import netApi from '../utils/net-api.js';
import param from '../utils/param.js';
import share from '../utils/share.js';

module.exports = {
    cache: cache,
    page: page,
    phone: phone,
    ui: ui,
    analytics: analytics,
    data: data,
    api: api,
    config: config,
    date: date,
    query: query,
    money: money,
    net: netApi,
    param: param,
    share: share
};
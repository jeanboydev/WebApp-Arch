import cache from '../arch/cache.js';
import page from '../arch/page.js';
import phone from '../arch/phone.js';
import ui from '../arch/ui.js';
// config
import api from '../config/api.js';
import config from '../config/config.js';
// utils
import date from '../utils/date.js';
import machine from '../utils/machine.js';
import money from '../utils/money.js';
import netApi from '../utils/net-api.js';

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
    net: netApi
};
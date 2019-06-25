import data from '../arch/core/data.js';
import page from '../arch/core/page.js';
import phone from '../arch/core/phone.js';
import ui from '../arch/core/ui.js';
import analytics from './core/analytics.js';
import cache from '../arch/core/cache.js';
// config
import api from '../config/api.js';
import config from '../config/config.js';
import cacheKey from '../config/cacheKey.js';
import events from '../config/events.js';
// utils
import date from '../utils/date.js';
import query from '../utils/query.js';
import money from '../utils/money.js';
import netWrapper from './wrapper/net-wrapper.js';
import param from './wrapper/param.js';
import share from '../utils/share.js';
import position from '../utils/position.js';
import distance from '../utils/distance.js';

module.exports = {
    data: data,
    page: page,
    phone: phone,
    ui: ui,
    analytics: analytics,
    api: api,
    config: config,
    cacheKey: cacheKey,
    events: events,
    date: date,
    query: query,
    money: money,
    net: netWrapper,
    param: param,
    share: share,
    cache: cache,
    position: position,
    distance: distance,
};
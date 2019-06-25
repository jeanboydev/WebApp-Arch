function getRad(d) {
    return d * Math.PI / 180.0;
}

function getDistance(lat1, lng1, lat2, lng2) {
    if ((lat1 == -1 && lng1 == -1) || (lat2 == -1 && lng2 == -1)) {
        return "未知";
    }
    var EARTH_RADIUS = 6378137.0; //单位M

    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    let distance = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    return distance;
}

function getDistanceStr(lat1, lng1, lat2, lng2) {
    return format(getDistance(lat1, lng1, lat2, lng2));
}

function format(distance) {
    let factor = distance < 1000 ? 1 : 1000;

    let last = distance % factor;
    let index = 2;
    if (last == 0) {
        index = 0;
    } else if (last % 10 == 0) {
        index = 1;
    }
    return (distance / factor).toFixed(index) + (factor == 1 ? "m" : "km");
}

module.exports = {
    getDistance: getDistance,
    getDistanceStr: getDistanceStr
};
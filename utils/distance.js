/**
 * 格式化距离 < 1000m:xxxm,> 1000m:xxxkm
 * 
 */
function format(distance) {
    let result = distance + "m";
    if (distance >= 1000) {
        let last = distance % 1000;
        let index = 2;
        if (last < 10) {
            index = 0;
        } else if (last % 100 == 0) {
            index = 1;
        }
        result = ((distance / 1000).toFixed(index)) + "km";
    }
    return result;
}

module.exports = {
    format: format
};
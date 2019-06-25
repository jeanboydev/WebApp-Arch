export default {
    data: {
        isModalSheetPayShown: false, //是否显示
        modalSheetPayAnim: 0, //0无动画，1进场，2退场
    },
    option: {
        showModalSheetPay: function () {
            this.setData({
                isModalSheetPayShown: true,
                modalSheetPayAnim: 1
            });
        },
        hideModalSheetPay: function () {
            this.setData({
                modalSheetPayAnim: 2
            });
            let that = this;
            setTimeout(function () {
                that.setData({
                    isModalSheetPayShown: false,
                });
            }, 250);
        }
    },
};
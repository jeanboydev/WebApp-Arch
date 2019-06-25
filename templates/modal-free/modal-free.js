
export default {
    data: {
        isModalFreeShown: false,//是否显示
        modalFreeAnim: 0,//0无动画，1进场，2退场
    },
    option: {
        showModalFree: function () {
            this.setData({
                isModalFreeShown: true,
                modalFreeAnim: 1
            });
        },
        hideModalFree: function () {
            this.setData({
                modalFreeAnim: 2
            });
            let that = this;
            setTimeout(function () {
                that.setData({
                    isModalFreeShown: false,
                });
            }, 250);
        }
    },
};
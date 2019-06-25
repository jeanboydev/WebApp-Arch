
export default {
    data: {
        isModalAuthShown: false,//是否显示
        modalAuthAnim: 0,//0无动画，1进场，2退场
    },
    option: {
        showModalAuth: function () {
            this.setData({
                isModalAuthShown: true,
                modalAuthAnim: 1
            });
        },
        hideModalAuth: function () {
            this.setData({
                modalAuthAnim: 2
            });
            let that = this;
            setTimeout(function () {
                that.setData({
                    isModalAuthShown: false,
                });
            }, 250);
        }
    },
};
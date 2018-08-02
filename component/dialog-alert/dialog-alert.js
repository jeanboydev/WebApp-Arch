export default {
  data: {
    isAlertDialogShown: false, //是否显示
    alertDialogAnim: 0, //0无动画，1进场，2退场
  },
  option: {
    showDialogAlert: function () {
      this.setData({
        isAlertDialogShown: true,
        alertDialogAnim: 1
      });
    },
    hideDialogAlert: function () {
      this.setData({
        alertDialogAnim: 2
      });
      let that = this;
      setTimeout(function () {
        that.setData({
          isAlertDialogShown: false,
        });
      }, 250);
    }
  },
};
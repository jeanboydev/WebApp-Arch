export default {
  data: {
    isSheetDialogShown: false, //是否显示
    sheetDialogAnim: 0, //0无动画，1进场，2退场
  },
  option: {
    showDialogSheet: function () {
      this.setData({
        isSheetDialogShown: true,
        sheetDialogAnim: 1
      });
    },
    hideDialogSheet: function () {
      this.setData({
        sheetDialogAnim: 2
      });
      let that = this;
      setTimeout(function () {
        that.setData({
          isSheetDialogShown: false,
        });
      }, 250);
    }
  },
};
//app.js
import arch from './arch/arch';

App({
  onLaunch: function (options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', arch.phone.getSystemInfoSync());
    console.log('SDKVersion', arch.phone.getSDKVersion());

    arch.phone.checkUpdate();
    
  },
  onShow: function () {
    console.error('App Show');
  },
  onHide: function () {
    console.error('App Hide');
  },
  globalData: {

  }
});
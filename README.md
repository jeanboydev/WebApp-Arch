# 微信小程序 vs 支付宝小程序

## 概述

微信小程序与支付宝小程序有很多相似之处，该项目侧重逻辑层也就是 API 方面，封装两个小程序之间的差异，最终实现一套逻辑代码运行在两个平台，极大简化开发复杂度，提升开发效率。

## 项目介绍

```JSON
|-ProjectName
    |-arch//基础框架
        |-arch.js//框架入口，只需要导入这一个 js 即可
        |-cache.js//缓存相关，封装了 LocalStorage
        |-net.js//网络相关，封装了 网路请求
        |-page.js//页面跳转相关，封装了导航操作
        |-phone.js//设备相关，封装了系统信息，打电话，扫码，剪切板，定位，支付
        |-ui.js//平台 UI 相关，封装了 Toast，Alert，Loading，ActionSheet，NavigationBar
    |-config//项目配置
        |-api.js//项目 API 相关，接口参数配置等
        |-config.js//项目配置，如：平台判断，LocalStorage 的 key
    |-pages//页面
        |-home 
            |-home.acss/wxss
            |-home.axml/wxml
            |-home.js
            |-home.json
    |-utils//工具类
        |-crypto-js.min.js//加密工具库（按需添加）
        |-date.js//常用 Date 操作
        |-money.js//常用 money 操作
        |-net-api.js//自定义通用 API 请求方式，如：封装统一头部和响应体
        |-param.js//参数加密（按需添加）
```

## 使用方式

1. 在 js 中引入 arch

```JS
import arch from '../../arch/arch.js';
```

2. 操作数据

```JS
//缓存数据
arch.cache.set(arch.cache.userKey.TestKey, testValue);
//获取缓存
arch.cache.get(arch.cache.userKey.TestKey);
```

3. 网络请求

```JS
arch.net.request({
    method: 'POST',
    params: {
    },
    onSuccess: function (res) {
        // do something ...
    },
    onError: function (status, res) {
        // do something ...
    }
});
```

4. 平台 UI

```JS
// Toast
arch.ui.showToast({
  type: 'success',
  content: '这是 Toast！'
});
// 弹窗
arch.ui.showAlert({
    title: "提示标题",
    content: "提示信息内容！",
    showCancel: true,
    onSuccess: function () {
        // 确定点击
    },
    onCancel: function () {
        // 取消点击
    }
});
```

5. 平台开放 API

```JS
// 获取位置
arch.phone.getLocation({
  type: 'wgs84',//根据相应平台，传参数。wgs84 为微信的参数返回 gps 坐标
  onSuccess: function (res) {
    console.log("latitude:" + res.latitude + ", longitude:" + res.longitude);
  },
  onError: function () {
    arch.ui.showAlert({
      content: "获取当前位置失败！",
      showCancel: false
    });
  }
});
// 支付
arch.phone.requestPayment({
  params: payment,
  onSuccess: function () {
    arch.ui.showToast({
      type: 'success',
      content: "支付成功！"
    });
  },
  onCancel: function () {
    arch.ui.showToast({
      content: "支付取消！"
    });
  },
  onError: function (res) {
    arch.ui.showToast({
      content: "支付失败！"
    });
  }
});
```

6. 页面导航

```JS
arch.page.navigateBack();//关闭当前页面，返回上一页面或多级页面
arch.page.redirectTo("/pages/xxx/xxx");//关闭当前页面，跳转到应用内的某个页面
arch.page.navigateTo("/pages/xxx/xxx");//保留当前页面，跳转到应用内的某个指定页面
arch.page.reLaunch("/pages/xxx/xxx");//关闭所有页面，打开到应用内的某个页面
arch.page.switchTab("/pages/xxx/xxx");//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
```


## 文件差异

- 扩展名

微信：wxml，wxss
支付宝：axml，acss

- import

微信：只支持相对路径

```HTML
//相对路径示例
import api from '../../xxx/xxx.js';
@import '../../xxx/xxx.acss';
<import src="../../xxx/xxx.wxml" />
```

支付宝：绝对路径相对路径都支持，推荐使用相对路径

```HTML
//绝对路径示例
import api from '/xxx/xxx.js';
@import '/xxx/xxx.acss';
<import src="/xxx/xxx.wxml" />
```

## 布局差异

- 事件

微信：

```HTML
<view bindtap="onClick"
touchstart="onTouchStart"
touchmove="onTouchMove"
touchcancel="onTouchCancel"
touchend="onTouchEnd"
tap="onTap"></view>

<input bindinput="onChange"></input>

<view wx:if="{{condition}}"></view>
<view wx:elif="{{condition}}"></view>
<view wx:else="{{condition}}"></view>

<view wx:for="{{array}}">
 {{index}}: {{item.message}} 
</view>

<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
 {{idx}}: {{itemName.message}} 
</view>
```

支付宝：

```HTML
<view onTap="onClick"
touchStart="onTouchStart"
touchMove="onTouchMove"
touchCancel="onTouchCancel"
touchEnd="onTouchEnd"
tap="onTap"></view>

<input onInput="onChange"></input>

<view a:if="{{condition}}"></view>
<view a:elif="{{condition}}"></view>
<view a:else="{{condition}}"></view>

<view a:for="{{array}}">
 {{index}}: {{item.message}} 
</view>

<view a:for="{{array}}" a:for-index="idx" a:for-item="itemName">
 {{idx}}: {{itemName.message}} 
</view>
```

- 模板

微信：

```HTML
<!--定义模板-->
<template name="templateName">
  <view bindtap="{{onClick}}">
    <text> {{index}}: {{msg}} </text>
  </view>
</template>

<!--使用模板-->
<template is="templateName" data="{{onClick: clickFunctionName, index: 1, msg: '测试信息'}}" />
```

支付宝：

```HTML
<!--定义模板-->
<template name="templateName">
  <view onTap="{{onClick}}">
    <text> {{index}}: {{msg}} </text>
  </view>
</template>

<!--使用模板-->
<template is="templateName" data="{{onClick: clickFunctionName, index: 1, msg: '测试信息'}}" />
```

## 代码差异

- 声明周期函数

微信：

```JS
App({
  onLaunch: function(options) {},
  onShow: function(options) {},
  onHide: function() {},
  onError: function(msg) {},
  globalData: 'I am global data'
})
```

支付宝：

```JS
App({
  onLaunch(options) {},
  onShow(options) {},
  onHide() {},
  onError(msg) {},
  globalData: {
    foo: true,
  }
})
```

> 注：看似两个小程序写法不同，其实不管哪种写法在两个平台都可以正常运行（page 中的声明周期函数同理），这里推荐微信的写法。

- 页面标题

微信：

```JSON
"navigationBarTitleText": ""
```

支付宝：

```JSON
"defaultTitle": ""
```

- item 点击

微信：

```HTML
<view bindtap="onItemClick" data-item="{{item}}">

//获取data-item的值
onItemClick: function (event) {
    console.log(event.currentTarget.dataset);
}
```

支付宝：

```HTML
<view bindtap="onItemClick" data-item="{{item}}">

//获取data-item的值
onItemClick: function (event) {
    console.log(event.target.dataset);
}
```

## 总结

由于 acss/wxss，axml/wxml 文件后缀不一致，两平台转换时还需手工修改文件后缀。然后根据上面 **文件差异**，**布局差异**，**代码差异** 使用编译器进行全局替换即可。


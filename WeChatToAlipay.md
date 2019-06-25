## 微信小程序 -> 支付宝小程序：

- 设置 config 下的：isAlipay: true
- app.json：只保留 title 属性
```JSON
"window": {
    "defaultTitle": "河马洗车",
    "pullRefresh": false
  }
```

- <span>：支付宝需要将所有的 <span> 标签替换为 <text>
- a:key：移除所有的 a:key 属性，a:key 会导致列表不显示的问题（注：a:key="index" 可不移除，在支付宝中不影响）


# 版本统计

- v0.0.1
> 第一版描述
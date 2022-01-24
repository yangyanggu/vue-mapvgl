---
title: 发光特效
---

# 发光特效
发光后处理特效，也可以用作炫光效果

## 基础示例

::: demo
examples/effect/BrightEffect
:::


## 静态属性
该对象只可通过View组件的effects属性来使用，可以参考示例使用

名称 | 类型 | 说明
---|:---:|---
threshold | Number | 发光门槛阈值，范围0.0~1.0，值越低发光效果越亮. 默认值：0.0
blurSize | Number | 模糊值半径，默认2，是原图形半径的2倍. 默认值：2.0
clarity | Number | 清晰度，范围0.0~1.0. 默认值：1.0

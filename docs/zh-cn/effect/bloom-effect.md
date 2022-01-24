---
title: 炫光特效
---

# 炫光特效
眩光后处理特效

## 基础示例

::: demo
examples/effect/BloomEffect
:::


## 静态属性
该对象只可通过View组件的effects属性来使用，可以参考示例使用

名称 | 类型 | 说明
---|:---:|---
threshold | Number | 效果门槛阈值，范围0.0~1.0，值越低，亮部越多. 默认值：0.0
blurSize | Number | 炫光模糊值，默认2，是原图形半径的2倍. 默认值：2.0

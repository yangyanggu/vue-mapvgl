---
title: BmapvHeatLineLayer
---

# BmapvHeatLineLayer
用来展示线的热力图效果，继承自[SimpleLineLayer](https://mapv.baidu.com/gl/docs/SimpleLineLayer.html)

## Attributes

Attribute | Type | Description
---|:---:|---
gradient | Object | 渐变颜色模式，数据类型为Object,实例见 [gradient](#gradient)
max | Number | 最大阈值
min | Number | 最小阈值
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

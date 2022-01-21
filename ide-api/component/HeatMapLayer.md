---
title: BmapvHeatMapLayer
---

# BmapvHeatMapLayer
用来展示热力图效果

## Attributes

Attribute | Type | Description
---|:---:|---
gradient | Object | 渐变色,默认值 [gradient](#gradient)
max | Number | 最大阈值
min | Number | 最小阈值
size | Number | 热力画笔笔触大小, 默认值：13
unit | String | 对应size的单位, 默认值：px, 可选值：px 像素, m 米单位
height | Number | 形成网格的最大高度，默认0效果最好，如无三维高度需求可不打开, 默认值：0
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | // 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

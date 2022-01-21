---
title: BmapvShapeLineLayer
---

# BmapvShapeLineLayer
线状外观的立体多边形，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## Attributes

Attribute | Type | Description
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

---
title: BmapvBarLayer
---
# BmapvBarLayer
柱状图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## Attributes

Attribute | Type | Description
---|:---:|---
type | String | 绘制方式，默认normal，可选值： light
unit | string | 绘制大小的方式，即指定width和height属性的单位，默认值：’px’。可选值：px，默认值，按像素绘制。 m，按米来绘制
height | Number | 绘制高度
edgeCount | Number | 柱体的边数，可设置较大值趋近圆
size | Number | 底部大小
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | // 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

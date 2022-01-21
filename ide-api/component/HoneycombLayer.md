---
title: BmapvHoneycombLayer
---

# BmapvHoneycombLayer
蜂窝图层，用于统计一定范围内点的数量分布，并以蜂窝结构展示其密集程度，由[ShapeLayer](https://mapv.baidu.com/gl/docs/ShapeLayer.html)与[TextLayer](https://mapv.baidu.com/gl/docs/TextLayer.html)组合而成。

## Attributes

Attribute | Type | Description
---|:---:|---
size | number | 单个蜂窝图的横向宽度. 默认值：100
height | number | 蜂窝图最大值的高度，设置为0时显示为平面. 默认值：0
enableCluster | boolean | 是否开启点聚合，开启后会根据地图级别提前对距离较近的点进行聚合，牺牲精确度提高展示时的性能，建议数据量较大时打开. 默认值：false
showText | boolean | 是否显示文字. 默认值：true
maxZoom | number | 最大地图级别，当地图级别高于此值时不再更新图层数据. 默认值：19
minZoom | number | 最小地图级别，当地图级别低于此值时不再更新图层数据. 默认值：5
gradient | object | 蜂窝图的颜色梯度，属性名0~1之间，属性值同css颜色值，通过[Intensity](https://mapv.baidu.com/gl/docs/Intensity.html)拾取.  默认值：[gradient](#gradient)
textOptions | object | 设置文字属性，支持[文字图层](https://mapv.baidu.com/gl/docs/TextLayer.html)所有参数。 额外参数:format 支持格式化显示的数字，传入参数为单个蜂窝的数量值，不配置此属性则显示原值,类型：function
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

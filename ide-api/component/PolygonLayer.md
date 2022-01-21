---
title: BmapvPolygonLayer
---

# BmapvPolygonLayer
用来展示大数据的平面多边形，由[ShapeLayer](https://mapv.baidu.com/gl/docs/ShapeLayer.html)和[LineLayer](https://mapv.baidu.com/gl/docs/LineLayer.html)组合实现。可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## Attributes

Attribute | Type | Description
---|:---:|---
lineColor | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。
lineWidth | number | 描边线宽度. 默认值：2
lineJoin | String | 线的连接拐角，可选miter 尖角、bevel 平角、round 圆角, 默认值：`miter`
dashArray | Array | 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
fillColor | String | 填充面颜色，同css颜色. 默认值：’rgba(25, 25, 250, 1)’
fillOpacity | float | 填充面透明度，0.0表示完全透明，1.0表示完全不透明，浮点数表示. 默认值：1.0
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
enablePicked | Boolean | 是否开启鼠标事件，开启后支持鼠标onClick与onMousemove事件，同时支持改变拾取物体颜色,默认值：false
selectedIndex | number | 手动指定选中数据项索引，使该条数据所表示物体变色，-1表示没选中任何元素.默认值：-1,依赖：enablePicked=true
selectedColor | string | 选中态颜色,默认值：’rgba(20, 20, 200, 1)’,依赖：enablePicked=true
autoSelect | boolean | 根据鼠标位置来自动设置选中项selectedIndex，使选中物体变色，设置为true后selectedIndex失效.默认值：false,依赖：enablePicked=true
onClick | function([pickObject](#pickObject数据结构)){} | 点击事件，如果点击在可选中物体上，则返回对应数据,依赖：enablePicked=true
onDblClick | function([pickObject](#pickObject数据结构)){} | 双击事件，如果双击在可选中物体上，则返回对应数据,依赖：enablePicked=true
onRightClick | function([pickObject](#pickObject数据结构)){} | 右键事件，如果右键在可选中物体上，则返回对应数据
onMousemove | function([pickObject](#pickObject数据结构)){} | 鼠标指针移动事件，如果指针悬浮在在可选中物体上，则返回对应数据,依赖：enablePicked=true
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

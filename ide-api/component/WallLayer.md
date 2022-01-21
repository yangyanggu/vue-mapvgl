---
title: BmapvWallLayer
---

# BmapvWallLayer
用来展示3d立体墙图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## Attributes

Attribute | Type | Description
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
gradient | Object | 渐变颜色模式，设置后color属性会失效，数据类型为Object。Object只有0和1两个键，0表示远地处的颜色，1表示近地处的颜色,实例见 [gradient](#gradient)
height | Number | 立体墙的高度, 默认值：100
texture | object(canvas dom) 、string(图片url地址) | 纹理贴图，注意，**宽高必须为2的次幂**
enablePreciseMap | boolean | 开启精准贴图模式，纹理会按顶点间的实际距离对应拉伸，当使用的纹理有实际数据意义时开启
repeatMap | Number | 重复贴图，单位为米，如值为500代表500米重复一次贴图，值为0时不重复贴图, 默认值：0
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

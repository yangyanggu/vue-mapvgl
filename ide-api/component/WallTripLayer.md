---
title: BmapvWallTripLayer
---

# BmapvWallTripLayer
用来展示3d立体墙的轨迹动画图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)


## Attributes

Attribute | Type | Description
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(255, 5, 5, 1)’,如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
gradient | Object | 渐变颜色模式，设置后color属性会失效，数据类型为Object。Object只有0和1两个键，0表示远地处的颜色，1表示近地处的颜色
height | number | 立体墙的高度, 默认值：100
startTime | Number | 动画开始时间,默认值：0
endTime | Number | 动画结束时间,默认值：data的长度
step | Number | 执行每次动画的步长,默认值：0.1
trailLength | Number | 动画的拖尾时长,默认值：3
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

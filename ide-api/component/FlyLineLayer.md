---
title: BmapvFlyLineLayer
---

# BmapvFlyLineLayer
用来展示轨迹飞线图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html),基于Threejs实现


## Attributes

Attribute | Type | Description
---|:---:|---
effect | string | 飞线动画方式, 默认值：’normal’. <br/> 可选值：<br/> normal，默认值，飞线动画速度均匀 <br/> chaos，飞线动画速度不均匀
color | String | 底线颜色，同css颜色, 默认值：’rgba(255, 5, 5, 1)’
textureColor | String | 飞线动画颜色，同css颜色, 默认值：’rgba(255, 5, 5, 1)’
textureWidth | Number | 飞线动画的宽度, 默认值：5
textureLength | Number | 飞线动画的长度，占整条线的百分比，取值0-100, 默认值：30
step | Number | 飞线动画的步长，步长越大动画速度越快, 默认值：0.1
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

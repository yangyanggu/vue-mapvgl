---
title: 墙轨迹图层
---

# 墙轨迹图层
用来展示3d立体墙的轨迹动画图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

::: demo
examples/layer/WallTripLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
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

### gradient
```
{
    0.0: 'rgb(50, 50, 256)',
    0.1: 'rgb(50, 250, 56)',
    0.5: 'rgb(250, 250, 56)',
    1.0: 'rgb(250, 50, 56)'
}
```

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | 点数据,GeoJSON格式

### data数据结构
```
[{
    geometry: {
        type: 'LineString',
        coordinates: [
            [121.5273285, 31.21515044],
            [121.5473285, 31.21515044]
        ]
    },
    properties: {
        color: 'red'
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.PointTripLayer](https://mapv.baidu.com/gl/docs/PointTripLayer.html) | 获取`PointTripLayer`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

---
title: 烟花点图层
---

# 烟花点图层
用来展示烟花动画的图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

::: demo
examples/layer/SparkLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
color | String | 颜色，同css颜色, 默认值：’rgba(250, 25, 25, 1)’
height | Number  function | 烟花线的高度, 默认值：100, 当height为function时，需要有Number型返回值
step | Number | 动画的速度, 默认值：0.1
startTime | Number | 动画开始时间, 默认值：0
endTime | Number | 动画结束时间, 默认值：10
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

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
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    properties: {
     height: 90
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.SparkLayer](https://mapv.baidu.com/gl/docs/SparkLayer.html) | 获取`SparkLayer`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

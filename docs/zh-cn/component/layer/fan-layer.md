---
title: 雷达图层
---

# 雷达图层
展示点数据的雷达效果图，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

::: demo
examples/layer/FanLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
color | String | 雷达颜色，同css颜色, 默认值：’rgba(255, 5, 5, 1)’
size | Number | 雷达大小, 默认值：50
unit | string | 绘制大小的方式，即指定size属性的单位, 默认值：px。可选值：px，默认值，按像素绘制， m，按米来绘制
step | Number | 雷达扫描动画的步长，步长越大动画速度越快, 默认值：0.1
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
data | Array  | 点数据,GeoJSON格式

### data数据结构
```
[{
    geometry: {
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.FanLayer](https://mapv.baidu.com/gl/docs/FanLayer.html) | 获取`FanLayer`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

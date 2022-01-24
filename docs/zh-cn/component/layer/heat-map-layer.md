---
title: 热力图图层
---

# 热力图图层
用来展示热力图效果

## 基础示例

::: demo
examples/layer/HeatMapLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
gradient | Object | 渐变色,默认值 [gradient](#gradient)
max | Number | 最大阈值
min | Number | 最小阈值
size | Number | 热力画笔笔触大小, 默认值：13
unit | String | 对应size的单位, 默认值：px, 可选值：px 像素, m 米单位
height | Number | 形成网格的最大高度，默认0效果最好，如无三维高度需求可不打开, 默认值：0
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
data | Array  | // 点数据,GeoJSON格式

### data数据结构
```
[{
    geometry: {
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    properties: {
     count: 90
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.HeatmapLayer](https://mapv.baidu.com/gl/docs/HeatmapLayer.html) | 获取`HeatmapLayer`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

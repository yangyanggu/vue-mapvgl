---
title: 柱状图层
---

# Bar图层
柱状图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

::: demo
examples/layer/BarLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
type | String | 绘制方式，默认normal，可选值： light
unit | string | 绘制大小的方式，即指定width和height属性的单位，默认值：’px’。可选值：px，默认值，按像素绘制。 m，按米来绘制
height | Number | 绘制高度
edgeCount | Number | 柱体的边数，可设置较大值趋近圆
size | Number | 底部大小
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

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
      coordinates: [121.5273285, 31.21515044],
  },
  value: [
      Math.random() * 100 + 50,
      Math.random() * 100 + 100,
      Math.random() * 100 + 200,
      Math.random() * 100 + 300
      ],
  // 设置总高度，每段会根据比例生成各自的高度
  // height: 200 * 1000 + Math.random() * 200 * 1000,
  // 同时支持函数设置和数组
  height: function (value, index, array) {
      return value * 500;
  },
  size: 20 * 1000,
  color: ['rgba(0, 100, 255, 1)', 'rgba(0, 200, 200, 1)', 'rgba(0, 200, 100, 1)', 'rgba(255, 220, 0, 1)']
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.BarLayer](https://mapv.baidu.com/gl/docs/BarLayer.html) | 获取`BarLayer`实例


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

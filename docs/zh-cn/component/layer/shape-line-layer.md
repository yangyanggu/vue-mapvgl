---
title: 线状面图层
---

# 线状面图层
线状外观的立体多边形，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

::: demo
examples/layer/ShapeLineLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。
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
      type: 'Polygon',
      coordinates: [
        [
            [121.5273285, 31.21515044],
            [121.5373285, 31.21515044],
            [121.5373285, 31.22515044],
            [121.5273285, 31.22515044]
        ]
      ],
  },
  properties: {
      height: 1000,//高度经过测试发现无效，等待百度修复
  }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.ShapeLineLayer](https://mapv.baidu.com/gl/docs/ShapeLineLayer.html) | 获取`ShapeLineLayer`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

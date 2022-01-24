---
title: Gltf图层
---

# Gltf图层
Gltf图层,该图层API百度尚未提供，因此暂时只能提供scale跟url参数

## 基础示例

::: demo
examples/layer/GltfLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
scale | Number | 缩放比例，默认1
url | String | gltf模型的下载地址
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
    },
    angle: 0
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | mapvgl.GltfLayer | 获取`GltfLayer`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

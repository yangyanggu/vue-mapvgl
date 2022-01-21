---
title: BmapvGltfLayer
---

# BmapvGltfLayer
Gltf图层,该图层API百度尚未提供，因此暂时只能提供scale跟url参数


## Attributes

Attribute | Type | Description
---|:---:|---
scale | Number | 缩放比例，默认1
url | String | gltf模型的下载地址
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

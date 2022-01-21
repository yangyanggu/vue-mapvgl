---
title: BmapvThreeView
---

# BmapvThreeView
使用ThreeJS加载模型，目前支持加载gltf文件、glb文件和threejs导出的json文件，当前使用文件后缀进行判断需要使用哪种加载方式。
新增加el-bmapv-three-view，该view存在于el-bmapv-view之下，用于给所有模型提供统一的渲染，比如灯光、后期处理灯等

## Attributes

Attribute | Type | Description
---|:---:|---
lights | Array | 图层的全局灯光配置，可以配置多个灯光，详细参数见下面灯光说明
hdr | Object | HDR配置
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

## Events

Event Name | Parameters | Description
---|---|---|
init | ThreeLayer | threeLayer为three图层对象(使用百度的ThreeLayer对象)

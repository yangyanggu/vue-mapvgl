---
title: BmapvMarkerListLayer
---

# BmapvMarkerListLayer
用来展示标注点集合，支持传入text，由PointLayer和TextLayer组合实现,可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## Attributes

Attribute | Type | Description
---|:---:|---
fillColor | string | 内部点颜色，同css颜色，默认值：’rgba(255, 50, 10, 1)’
fillSize | Number | 内部点大小，单位像素，默认值：20
fillBorderColor | string | 内部点边框颜色，同css颜色，默认值：’#ffffff’
fillBorderWidth | Number | 内部点边框宽度，默认值：1.2
shadowColor | string | 外部光晕颜色，同css颜色，默认值：’rgba(255, 80, 110, 0.7)’
shadowSize | number | 外部光晕大小，单位像素，默认值：40
shadowBorderColor | string | 外部光晕边框颜色，同css颜色，默认值：’rgba(255, 80, 110, 1)’
shadowBorderWidth | number | 外部光晕边框宽度，默认值：1.2
fontColor | string | 文字颜色，同css颜色，默认值：’#ffffff’
fontSize | number | 文字大小，单位像素，默认值：12
fontFamily | string | 文字字体，默认值：’Microsoft Yahei’
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
enablePicked | Boolean | 是否开启鼠标事件，开启后支持鼠标onClick与onMousemove事件，同时支持改变拾取物体颜色,默认值：false
selectedIndex | number | 手动指定选中数据项索引，使该条数据所表示物体变色，-1表示没选中任何元素.默认值：-1,依赖：enablePicked=true
selectedColor | string | 选中态颜色,默认值：’rgba(20, 20, 200, 1)’,依赖：enablePicked=true
autoSelect | boolean | 根据鼠标位置来自动设置选中项selectedIndex，使选中物体变色，设置为true后selectedIndex失效.默认值：false,依赖：enablePicked=true
onClick | function([pickObject](#pickObject数据结构)){} | 点击事件，如果点击在可选中物体上，则返回对应数据,依赖：enablePicked=true
onDblClick | function([pickObject](#pickObject数据结构)){} | 双击事件，如果双击在可选中物体上，则返回对应数据,依赖：enablePicked=true
onRightClick | function([pickObject](#pickObject数据结构)){} | 右键事件，如果右键在可选中物体上，则返回对应数据
onMousemove | function([pickObject](#pickObject数据结构)){} | 鼠标指针移动事件，如果指针悬浮在在可选中物体上，则返回对应数据,依赖：enablePicked=true
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
data | Array  | // 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

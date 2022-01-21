---
title: BmapvTextLayer
---

# BmapvTextLayer
文字展示图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html),可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## Attributes

Attribute | Type | Description
---|:---:|---
fontFamily | String | 文字字体, 默认值：`Microsoft Yahei`
color | String | 颜色，同css颜色,默认值：’#fff’。
fontSize | number | 文字大小, 默认值：14
unit | string | 绘制大小的方式，即指定width和height属性的单位，默认值：’px’。可选值：px，默认值，按像素绘制。 m，按米来绘制
scale | Number | 设置icon缩放，默认值：1
angle | Number | 设置icon按顺时针旋转角度，默认值：0
flat | boolean | icon是否随地图倾斜，即平躺在地图上，默认值：false
collides | boolean | 是否开启碰撞检测，开启后重叠部分的文字会被隐藏, 默认值：true
offset | array | 文字偏移量，基于文字中心点偏移，[{number}x, {number}y], 默认值：[0, 0]
padding | array | 文字内边距，[{number}左右边距, {number}上下边距], 默认值：[2, 2]
margin | array | 文字外边距，[{number}左右边距, {number}上下边距], 默认值：[0, 0]
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
data | Array  | 点数据,GeoJSON格式

## Events

Event Name | Parameters | Description
---|---|---|
init | Object | 组件实例

---
title: 宽线图层
---


# 宽线图层
WebGL默认绘制线的模式gl.LINES只能画一像素的线，无法指定线的宽度，该图层用来展示可指定宽度的线图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)。
如果只需要绘制简单的一像素的线，可以使用SimpleLineLayer。

该图层可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)。

## 基础示例

::: demo
examples/layer/LineLayer
:::


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
blend | String | 点叠加模式，可选lighter
width | number | 线的宽度, 默认值：4
unit | string | 绘制大小的方式，即指定width和height属性的单位，默认值：’px’。可选值：px，默认值，按像素绘制。 m，按米来绘制
dashArray | Array | 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
lineCap | string | 线的端头，可选butt 平头、square 方头、round 圆头, 默认值：`butt`
lineJoin | string | 线的连接拐角，可选miter 尖角、bevel 平角、round 圆角, 默认值：`miter`
miterLimit | number | 由于在尖角情况下角度特别小时，尖角特别长，故用该参数来控制尖角突出部分的最大长度, 默认值：2倍于线宽的长度
antialias | boolean | 抗锯齿，默认关闭为false
offset | number | 沿法线方向的偏移，几乎很少使用到，设置该属性后只能用butt端头和miter连接，不然会出现问题
animation | boolean | 设置该参数来实现蝌蚪线动画，下面的属性生效依赖该值为true。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置。默认值：false
interval | float | 该参数指定每条线段的长度，值为粒子长度占数据中最长的线整体长度的比例, 默认值：0.1
duration | number | 动画的循环时间，单位为秒, 默认值：2
trailLength | float | 拖尾长度占间隔的比例, 默认值：0.5
minZoom | number | 地图视野大于等于一定级别时开启动画，默认值为3，即一直开启
maxZoom | number | 地图视野小于等于一定级别时开启动画，默认值为21，即一直开启
mapStyle | string | 启用animation后该参数失效. 设置该参数，可以在线上叠加一些图形来适用于一些场景。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置。<br/>可选值：<br/> road，叠加路况箭头，可用于道路场景的展示 <br/> arrow，叠加尖箭头图形，可用于OD场景的展示
styleOptions | Object | 控制贴图的样式，对象具有color和width属性
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
---|---|---
enablePicked | Boolean | 是否开启鼠标事件，开启后支持鼠标onClick与onMousemove事件，同时支持改变拾取物体颜色,默认值：false
selectedIndex | number | 手动指定选中数据项索引，使该条数据所表示物体变色，-1表示没选中任何元素.默认值：-1,依赖：enablePicked=true
selectedColor | string | 选中态颜色,默认值：’rgba(20, 20, 200, 1)’,依赖：enablePicked=true
autoSelect | boolean | 根据鼠标位置来自动设置选中项selectedIndex，使选中物体变色，设置为true后selectedIndex失效.默认值：false,依赖：enablePicked=true
onClick | function([pickObject](#pickObject数据结构)){} | 点击事件，如果点击在可选中物体上，则返回对应数据,依赖：enablePicked=true
onDblClick | function([pickObject](#pickObject数据结构)){} | 双击事件，如果双击在可选中物体上，则返回对应数据,依赖：enablePicked=true
onRightClick | function([pickObject](#pickObject数据结构)){} | 右键事件，如果右键在可选中物体上，则返回对应数据
onMousemove | function([pickObject](#pickObject数据结构)){} | 鼠标指针移动事件，如果指针悬浮在在可选中物体上，则返回对应数据,依赖：enablePicked=true

### pickObject数据结构
```
{
    dataIndex: -1, // 返回点击的数据元素索引
    dataItem: {}, // 返回点击的数据元素
}
```



## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 图层显隐，true显示，false隐藏，默认显示
dashOffset | number | 虚线偏移量，单位像素，可以通过实时改变该值来实现动画
data | Array  | 点数据,GeoJSON格式

### data数据结构
```
[{
    geometry: {
     type: 'LineString',
     coordinates: [
        [121.5273285, 31.21515044],
        [121.5473285, 31.21515044]
     ]
    },
    properties: {
     color: 'rgba(255, 255, 50, 0.5)',
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.LineLayer](https://mapv.baidu.com/gl/docs/LineLayer.html) | 获取`LineLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

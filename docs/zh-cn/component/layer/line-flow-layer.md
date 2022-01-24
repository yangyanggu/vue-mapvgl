---
title: 蝌蚪线图层
---

# 蝌蚪线图层
该图层用来展示路线流动状态的动画，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)。

该图层可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)。

## 基础示例

::: demo
examples/layer/LineFlowLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
blend | String | 点叠加模式，可选lighter
width | number | 线的宽度, 默认值：4
interval | float | 该参数指定每条线段的长度，值为粒子长度占数据中最长的线整体长度的比例, 默认值：0.1
duration | number | 动画的循环时间，单位为秒, 默认值：2
trailLength | float | 拖尾长度占间隔的比例, 默认值：0.5
minZoom | number | 地图视野大于等于一定级别时开启动画，默认值为3，即一直开启
maxZoom | number | 地图视野小于等于一定级别时开启动画，默认值为21，即一直开启
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
$$getInstance() | [mapvgl.LineFlowLayer](https://mapv.baidu.com/gl/docs/LineFlowLayer.html) | 获取`LineFlowLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

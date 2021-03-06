---
title: 基础面图层
---

# 基础面图层
用来展示大数据的立体多边形，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

::: demo
examples/layer/ShapeLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
opacity | float | 楼块透明度，0.0表示完全透明，1.0表示完全不透明，浮点数表示. 默认值：1.0
texture | object(canvas dom) 、string(图片url地址) | 纹理贴图，**注意，宽高必须为2的次幂**,当该值不为空时图片必须存在，不然会导致无法渲染
isTextureFull | Boolean | 是否降纹理贴图撑满，默认 false
textureScale | Number | 纹理的缩放
topColor | String | 顶部颜色
blend | String | 点叠加模式，可选lighter
riseTime | Number | 楼块初始化升起动画的时间，单位毫秒. 默认值：0
effect | String | 一些特效. <br/>可选值:<br/> normal，默认，正常<br/> window，窗户效果<br/> windowAnimation，窗户动画效果<br/> gradual，渐变效果<br/> ripple，光波效果
rippleLayer | GroundRippleLayer | 只有effect设置为ripple才会生效
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

### GroundRippleLayer参数
```html
{
    size: 20,
    speed: 5,
    opacity: 0.0,
    segs: 100,
    scale: 10,
    speed: 6,
    color: [245 / 255, 35 / 255, 35 / 255, 0.2]
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
      height: 1000,
      color: 'green'
  }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.ShapeLayer](https://mapv.baidu.com/gl/docs/ShapeLayer.html) | 获取`ShapeLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例

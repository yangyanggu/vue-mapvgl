# 平面图层
用来展示大数据的平面多边形，由[ShapeLayer](https://mapv.baidu.com/gl/docs/ShapeLayer.html)和[LineLayer](https://mapv.baidu.com/gl/docs/LineLayer.html)组合实现。

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-polygon-layer :line-join="lineJoin" :line-width="4" :line-color="lineColor"  :color="color" :data="data"></el-bmapv-polygon-layer>
        </el-bmapv-view>
      </el-bmap>
    </div>
  </template>

  <style>
    .bmap-demo {
      height: 300px;
    }
  </style>

  <script>
  
    module.exports = {
      name: 'bmap-page',
      data() {
        
        return {
          count: 1,
          zoom: 14,
          center: [121.5273285, 31.21515044],
          color: 'rgba(50, 50, 200, 1)',
          lineColor: 'rgba(250, 250, 25, 0.6)',
          lineJoin: 'miter',
          data: [{
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
                  height: 0
              }
          }]
        };
      },
      mounted(){
      },
      methods: {
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
lineColor | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 
lineWidth | number | 描边线宽度. 默认值：2
lineJoin | String | 线的连接拐角，可选miter 尖角、bevel 平角、round 圆角, 默认值：`miter`
dashArray | Array | 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
fillColor | String | 填充面颜色，同css颜色. 默认值：’rgba(25, 25, 250, 1)’
fillOpacity | float | 填充面透明度，0.0表示完全透明，1.0表示完全不透明，浮点数表示. 默认值：1.0
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
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
      height: 0
  }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.PolygonLayer](https://mapv.baidu.com/gl/docs/PolygonLayer.html) | 获取`PolygonLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

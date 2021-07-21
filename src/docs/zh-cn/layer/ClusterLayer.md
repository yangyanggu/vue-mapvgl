# 点聚合图层
点聚合图层，适用于大量数据点的聚合展示，可自定义聚合半径及聚合后展示的样式，由[PointLayer](https://mapv.baidu.com/gl/docs/PointLayer.html)、[IconLayer](https://mapv.baidu.com/gl/docs/IconLayer.html)与[TextLayer](https://mapv.baidu.com/gl/docs/TextLayer.html)组合而成。

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-cluster-layer :data="data" :enable-picked="true" :auto-select="true" :on-click="(e)=>{clickMarker(e)}"></el-bmapv-cluster-layer>
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
          iconOptions: {
            icon: './assets/images/layer/position1.png',
            width: 20,
            height: 20
          },
          data: [{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              properties: {
                  icon: './assets/images/layer/position3.png',
                  width: 20,
                  height: 20
                }
          },{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              properties: {
                  icon: './assets/images/layer/position2.png',
                  width: 20,
                  height: 20
                }
          }]
        };
      },
      mounted(){
      },
      methods: {
        clickMarker(e){
            console.log(e);
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
minSize | number | 聚合点展示的最小直径. 默认值：25
maxSize | number | 聚合点展示的最大直径. 默认值：40
clusterRadius | Number | 聚合半径，像素值. 默认值：200
showText | boolean | 是否显示文字. 默认值：true
maxZoom | number | 聚合的最大地图级别，当地图级别高于此值时不再聚合. 默认值：19
minZoom | number | 聚合的最小地图级别，当地图级别低于此值时不再聚合. 默认值：4
gradient | object | 聚合点的颜色梯度，属性名0~1之间，属性值同css颜色值，通过[Intensity](https://mapv.baidu.com/gl/docs/Intensity.html)拾取。 默认值: [gradient](#gradient) 
textOptions | object | 设置文字属性，支持[文字图层](https://mapv.baidu.com/gl/docs/TextLayer.html)所有参数。 额外参数:format 支持格式化显示的数字，传入参数为单个蜂窝的数量值，不配置此属性则显示原值,类型：function
iconOptions | object | 设置非聚合点显示的icon属性，而非显示一个点，支持[Icon图层](https://mapv.baidu.com/gl/docs/IconLayer.html)所有参数。
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

### gradient
```
{
    0.0: 'rgb(50, 50, 256)',
    0.1: 'rgb(50, 250, 56)',
    0.5: 'rgb(250, 250, 56)',
    1.0: 'rgb(250, 50, 56)'
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
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    properties: {
     icon: 'images/icon1.png'，
     width: 30,
     height: 30
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.ClusterLayer](https://mapv.baidu.com/gl/docs/ClusterLayer.html) | 获取`ClusterLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

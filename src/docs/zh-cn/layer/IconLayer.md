# Icon图标图层
用来展示大数据量的简单点图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmap-info-window :visible="current.visible" :position="current.position" :content="current.content"></el-bmap-info-window>
        <el-bmapv-view>
            <el-bmapv-icon-layer :icon="icon" :width="width" :height="height" :data="data" :enable-picked="true" :on-click="(e)=>{clickMarker(e)}"></el-bmapv-icon-layer>
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
          width: 24,
          height: 40,
          icon: './assets/images/layer/position1.png',
          current: {
            position: [121.5273285, 31.21515044],
            visible: true,
            content: 'hello world'
          },
          data: [{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              properties: {
                  icon: './assets/images/layer/position1.png'
                }
          },{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5473285, 31.21515044],
              },
              properties: {
                  icon: './assets/images/layer/position2.png'
                }
          },{
             geometry: {
                 type: 'Point',
                 coordinates: [121.5673285, 31.21515044],
             },
             properties: {
                icon: './assets/images/layer/position3.png'
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
icon | object(canvas dom) 、string(图片url地址) | icon图标,如果在GeoJSON的properties属性中配置icon，则优先使用GeoJSON中的icon值
width | number | 设置icon图标宽度
height | Number | 设置icon图标高度
unit | string | 绘制大小的方式，即指定width和height属性的单位，默认值：’px’。可选值：px，默认值，按像素绘制。 m，按米来绘制
scale | Number | 设置icon缩放，默认值：1
angle | Number | 设置icon按顺时针旋转角度，默认值：0
flat | boolean | icon是否随地图倾斜，即平躺在地图上，默认值：false
offset | array | icon图标偏移值，基于图标中心点偏移，[{number}x, {number}y],默认值：[0, 0]
padding | array | 生成icon雪碧图时，图标间的空隙,默认值：[0, 0]
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
data | Array  | // 点数据,GeoJSON格式
                         
### data数据结构
```
[{
  geometry: {
      type: 'Point',
      coordinates: [121.5273285, 31.21515044],
  },
  properties: {
      icon: '/assets/images/layer/position1.png'
    }
},{
  geometry: {
      type: 'Point',
      coordinates: [121.5473285, 31.21515044],
  },
  properties: {
      icon: '/assets/images/layer/position2.png'
    }
},{
  geometry: {
     type: 'Point',
     coordinates: [121.5673285, 31.21515044],
  },
  properties: {
    icon: '/assets/images/layer/position3.png'
  }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.IconLayer](https://mapv.baidu.com/gl/docs/IconLayer.html) | 获取`IconLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

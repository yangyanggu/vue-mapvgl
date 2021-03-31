# 圆图层
以贴地圆的方式展示点数据，支持设置多种圆环动画效果，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-circle-layer :zoom-threshold="[12,15]" :visible="visible" unit="m" :type="type" :size="10" :radius="radius" :data="data"></el-bmapv-circle-layer>
        </el-bmapv-view>
      </el-bmap>
      <div>
        <button @click="switchShow()">切换显隐</button>
      </div>
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
          visible: false,
          zoom: 14,
          center: [121.5273285, 31.21515044],
          type: 'bubble',
          radius(size){
            return size * 2;
          },
          data: [{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              size: 30,
              color: 'red'
              },{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5373285, 31.21515044],
              },
              size: 40,
              color: 'green'
          }]
        };
      },
      mounted(){
      },
      methods: {
        switchShow(){
          this.visible = !this.visible;
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
type | string | 设置圆的类型, 默认值：’simple’. <br/>可选值：<br/> simple，默认值，普通圆，扩散效果的相关设置对其无效, <br/> wave，带波纹扩散效果的圆, <br/> bubble，带冒泡扩散效果的圆
color | String | 颜色，同css颜色, 默认值：’blue’, 当在data中设置时，优先使用data中的颜色
size | Number | 圆的半径大小，带扩散效果时指的是中心圆的半径大小, 默认值：10
unit | string | 绘制大小的方式，即指定size属性的单位, 默认值：px。可选值：px，默认值，按像素绘制， m，按米来绘制
radius | number &#124; function | 扩散效果的半径大小，设置值时需要比size的值大，否则看不出扩散效果，也可设置为函数，传入参数为中心圆半径。默认值： 2*size
duration | Number | 扩散效果的动画周期。wave类型时duration影响的是波纹的扩散速度，越小越快, bubble类型时duration是扩散开始到最大半径的时间，越大越长. 默认值：1
trial | Number | 扩散效果的间隔时间。wave类型时trial影响的是波纹数，越大越多, bubble类型时trial是扩散最大半径到消失的时间，越大越长. 默认值：1
random | boolean | 扩散效果的开始时间是否随机，设置为‘false’则表现为节奏一致。默认值：true 
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
---|---|当type值为simple时支持以下参数与事件
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
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    size: 40,
    color: 'green'
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.HeatGridLayer](https://mapv.baidu.com/gl/docs/HeatGridLayer.html) | 获取`HeatmapLayer`实例

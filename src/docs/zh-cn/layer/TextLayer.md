# 文字图层
文字展示图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-text-layer color="#fff" :stroke-color="'red'" :font-weight="600" :offset="[0,100]" :font-size="30" :data="data" :enable-picked="true" :auto-select="true" :on-click="(e)=>{clickMarker(e)}"></el-bmapv-text-layer>
        </el-bmapv-view>
      </el-bmap>
      <button @click="switchHeight">切换文字高度</button> 
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
          zoom: 14,
          center: [121.5273285, 31.21515044],
          color: '#ff0',
          data: [{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              properties: {
                  text: 'hello world'
                }
          }]
        };
      },
      mounted(){
      },
      methods: {
        clickMarker(e){
            console.log(e);
        },
        switchHeight(){
          let top = Math.random() * 100;
          this.data.splice (0,1, {
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044, top],
              },
              properties: {
                  text: 'hello world'
                }
          });
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
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
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    properties: {
     text: 'hello world',
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.TextLayer](https://mapv.baidu.com/gl/docs/TextLayer.html) | 获取`TextLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

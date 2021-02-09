# MarkerListLayer图层
用来展示标注点集合，支持传入text，由PointLayer和TextLayer组合实现

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-marker-list-layer :visible="visible" :data="data"></el-bmapv-marker-list-layer>
        </el-bmapv-view>
      </el-bmap>
      <div>
        <button @click.prevent="switchVisible">切换显隐</button>
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
          zoom: 14,
          center: [121.5273285, 31.21515044],
          data: [{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              properties: {
                  text: 'hello',
                  fillSize: 50,
                  shadowSize: 100
                }
          },{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5473285, 31.21515044],
              },
              properties: {
                  text: 'world',
                  fillSize: 50,
                  shadowSize: 100
                }
          }],
          visible: true
        };
      },
      mounted(){
      },
      methods: {
        switchVisible(){
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
        text: 'hello',
        fillSize: 50,
        shadowSize: 100
      }
},{
    geometry: {
        type: 'Point',
        coordinates: [121.5473285, 31.21515044],
    },
    properties: {
        text: 'world',
        fillSize: 50,
        shadowSize: 100
      }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.MarkerListLayer](https://mapv.baidu.com/gl/docs/MarkerListLayer.html) | 获取`MarkerListLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

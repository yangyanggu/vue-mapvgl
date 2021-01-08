# 基础点图层
用来展示大数据量的简单点图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

可使用鼠标拾取[Pick](https://mapv.baidu.com/gl/docs/Pick.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-point-layer :color="color" :shape="shape" :blend="blend" :size="size" :data="data" :enable-picked="true" :auto-select="true" :on-click="(e)=>{clickMarker(e)}"></el-bmapv-point-layer>
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
          shape: 'circle', // 默认为圆形 circle ，可传 square 改为正方形
          blend: 'lighter',
          size: 60,
          data: [{
              geometry: {
                  type: 'POINT',
                  coordinates: [121.5273285, 31.21515044],
              },
              properties: {
                  id: '1'
                }
          }]
        };
      },
      mounted(){
          setTimeout(() => {
            this.color = 'red';
            this.shape = 'square';
          },2000);
          setTimeout(() => {
            this.data = [{
                          geometry: {
                              type: 'POINT',
                              coordinates: [121.5273285, 31.21515044]
                          }
                      },{
                          geometry: {
                              type: 'POINT',
                              coordinates: [121.5483395, 31.21515154]
                          }
                      }];
          },4000);
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
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
shape | String | 展示点的形状,默认值：’circle’,可选值：circle 圆形, square 正方形
size | Number | 点大小, 默认值：5
borderWidth | Number | 边框宽度,默认值：0
borderColor | String | 边框颜色，同css颜色,默认值：’rgba(255, 255, 255, 0.9)’
blend | String | 点叠加模式，可选lighter
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
     color: 'rgba(255, 255, 50, 0.5)',
     count: 90
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.PointLayer](https://mapv.baidu.com/gl/docs/PointLayer.html) | 获取`PointLayer`实例
$$pick({Number}x, {Number}y) | [pickObject数据结构](#pickObject数据结构) | 根据屏幕像素坐标获取元素,依赖：enablePicked=true

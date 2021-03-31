# 立体墙图层
用来展示3d立体墙图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :tilt="60" :heading="0" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-wall-layer :height="1200" :gradient="gradient"  :data="data"></el-bmapv-wall-layer>
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
          gradient: {
                  0.0: 'rgb(50, 50, 256)',
                  0.1: 'rgb(50, 250, 56)',
                  0.5: 'rgb(250, 250, 56)',
                  1.0: 'rgb(250, 50, 56)'
              },
          data: [{
              geometry: {
                  type: 'LineString',
                  coordinates: [
                      [121.5273285, 31.21515044],
                      [121.5473285, 31.21515044]
                  ],
              },
              properties: {
                  color: 'green'
                }
              }
              ]
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
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
gradient | Object | 渐变颜色模式，设置后color属性会失效，数据类型为Object。Object只有0和1两个键，0表示远地处的颜色，1表示近地处的颜色,实例见 [gradient](#gradient)
height | Number | 立体墙的高度, 默认值：100
texture | object(canvas dom) 、string(图片url地址) | 纹理贴图，注意，**宽高必须为2的次幂**
enablePreciseMap | boolean | 开启精准贴图模式，纹理会按顶点间的实际距离对应拉伸，当使用的纹理有实际数据意义时开启
repeatMap | Number | 重复贴图，单位为米，如值为500代表500米重复一次贴图，值为0时不重复贴图, 默认值：0
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]

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
$$getInstance() | [mapvgl.WallLayer](https://mapv.baidu.com/gl/docs/WallLayer.html) | 获取`WallLayer`实例

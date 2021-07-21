# 基础线图层
用来展示大数据量的简单线图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-simple-line-layer :color="color" :blend="blend" :data="data"></el-bmapv-simple-line-layer>
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
          blend: 'lighter',
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
color | String | 颜色，同css颜色,默认值：’rgba(25, 25, 250, 1)’。 如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
blend | String | 点叠加模式，可选lighter
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

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
$$getInstance() | [mapvgl.SimpleLineLayer](https://mapv.baidu.com/gl/docs/SimpleLineLayer.html) | 获取`SimpleLineLayer`实例

# Gltf图层
Gltf图层,该图层API百度尚未提供，因此暂时只能提供scale跟url参数

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-gltf-layer :scale="200" url="./assets/gltf/car2.gltf" :data="data"></el-bmapv-gltf-layer>
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
          data: [{
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              angle: 0
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
scale | Number | 缩放比例，默认1 
url | String | gltf模型的下载地址


## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
data | Array  | 点数据,GeoJSON格式
                         
### data数据结构
```
[{
    geometry: {
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    angle: 0
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | mapvgl.GltfLayer | 获取`GltfLayer`实例

# 热力线图层

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-heat-line-layer :min="20" :max="80" :gradient="gradient"  :data="data"></el-bmapv-heat-line-layer>
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
                    count: 50
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
gradient | Object | 渐变颜色模式，数据类型为Object,实例见 [gradient](#gradient)
max | Number | 最大阈值
min | Number | 最小阈值

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
data | Array  | 点数据,GeoJSON格式
                         
### data数据结构
```
[{
    geometry: {
     type: 'Point',
     coordinates: [
        [121.5273285, 31.21515044],
        [121.5473285, 31.21515044]
     ]
    },
    properties: {
     count: 50,
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.HeatLineLayer](https://mapv.baidu.com/gl/docs/HeatLineLayer.html) | 获取`HeatLineLayer`实例

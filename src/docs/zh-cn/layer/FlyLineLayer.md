# 飞线图层

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-fly-line-layer :color="color" :texture-color="'#000'" :texture-width="40" :data="data"></el-bmapv-fly-line-layer>
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
          color: 'rgba(232,33,242,1)',
          data: [{
              geometry: {
                  type: 'LineString',
                  coordinates: [
                    [121.5273285, 31.21515044],
                    [121.5673285, 31.21515044],
                    [121.5673285, 31.15515044]
                  ],
              },
              properties: {
              },
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
style | string | 飞线动画方式, 默认值：’normal’. <br/> 可选值：<br/> normal，默认值，飞线动画速度均匀 <br/> chaos，飞线动画速度不均匀
color | String | 底线颜色，同css颜色, 默认值：’rgba(255, 5, 5, 1)’
textureColor | String | 飞线动画颜色，同css颜色, 默认值：’rgba(255, 5, 5, 1)’
textureWidth | Number | 飞线动画的宽度, 默认值：5
textureLength | Number | 飞线动画的长度，占整条线的百分比，取值0-100, 默认值：30
step | Number | 飞线动画的步长，步长越大动画速度越快, 默认值：0.1

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
data | Array  | 点数据,GeoJSON格式
                         
### data数据结构
```
[{
    geometry: {
       type: 'LineString',
       coordinates: [
         [121.5273285, 31.21515044],
         [121.5673285, 31.21515044],
         [121.5673285, 31.15515044]
       ]
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.FlyLineLayer](https://mapv.baidu.com/gl/docs/FlyLineLayer.html) | 获取`FlyLineLayer`实例

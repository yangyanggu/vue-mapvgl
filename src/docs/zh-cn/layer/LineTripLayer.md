# 线轨迹图层
用来展示轨迹飞线图层，继承自[Layer](https://mapv.baidu.com/gl/docs/Layer.html)

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-line-trip-layer :step="0.01" :data="data"></el-bmapv-line-trip-layer>
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
color | String | 颜色，同css颜色,默认值：’rgba(255, 5, 5, 1)’,如果在GeoJSON的properties属性中配置color，则优先使用GeoJSON中的color值
startTime | Number | 动画开始时间,默认值：0
endTime | Number | 动画结束时间,默认值：data的长度
step | Number | 执行每次动画的步长,默认值：0.1
trailLength | Number | 动画的拖尾时长,默认值：3

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
        color: 'red'
    }
}]
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [mapvgl.PointTripLayer](https://mapv.baidu.com/gl/docs/PointTripLayer.html) | 获取`PointTripLayer`实例

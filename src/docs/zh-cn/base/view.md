# 地图

地图组件

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap ref="map" vid="bmapDemo" :min-zoom="10" :max-zoom="22" :center="center" :zoom="zoom" class="bmap-demo">
        <el-bmapv-view></el-bmapv-view>
      </el-bmap>

    </div>
  </template>

  <style>
    .bmap-demo {
      height: 300px;
    }
  </style>

  <script>
    // NPM 方式
    // import VueBMap from 'vue-bmap-gl';
    // CDN 方式
    module.exports = {
      data: function() {
        return {
          zoom: 16,
          center: [121.59996, 31.197646],
          
        };
      },
      mounted() {
      },
      methods: {
      }
    };
  </script>

</script>

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 组件的ID。
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | mapvgl.View | View


## 事件

事件 | 参数 | 说明
---|---|---|

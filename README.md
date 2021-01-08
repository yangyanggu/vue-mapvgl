<p align="center">
  <img src="https://cdn.rawgit.com/ElemeFE/vue-amap/master/src/docs/assets/images/logo.png">
</p>

# vue-mapvgl
[![Build Status](https://dev.azure.com/407042815/vue-mapvgl/_apis/build/status/vue-mapvgl-Node.js%20With%20Grunt-CI?branchName=master)](https://dev.azure.com/407042815/vue-mapvgl/_build/latest?definitionId=1&branchName=master)
[![npm package](https://img.shields.io/npm/v/vue-mapvgl.svg)](https://gitee.com/guyangyang/vue-bmap-gl)
[![NPM downloads](http://img.shields.io/npm/dm/vue-mapvgl.svg)](https://gitee.com/guyangyang/vue-bmap-gl)
[![license](https://img.shields.io/github/license/elemefe/vue-amap.svg?style=flat-square)](https://gitee.com/guyangyang/vue-bmap-gl)
[![star](https://gitee.com/guyangyang/vue-mapvgl/badge/star.svg?theme=dark)](https://gitee.com/guyangyang/vue-mapvgl/stargazers)
[![fork](https://gitee.com/guyangyang/vue-mapvgl/badge/fork.svg?theme=dark)](https://gitee.com/guyangyang/vue-mapvgl/members)

> vue-mapvgl是一套基于Vue 2.0和百度地图mapvgl的地图组件。
>该组件依赖于vue-bmap-gl，使用方式请查看教程
> 该项目基于 https://github.com/ElemeFE/vue-amap/ 修改开发

## 安装
```
npm install -S vue-bmap-gl
npm install -S vue-mapvgl
```

## 文档
[https://guyangyang.gitee.io/vue-mapvgl/#/](https://guyangyang.gitee.io/vue-mapvgl/#/)


## 快速上手

引入vue-bmap-gl和vue-mapvgl

```javascript
// 引入vue-bmap-gl
import VueBMap from 'vue-bmap-gl';
import VueMapvgl from 'vue-mapvgl';
import 'vue-bmap-gl/dist/style.css';
Vue.use(VueBMap);
Vue.use(VueMapvgl);

// 初始化vue-bmap
VueBMap.initBMapApiLoader({
  // 百度的key
  ak: 'YOUR_KEY',
  // 百度 sdk 版本，默认为 1.0
  v: '1.0'
});
```

## 组件

目前完成组件：
* el-bmapv-view (图层管理器，图层的容器)
* el-bmapv-point-layer (基础点图层 PointLayer)
* el-bmapv-icon-layer (Icon图标图层 IconLayer)
* el-bmapv-point-trip-layer (点轨迹图层 PointTripLayer)
* el-bmapv-heat-point-layer (热力点图层 HeatPointLayer)
* el-bmapv-heat-map-layer (热点图图层 HeatmapLayer)
* el-bmapv-heat-grid-layer (热力柱图层 HeatGridLayer)
* el-bmapv-spark-layer (烟花点图层 SparkLayer)
* el-bmapv-circle-layer (圆图层 CircleLayer)
* el-bmapv-ripple-layer (波纹点图层 RippleLayer)
* el-bmapv-text-layer (文字图层 TextLayer)
* el-bmapv-fan-layer (雷达图层 FanLayer)
* el-bmapv-simple-line-layer (基础线图层 SimpleLineLayer)
* el-bmapv-line-layer (宽线图层 LineLayer)
* el-bmapv-wall-layer (立体墙图层 WallLayer)
* el-bmapv-heat-line-layer (热力线图层 HeatLineLayer)
* el-bmapv-line-flow-layer (蝌蚪线图层 LineFlowLayer)
* el-bmapv-line-trip-layer (线轨迹图层 LineTripLayer)
* el-bmapv-wall-trip-layer (墙轨迹图层 WallTripLayer)
* el-bmapv-fly-line-layer (飞线图层 FlyLineLayer)
* el-bmapv-shape-layer (基础面图层 ShapeLayer)
* el-bmapv-shape-line-layer (线状面图层 ShapeLineLayer)
* el-bmapv-polygon-layer (平面图层 PolygonLayer)
* el-bmapv-cluster-layer (点聚合图层 ClusterLayer)
* el-bmapv-honeycomb-layer (蜂窝图层 HoneycombLayer)
* el-gltf-layer (百度针对gltf的实现)
* el-gltf-three-layer (根据ThreeLayer以及ThreeJS进行扩展实现的模型加载图层)

##mapvgl自带后处理器效果
* 炫光特效 BloomEffect
* 发光特效 BrightEffect

##mapvgl自带工具
* 颜色值域生成器 Intensity
* 3D曲线生成器 BezierCurve
* 大地线生成器 GeodesicCurve(zh-cn/util/GeodesicCurve.md)
* Od曲线生成器 OdCurve



### 其他特性



## 反馈



# vue-mapvgl
[![npm (tag)](https://img.shields.io/npm/v/vue-mapvgl/next)](https://www.npmjs.org/package/vue-mapvgl)
[![NPM downloads](http://img.shields.io/npm/dm/vue-mapvgl.svg)](https://npmjs.org/package/vue-mapvgl)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/vue-mapvgl@next/dist/index.min.js?compression=gzip&label=gzip%20size:%20JS)
[![NPM](https://img.shields.io/npm/l/vue-mapvgl)](https://gitee.com/guyangyang/vue-mapvgl)
[![star](https://gitee.com/guyangyang/vue-mapvgl/badge/star.svg?theme=dark)](https://gitee.com/guyangyang/vue-mapvgl/stargazers)

> vue-mapvgl@next是一套基于Vue3 和百度mapvgl的地图组件。
> 该组件依赖于vue-bmap-gl@next，使用方式请查看教程
> 该版本对原组件进行升级，主要适配Vue3。

>vue2请使用0.x版本，对应分支vue2

```html
觉得有用可以给个star
```

## 群号
![avatar](./image/vue-mapvgl.png)

## 捐赠支持
<img src="./image/zhifubao.jpg" alt="支付宝" width="270px" />
<img src="./image/weixin.png" alt="微信" width="270px"/>

## 安装
```
npm i -S vue-mapvgl@next
```

## 文档
**[https://vue-mapvgl.guyixi.cn](https://vue-mapvgl.guyixi.cn)**


## 快速上手

引入vue-bmap-gl@next、vue-mapvgl@next

```javascript
// 引入vue-bmap-gl
import VueBMap, {initBMapApiLoader} from 'vue-bmap-gl';
import VueMapvgl from 'vue-mapvgl';
import 'vue-bmap-gl/dist/style.css';

// 初始化vue-bmap-gl
initBMapApiLoader({
  // 百度的key
  ak: 'YOUR_KEY',
});
createApp(App).use(VueBMap).use(VueMapvgl)

```

## 自动导入
首先你需要安装```unplugin-vue-components``` 、 ```unplugin-auto-import``` 、 ```@vuemap/unplugin-resolver```这三款插件
```
npm install -D unplugin-vue-components unplugin-auto-import @vuemap/unplugin-resolver
```
然后在main.ts中导入css和进行初始化key
```ts
import App from './App.vue'
import {initBMapApiLoader} from 'vue-bmap-gl';
import 'vue-bmap-gl/dist/style.css'
initBMapApiLoader({
    ak: 'YOUR_KEY'
})

createApp(App)
    .mount('#app')
```
再修改配置文件，把下列代码插入到你的 Vite 或 Webpack 的配置文件中
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {VueBmapGlResolver, VueMapvglResolver} from '@vuemap/unplugin-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VueBmapGlResolver(),VueMapvglResolver()],
    }),
    Components({
      resolvers: [VueBmapGlResolver(),VueMapvglResolver()],
    }),
  ]
})
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
* el-bmapv-marker-list-layer (标注点组件 MarkerListLayer)
* el-bmapv-bar-layer (柱状图层 BarLayer)

##mapvgl自带后处理器效果
* 炫光特效 BloomEffect
* 发光特效 BrightEffect

##mapvgl自带工具
* 颜色值域生成器 Intensity
* 3D曲线生成器 BezierCurve
* 大地线生成器 GeodesicCurve(zh-cn/util/GeodesicCurve.md)
* Od曲线生成器 OdCurve

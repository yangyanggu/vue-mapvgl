<p align="center">
  <img src="https://cdn.rawgit.com/ElemeFE/vue-amap/master/src/docs/assets/images/logo.png">
</p>

# vue-mapvgl
[![Build Status](https://travis-ci.org/a407042815/vue-bmap-gl.svg?branch=master)](https://travis-ci.org/ElemeFE/vue-amap)
[![npm package](https://img.shields.io/npm/v/vue-mapvgl.svg)](https://gitee.com/guyangyang/vue-bmap-gl)
[![NPM downloads](http://img.shields.io/npm/dm/vue-mapvgl.svg)](https://gitee.com/guyangyang/vue-bmap-gl)
[![license](https://img.shields.io/github/license/elemefe/vue-amap.svg?style=flat-square)](https://gitee.com/guyangyang/vue-bmap-gl)
[![Gitee stars](https://gitee.com/guyangyang/mapvgl/badge/star.svg?theme=white)](https://gitee.com/guyangyang/vue-bmap-gl/stargazers)

> vue-mapvgl是一套基于Vue 2.0和百度地图mapvgl的地图组件。
>该组件依赖于vue-bmap-gl，使用方式请查看教程
> 该项目基于 https://github.com/ElemeFE/vue-amap/ 修改开发

## 安装
```
npm install -S vue-mapvgl
```

## 文档
[https://guyangyang.gitee.io/vue-mapvgl/#/](https://guyangyang.gitee.io/vue-mapvgl/#/)


## 快速上手

引入vue-mapvgl

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
* mapvgl-view (图层管理器，图层的容器)
* mapvgl-point-layer (基础点图层 PointLayer)


### 其他特性



## 反馈


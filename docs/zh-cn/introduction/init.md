---
title: 脚本初始化
---

# 初始化

---

## 引入地图


NPM 安装：

```javascript
import App from './App.vue'
import VueBMap, {initBMapApiLoader} from 'vue-bmap-gl';
import 'vue-bmap-gl/dist/style.css'
import VueMapvgl from 'vue-mapvgl'
initBMapApiLoader({
    ak: 'YOUR_KEY'
})

createApp(App)
    .use(VueBMap)
    .use(VueMapvgl)
    .mount('#app')

```


## Promise

在**定制化程度较高**的项目中，开发者可以通过获取mapvgl来实现自定义图层开发

NPM 安装：

```javascript
import {mapvgl, util, effect, mapvglThree, THREE} from 'vue-mapvgl'
```

CDN 引入：

```javascript
VueMapvgl.mapvgl       //mapvgl命名空间
VueMapvgl.util         //mapvgl提供的工具类：颜色值域生成器 Intensity、3D曲线生成器 BezierCurve、大地线生成器 GeodesicCurve、Od曲线生成器 OdCurve
VueMapvgl.effect       //后处理器 Effects：炫光特效 BloomEffect、发光特效 BrightEffect
VueMapvgl.mapvglThree  //mapvgl的three图层
VueMapvgl.THREE        //百度mapvgl处理的threeJS库
```



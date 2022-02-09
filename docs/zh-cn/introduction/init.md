---
title: 脚本初始化
---

# 初始化

---

## 完整导入


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
      resolvers: [VueBmapGlResolver(), VueMapvglResolver()],
    }),
    Components({
      resolvers: [VueBmapGlResolver(), VueMapvglResolver()],
    }),
  ]
})
```

::: warning
当项目中Element-Plus也使用自动导入功能时会与地图组件冲突，需要使用unplugin-vue-components@0.17.15之后的版本
:::
使用Element-plus的自动导入时，配置需要修改为如下：
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {VueBmapGlResolver, VueMapvglResolver} from '@vuemap/unplugin-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({
        exclude: /^ElBmap|ElBmapv[A-Z]*!/
      }),VueBmapGlResolver(), VueMapvglResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        exclude: /^ElBmap|ElBmapv[A-Z]*!/
      }),VueBmapGlResolver(), VueMapvglResolver()],
    }),
  ]
})

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



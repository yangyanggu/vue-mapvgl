# 快速上手

---

本节将介绍如何在项目中使用 vue-mapvgl。


## 1 - 项目结构

这里提供了简单的示例项目模板。

项目结构为：
```html
|- src/  --------------------- 项目源代码
    |- App.vue
    |- main.js  -------------- 入口文件
|- .babelrc  ----------------- babel 配置文件
|- index.html  --------------- HTML 模板
|- package.json  ------------- npm 配置文件
|- webpack.config.js  -------- webpack 配置文件
```

项目中涉及到的几个文件如下：

.babelrc
```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-mapvgl-starter</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="dist/build.js"></script>
  </body>
</html>
```

package.json
```json
{
  "name": "vue-bmap-starter",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --port 9876",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "dependencies": {
    "vue-bmap-gl": "^0.0.8",
    "vue-mapvgl": "^0.0.8",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "babel-core": "^6.0.0",
    "babel-loader": "^6.0.0",
    "babel-preset-es2015": "^6.13.2",
    "css-loader": "^0.23.1",
    "style-loader": "^0.13.1",
    "cross-env": "^1.0.6",
    "vue-loader": "^9.8.0",
    "webpack": "beta",
    "webpack-dev-server": "beta"
  }
}
```

webpack.config.js
```javascript
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
```

## 2 - 引入vue-bmap-gl

main.js
```javascript
import Vue from 'vue';
import VueBMap from 'vue-bmap-gl';
import 'vue-bmap-gl/dist/style.css'
import VueMapvgl  from 'vue-mapvgl';
import App from './App.vue';

Vue.use(VueBMap);
Vue.use(VueMapvgl);
VueBMap.initBMapApiLoader({
  ak: 'your bmap key',
  // 默认百度 sdk 版本为 1.0
  v: '1.0'
});

new Vue({
  el: '#app',
  render: h => h(App)
})
```

App.vue
```html
<template>
  <div id="app">
    <h3 class="title">{{ msg }}</h3>
    <div class="bmap-wrapper">
      <el-bmap class="bmap-box" :zoom="zoom" :center="center" :vid="'bmap-vue'">
        <el-bmapv-view>
            <el-bmapv-gltf-layer :scale="200" url="./assets/gltf/car2.gltf" :data="data"></el-bmapv-gltf-layer>
        </el-bmapv-view>
      </el-bmap>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'vue-bmap向你问好！',
      zoom: 14,
      center: [121.5273285, 31.21515044],
      data: [{
        geometry: {
            type: 'Point',
            coordinates: [121.5273285, 31.21515044],
        },
        angle: 0
      }]
    }
  }
}
</script>

<style>
.bmap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
```

## 安装依赖

```javascript
npm install
```

## 构建

```javascript
npm run dev
```

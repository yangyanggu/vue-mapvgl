# 初始化

---

## 引入地图和mapvgl


NPM 安装：

```javascript
import VueBMap from 'vue-bmap-gl';
import 'vue-bmap-gl/dist/style.css'
import VueMapvgl  from 'vue-mapvgl';

Vue.use(VueBMap);
Vue.use(VueMapvgl);
VueBMap.initBMapApiLoader({
  ak: 'YOUR_KEY',
  v: '1.0'
});
```

## 定制化开发

在**定制化程度较高**的项目中，开发者可能只想通过原生对象进行开发

NPM 安装：

```javascript
import {effect,util,mapvgl,mapvglThree} from 'vue-mapvgl';
```
通过以上代码我们可以获取百度原生对象，具体API可以查看[官网](http://lbsyun.baidu.com/solutions/mapvdata)


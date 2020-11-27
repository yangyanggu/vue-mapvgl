# 3D曲线生成器
通过传入起点和终点，生成带高度的贝塞尔曲线坐标集，可以用来生成飞线数据
官方API： [https://mapv.baidu.com/gl/docs/BezierCurve.html](https://mapv.baidu.com/gl/docs/BezierCurve.html)

## 基础示例
```js
  //import方式
  // import {util} from 'vue-mapvgl'
  
  //CDN方式
  let curve  = new VueMapvgl.util.BezierCurve({
          start: [12946640.989, 4846560.296],
          end: [12946348.509, 4846401.146]
  });
```


## Options属性

名称 | 类型 | 说明
---|:---:|---
start | Array | 起点坐标
end | Array | 终点坐标


## 实例方法
方法名 | 描述 | 说明
--- | --- | ---
getPoints | getPoints({number} &#124; {undefined}) | 获取生成的曲线坐标集，传入的字段为曲线的分段数，默认值是20
setOptions | setOptions({Object}options) | 修改起点、终点坐标等属性

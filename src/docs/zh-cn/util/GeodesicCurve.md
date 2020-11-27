# 大地线生成器 GeodesicCurve
通过传入2个以上的坐标点，来依次生成大地线坐标集，可以用来生成地球模式的大圆曲线
官方API： [https://mapv.baidu.com/gl/docs/GeodesicCurve.html](https://mapv.baidu.com/gl/docs/GeodesicCurve.html)

## 基础示例
```js
  //import方式
  // import {util} from 'vue-mapvgl'
  
  //CDN方式
  let curve  = new VueMapvgl.util.GeodesicCurve({
          points: [
              [116.392394, 39.910683],
              [10.2345234, 22.453211],
              [101.432322, 70.222315]
          ]
  });
```


## Options属性

名称 | 类型 | 说明
---|:---:|---
points | Array | 传入经过点的坐标数组

## 实例方法
方法名 | 描述 | 说明
--- | --- | ---
getPoints | getPoints() | 获取生成的大地曲线坐标集，分段数按实际距离自动设定，无需传入参数
setOptions | setOptions({Object}options) | 修改坐标数组等属性

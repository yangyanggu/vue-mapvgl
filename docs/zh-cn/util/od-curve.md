---
title: Od曲线生成器 OdCurve
---

# Od曲线生成器
通过传入2个或2个以上的坐标点，来依次生成od曲线坐标集。
该曲线为2D弯曲方式，且不同于大地曲线，大地曲是根据球面最短距离来计算的，距离太近的2个点基本不会弯曲，而这个Od曲线的生成算法不同，即使很短的距离也会弯曲。
官方API： [https://mapv.baidu.com/gl/docs/OdCurve.html](https://mapv.baidu.com/gl/docs/OdCurve.html)

## 基础示例
```js
  //import方式
  // import {util} from 'vue-mapvgl'

  //CDN方式
  let curve  = new VueMapvgl.util.OdCurve({
          points: [
              [116.392394, 39.910683],
              [111.432322, 40.222315]
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
getPoints | getPoints({number} &#124; {undefined}) | 获取生成的Od曲线坐标集，传入的字段为曲线的分段数，默认值是20
setOptions | setOptions({Object}options) | 修改坐标数组等属性

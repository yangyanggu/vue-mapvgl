# 颜色值域生成器
值域组件，可以按照权重值的强度获取对应渐变色中的颜色或半径大小的值,该类只是工具类，单独使用。
官方API： [https://mapv.baidu.com/gl/docs/Intensity.html](https://mapv.baidu.com/gl/docs/Intensity.html)

## 基础示例
```js
  //import方式
  // import {util} from 'vue-mapvgl'
  
  //CDN方式
  let intensity = new VueMapvgl.util.Intensity({
          maxSize: 100, // 定义最大的半径大小值
          gradient: { // 渐变色设置
              0.25: "rgb(0,0,255)",
              0.55: "rgb(0,255,0)",
              0.85: "yellow",
              1.0: "rgb(255,0,0)"
          },
          max: 100 // 最大权重值
  });
```


## Options属性

名称 | 类型 | 说明
---|:---:|---
gradient | Object | 渐变色设置. 默认值：[gradient](#gradient)
max | Number | 权重最大阈值. 默认值：100
min | Number | 权重最小阈值. 默认值：0
maxSize | Number | 生成最大半径. 默认值：35
minSize | Number | 生成最小半径. 默认值：0

### gradient
```text
{
    0.25: 'rgba(0, 0, 255, 1)',
    0.55: 'rgba(0, 255, 0, 1)',
    0.85: 'rgba(255, 255, 0, 1)',
    1: 'rgba(255, 0, 0, 1)'
}
```

## 实例方法
方法名 | 描述 | 说明
--- | --- | ---
getSize | getSize(number) | 根据传入的权重值获取对应的半径大小
getColor | getColor(number) | 根据传入的权重值获取对应的颜色
setMax | setMax(number) | 修改最大权重值
setMaxSize | setMaxSize(number) | 修改生成最大半径值
setMin | setMin(number) | 修改最小权重值
setMinSize | setMinSize(number) | 修改生成最小半径值

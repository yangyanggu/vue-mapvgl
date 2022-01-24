---
title: threeGltfLayer图层管理器
---

# Three加载模型使用的view图层
使用ThreeJS加载模型，目前支持加载gltf文件、glb文件和threejs导出的json文件，当前使用文件后缀进行判断需要使用哪种加载方式。
新增加el-bmapv-three-view，该view存在于el-bmapv-view之下，用于给所有模型提供统一的渲染，比如灯光、后期处理灯等

## 已知问题
当同一个view图层中存在两种不同的文件格式会导致显示混乱，所以尽量全部用同一个文件格式，如果必须不同，则使用不同的el-bmapv-view进行隔离

## 基础示例

::: demo
examples/layer/GltfThreeLayer
:::

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
lights | Array | 图层的全局灯光配置，可以配置多个灯光，详细参数见下面灯光说明
hdr | Object | HDR配置
zoomThreshold | Array | 全图层均可使用，用来指定图层执行渲染的地图层级，初始默认值[0, 30]
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒

### HDR配置
```html
{
  urls: ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'], // HDR贴图下载地址，需要6个文件，代表6个方向， 默认 ''
  path: '/', // HDR下载地址的路径前缀, 默认 /
  exposure: 1.0 // 光亮程度, 默认1 ，值越小越暗
}
```

### 灯光配置
```html
{
  type: 'DirectionalLight', //灯光类型， 可选值见下面的字典
  args: [], //灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
  position: {
    x: 0,
    y: 0,
    z: 0
  }, //光源的位置
  lookAt: {
    x: 0,
    y: 0,
    z: 0
  } //光源查看的目标点
}

const lightTypes = {
  AmbientLight: THREE.AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight: THREE.DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight: THREE.HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight: THREE.PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight: THREE.RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight: THREE.SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | ThreeLayer | 获取`ThreeLayer`实例

## 事件列表
事件名称 | 回调值 | 说明
init | ThreeLayer | threeLayer为three图层对象(使用百度的ThreeLayer对象)

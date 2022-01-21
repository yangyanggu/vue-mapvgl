---
title: BmapvGltfThreeLayer
---

# BmapvGltfThreeLayer
使用ThreeJS加载模型，目前支持加载gltf文件、glb文件和threejs导出的json文件，当前使用文件后缀进行判断需要使用哪种加载方式。
新增加el-bmapv-three-view，该view存在于el-bmapv-view之下，用于给所有模型提供统一的渲染，比如灯光、后期处理灯等

## Attributes

Attribute | Type | Description
---|:---:|---
autoScale | Boolean | 是否自动缩放，设置为true时模型跟着地图层级进行变化，设置为false时模型不随地图变化
scale | Number | 缩放比例，默认1
url | String | 模型的下载地址
rotate | {x: 0, y: 0, z: 0} | 旋转弧度，默认X Y Z都为0
translate | {x: 0, y: 0, z: 0} | 平移Object，默认都为0，不进行平移
up | {x: 0, y: 1, z: 0} | 这个属性由lookAt方法所使用，例如，来决定结果的朝向, 默认为{x: 0, y: 1, z: 0}
move | {smooth: false, duration: 200} | 更改模型坐标时是否进行平滑移动，默认不进行平滑移动，duration代表动画时长，该属性常用于控制车辆移动
animation | Object | 模型动画效果，具体属性见下面 [配置说明](#animation配置)
light | Array | 灯光配置，可以配置多个灯光，详细参数见下面 [灯光说明](#灯光配置)
debug | Boolean | 是否开启debug模式，debug模式下会在地图中心处创建一个X Y Z轴，用于直观展示方向
events | Object | 绑定事件，见最下[事件列表](#事件列表)
lazy | Number | 组件懒加载，默认-1，不进行懒加载，单位毫秒
visible | Boolean | 控制图层显隐，默认为true 显示图层
data | Object  | 点数据,GeoJSON格式 [配置说明](#data数据结构)
userData | Object | 用户自定义数据,
track | Object | 跟踪模型位置方法，主要用于车辆跟踪，配置该参数后会以该模型为中心模型位置改变时改变地图中心点。不可对多个目标同时设置该对象.[配置说明](#track数据结构)
tooltip | Object | 提示信息，支持传入固定提示，以及使用插槽,插槽名： tooltip，[配置参数](#tooltip配置)
infoWindow | Object | info框，使用插槽,插槽名： infoWindow，[配置参数](#infoWindow配置)

### Events

Event Name | Parameters | Description
---|---|---|
loaded | {object: object, group: group, threeLayer: threeLayer} | 该事件会在模型加载完成后触发，回调中的object为模型的Object3D对象，object中还包含动画对象animations，<br/> group为包含object的对象，实际上是通过操作group的属性来实现移动，缩放等操作，<br/> threeLayer为three图层对象，将threeLayer对象的needsUpdate属性设置为true后会自动刷新图层
click | group对象 | click事件返回的是包含模型的group对象，初始设置的userData会被设置在group上，通过操作group可以更改模型位置、也可以通过children获取模型对象
mouseover | group对象 | mouseover事件返回的是包含模型的group对象，初始设置的userData会被设置在group上，通过操作group可以更改模型位置、也可以通过children获取模型对象
mouseout | group对象 | mouseout事件返回的是包含模型的group对象，初始设置的userData会被设置在group上，通过操作group可以更改模型位置、也可以通过children获取模型对象

###v0.0.33
* 更新lodash为lodash-es，减少打包体积
* 解决GLTFThree图层触发两次init事件BUG
* 升级mapvgl至1.0.0-beta.138

###v0.0.32
* 聚合图层增加beforeRender参数，用于聚合图层自定义绘制
* 增加BarLayer图层

###v0.0.31
* 修复所有组件内offset属性错误问题

###v0.0.30
* 修复GltfThreeLayer图层的infoWindow事件失效问题
* 升级mapvgl至1.0.0-beta.133

###v0.0.29
* 修复懒加载问题，不管怎么样都处于懒加载状态

###v0.0.28
* 所有组件增加lazy属性，用于提供组件延时加载

###v0.0.27
* 升级mapvgl至1.0.0-beta.130
* 修改部分文档

###v0.0.26
  * 升级mapvgl至1.0.0-beta.126
  * 修改部分组件中的style属性，更改为effect，防止与vue的style冲突

###v0.0.25
  * 升级mapvgl至1.0.0-beta.119
  * 为所有图层增加zoomThreshold，用来指定图层执行渲染的地图层级。GltfThreeLayer图层由于特殊性，将zoomThreshold属性添加到ThreeView组件中
  * 增加QQ群，可以交流问题，群号见readme

###v0.0.24
  * GltfThreeLayer图层的infoWindow增加anchor属性,用于控制信息框的指向
  *  解决GltfThreeLayer图层销毁时报错问题
  * 升级mapvgl至1.0.0-beta.116

###v0.0.23
  * 升级threejs至0.126.1
  * 升级mapvgl至1.0.0-beta.112
  * GltfThreeLayer图层销毁时增加销毁所有对象和事件能力，释放内存
  * 解决GltfThreeLayer图层的infoWindow内容不支持点击问题

###v0.0.22
  * 解决GltfThreeLayer 模型还未加载完成时更新数据导致抛异常
  * 解决GltfThreeLayer 模型移动时infoWindow没有进行跟随问题
  * 解决GltfThreeLayer 模型隐藏后还会继续触发事件问题
  * 解决GltfThreeLayer 加载模型后模型没有显示问题
  * 解决GltfThreeLayer 不添加events属性时无法正常触发tooltip功能

###v0.0.20
  * 解决GltfThreeLayer图层的infoWindow与tooltip不停刷新问题
  * 解决触发GltfThreeLayer点击事件后还会继续触发地图click事件问题
  * CircleLayer增加unit参数
  * FanLayer增加unit参数

###v0.0.19
  * 升级mapvgl 1.0.0-beta.105版本
  * 增加MarkerListLayer图层
  * 更新所有图层API，更新文档，适配1.0.0-beta.105版本API

###v0.0.18
  * GltfThreeLayer增加track参数，用于进行车辆跟踪
  * GltfThreeLayer增加tooltip功能，支持自定义内容
  * GltfThreeLayer增加infoWindow功能

###v0.0.17
  * 解决GltfThreeLayer图层点击事件触发不稳定问题（该BUG是由于百度的threeLayer图层中修改了camera的projectionMatrix 值，但未对应的修改projectionMatrixInverse 导致的）
  * GltfThree模型增加mouseover和mouseout事件

###v0.0.16
  * 修复某些情况下加载模型报错

###v0.0.15
  * 模型增加缓存机制，提高模型加载速度
  * 调整GltfThreeLayer刷新机制，提高页面流畅度

###v0.0.15
  * 修复GltfThreeLayer加载数量过多时浏览器卡顿问题

###v0.0.14
  * 修复GltfThreeLayer初始时angle失效问题
  * GltfThreeLayer的animation的type类型增加一种self，如果类型设置为self那么将调用gltf中配置的所有animation
  * GltfThreeLayer增加click事件，返回group对象
  * 破坏性修改，修改GltfThreeLayer事件名称

###v0.0.13
  * 破坏性修改，修改GltfThreeLayer的方式，增加el-bmapv-three-view用于全局控制模型
  * 增加el-bmapv-three-view，增加全局灯光管理以及HDR功能
  * GltfThreeLayer animation参数增加unit，可以使模型按照像素或按m上下移动

###v0.0.12
  * 修复模型不自动缩放情况下没有动画问题
  * 修复模型平滑移动时页面卡顿问题

###v0.0.11
  * GltfThreeLayer图层增加visible属性，用于控制图层显隐

###v0.0.10
  * 修复模型旋转问题
  * 灯光属性修改为数组

###v0.0.9
  * 增加 el-gltf-three-layer （gltf的threejs实现图层）
  * 所有图层增加visible属性，用于控制图层显隐

###v0.0.8
  * el-bmapv-gltf-layer(gltf图层)

###v0.0.4
  * el-bmapv-honeycomb-layer (蜂窝图层 HoneycombLayer)
  
  ##mapvgl自带后处理器效果
  * 炫光特效 BloomEffect
  * 发光特效 BrightEffect

###v0.0.3
  * el-bmapv-circle-layer (圆图层 CircleLayer)
  * el-bmapv-ripple-layer (波纹点图层 RippleLayer)
  * el-bmapv-text-layer (文字图层 TextLayer)
  * el-bmapv-fan-layer (雷达图层 FanLayer)
  * el-bmapv-simple-line-layer (基础线图层 SimpleLineLayer)
  * el-bmapv-line-layer (宽线图层 LineLayer)
  * el-bmapv-wall-layer (立体墙图层 WallLayer)
  * el-bmapv-heat-line-layer (热力线图层 HeatLineLayer)
  * el-bmapv-line-flow-layer (蝌蚪线图层 LineFlowLayer)
  * el-bmapv-line-trip-layer (线轨迹图层 LineTripLayer)
  * el-bmapv-wall-trip-layer (墙轨迹图层 WallTripLayer)
  * el-bmapv-fly-line-layer (飞线图层 FlyLineLayer)
  * el-bmapv-shape-layer (基础面图层 ShapeLayer)
  * el-bmapv-shape-line-layer (线状面图层 ShapeLineLayer)
  * el-bmapv-polygon-layer (平面图层 PolygonLayer)
  * el-bmapv-cluster-layer (点聚合图层 ClusterLayer)

###v0.0.2
  * el-bmapv-icon-layer (Icon图标图层 IconLayer)
  * el-bmapv-point-trip-layer (点轨迹图层 PointTripLayer)
  * el-bmapv-heat-point-layer (热力点图层 HeatPointLayer)
  * el-bmapv-heat-map-layer (热点图图层 HeatmapLayer)
  * el-bmapv-heat-grid-layer (热力柱图层 HeatGridLayer)
  * el-bmapv-spark-layer (烟花点图层 SparkLayer)


###V0.0.1
  初始化第一个版本，完成：
  * mapvgl-view (图层管理器，图层的容器)
  * mapvgl-point-layer (基础点图层 PointLayer)


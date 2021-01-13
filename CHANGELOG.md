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


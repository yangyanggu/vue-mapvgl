# GltfThree图层
使用ThreeJS加载模型，目前支持加载gltf文件、glb文件和threejs导出的json文件，当前使用文件后缀进行判断需要使用哪种加载方式。
新增加el-bmapv-three-view，该view存在于el-bmapv-view之下，用于给所有模型提供统一的渲染，比如灯光、后期处理灯等

## 已知问题
当同一个view图层中存在两种不同的文件格式会导致显示混乱，所以尽量全部用同一个文件格式，如果必须不同，则使用不同的el-bmapv-view进行隔离

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view>
            <el-bmapv-three-view :lights="light" :hdr="hdrOptions" :events="{click: (e) => {clickGltf(e)}}">
              <el-bmapv-gltf-three-layer :visible="visible" :user-data="{a:1}" :auto-scale="true" :animation="animation" :scale="200" :move="moveOption" url="./assets/gltf/car4.gltf" :up="{x: 0, y:-1, z:0}" :data="data" :events="{loaded: (e) => {},click: (e) => {console.log(e)}}"></el-bmapv-gltf-three-layer>
              <el-bmapv-gltf-three-layer :auto-scale="true" :scale="30" url="./assets/gltf/sgyj_point_animation.gltf" :animation="{type: 'self'}" :up="{x: 0, y:-1, z:0}" :data="animationData"></el-bmapv-gltf-three-layer>
            </el-bmapv-three-view>
        </el-bmapv-view>
      </el-bmap>
      <div>
        <button @click="startMove">启动移动</button>
        <button @click="stopMove">停止移动</button>
        <button @click="switchVisible">切换显隐</button>
      </div>
    </div>
  </template>

  <style>
    .bmap-demo {
      height: 300px;
    }
  </style>

  <script>

    module.exports = {
      name: 'bmap-page',
      data() {
        
        return {
          timer: null,
          zoom: 18,
          center: [121.5273285, 31.21515044],
          moveOption: {
            smooth: true
          },
          animation: {
            type: 'liner'
          },
          data: {
              geometry: {
                  type: 'Point',
                  coordinates: [121.5273285, 31.21515044],
              },
              angle: 0
          },
          animationData: {
              geometry: {
                  type: 'Point',
                  coordinates: [121.5253285, 31.21515044],
              },
              angle: 0
          },
          light: [{
            type: 'AmbientLight',
            args: ['#8bffed', 0.6]
          }],
          hdrOptions: {
            urls: [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
            path: './assets/hdr/'
          },
          visible: true,
          clock: new VueMapvgl.THREE.Clock(),
          testAnimations: null
        };
      },
      mounted(){
      },
      methods: {
        switchVisible(){
          this.visible = !this.visible;
        },
        clickGltf(e){
          console.log(e);
        },
        startMove(){
          this.timer = setTimeout(() => {
            let data = JSON.parse(JSON.stringify(this.data));
            let coordinates = data.geometry.coordinates;
            coordinates[0] = coordinates[0]+0.00001;
            this.data = data;
            this.startMove();
          },200)
        },
        stopMove(){
          clearTimeout(this.timer);
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|:---:|---
autoScale | Boolean | 是否自动缩放，设置为true时模型跟着地图层级进行变化，设置为false时模型不随地图变化
scale | Number | 缩放比例，默认1 
url | String | 模型的下载地址
rotate | {x: 0, y: 0, z: 0} | 旋转弧度，默认X Y Z都为0
translate | {x: 0, y: 0, z: 0} | 平移Object，默认都为0，不进行平移
up | {x: 0, y: 1, z: 0} | 这个属性由lookAt方法所使用，例如，来决定结果的朝向, 默认为{x: 0, y: 1, z: 0}
move | {smooth: false, duration: 200} | 更改模型坐标时是否进行平滑移动，默认不进行平滑移动，duration代表动画时长，该属性常用于控制车辆移动
animation | Object | 模型动画效果，具体属性见下面
light | Array | 灯光配置，可以配置多个灯光，详细参数见下面灯光说明
events | Object | 绑定事件，见最下事件列表


### animation配置
```html
{
  type: 'none', // 动画类型，目前支持liner(往返直线运动)、self（调用模型本身设置的动画，类型为self时其他参数不可用） ,默认为none
  unit: 'px', // 移动单位，默认按像素移动，不同比例尺下移动距离基本一致。可选值 px 或  m
  options: {
    offset: {
      x: 0,
      y: 0,
      z: 20
    },// 偏移当前位置多少
    duration: 2000, //动画持续时间，针对于liner持续时间指的是单独向上移动和向下移动
    delay: 0 //延迟多久执行动画
  }
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


## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 控制图层显隐，默认为true 显示图层
data | Object  | 点数据,GeoJSON格式
userData | Object | 用户自定义数据
                         
### data数据结构
```
{
    geometry: {
     type: 'Point',
     coordinates: [116.392394, 39.910683]
    },
    angle: 0
}
```

## ref可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | GltfThreeLayer | 获取`GltfThreeLayer`实例

## 事件列表（需要在events中配置）
目前提供了模型加载完成的事件
```html
{
  loaded: (e)=>{},
  click: (e)=>{}
}
```

事件名称 | 回调值 | 说明 
---|---|---|
loaded | {object: object,threeLayer: threeLayer} | 该事件会在模型加载完成后触发，回调中的object为模型的Object3D对象，object中还包含动画对象animations，threeLayer为three图层对象
click | group对象 | click事件返回的是包含模型的group对象，初始设置的userData会被设置在group上，通过操作group可以更改模型位置、也可以通过children获取模型对象

<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-three-view
          :lights="light"
          :hdr="hdrOptions"
          :debug="true"
        >
          <el-bmapv-gltf-three-layer
            :visible="visible"
            :info-window="infoWindow"
            :track="data.track"
            :user-data="{a:1}"
            :auto-scale="true"
            :animation="animation"
            :scale="50"
            :move="moveOption"
            url="/gltf/car4.gltf"
            :up="{x: 0, y:-1, z:0}"
            :data="data"
            @click="clickCar"
            @loaded="initGltf"
          >
            <template #tooltip>
              <div>{{ tooltip }}</div>
            </template>
            <template #infoWindow>
              <div style="background: #fff;padding: 10px 20px;">
                <button @click="clickButton">
                  测试点击
                </button>
                <span>{{ infoWindow.content }}</span>
              </div>
            </template>
          </el-bmapv-gltf-three-layer>
          <el-bmapv-gltf-three-layer
            v-for="(item,index) in animationData"
            :key="index"
            :auto-scale="true"
            :scale="30"
            url="/gltf/sgyj_point_animation.gltf"
            :animation="{type: 'self'}"
            :up="{x: 0, y:-1, z:0}"
            :data="item"
          />
        </el-bmapv-three-view>
      </el-bmapv-view>
    </el-bmap>
    <div class="control-container">
      <el-button @click="switchVisible">
        {{ visible ? '隐藏图层' : '显示图层' }}
      </el-button>
      <el-button @click="startMove">
        启动移动
      </el-button>
      <el-button @click="stopMove">
        停止移动
      </el-button>
      <el-button @click="changeTooltip">
        修改tooltip内容
      </el-button>
      <el-button @click="changeInfoWindowContent">
        修改infoWindow内容
      </el-button>
      <el-button @click="switchInfoWindow">
        切换infoWindow显隐
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElBmapvView from "@vue-map/packages/View/View.vue";
import ElBmapvThreeView from "@vue-map/packages/ThreeView/ThreeView.vue";
import ElBmapvGltfThreeLayer from "@vue-map/packages/GltfThreeLayer/GltfThreeLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvGltfThreeLayer,
    ElBmapvThreeView,
    ElBmapvView
  },
  data(){
    return {
      zoom: 15,
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
        angle: 0,
        track: {
          focus: false,
          tilt: 45,
          zoom: 20,
          offsetHeading: 45
        }
      },
      animationData: [] as any,
      light: [{
        type: 'AmbientLight',
        args: ['#8bffed', 0.6]
      }],
      hdrOptions: {
        urls: [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ],
        path: '/hdr/'
      },
      visible: true,
      testAnimations: null,
      infoWindow: {
        visible: false,
        content: '测试InfoWindow',
        anchor: 'right'
      },
      tooltip: 'hello world',
      timer: null as any,
    }
  },
  mounted(){
    this.createData();
  },
  methods: {
    switchVisible(){
      this.visible = !this.visible;
    },
    createData(){
      this.animationData = [{
        geometry: {
          type: 'Point',
          coordinates: [121.5253285, 31.21515044],
        },
        angle: 0
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5233285, 31.21515044],
        },
        angle: 0
      }];
    },
    initGltf(e){
      console.log('uuid: ', e.group.uuid);
    },
    clickCar(group){
      this.infoWindow.visible = true;
      console.log('点击模型： ',group);
      this.data.track.focus = true
    },
    startMove(){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const data = JSON.parse(JSON.stringify(this.data));
        const coordinates = data.geometry.coordinates;
        coordinates[0] = coordinates[0]+0.00001;
        this.data = data;
        this.infoWindow.content = `${new Date().getTime()  }`;
        this.startMove();
      },200)
    },
    stopMove(){
      clearTimeout(this.timer);
    },
    changeTooltip(){
      this.tooltip = `hello world,${new Date()}`;
    },
    changeInfoWindowContent(){
      this.infoWindow.content = `changeInfoWindowContent,${new Date()}`;
    },
    switchInfoWindow(){
      this.infoWindow.visible = !this.infoWindow.visible;
    },
    clickButton(){
      console.log('点击信息弹出框');
    }
  }
})
</script>

<style scoped>
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container{
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 11;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>

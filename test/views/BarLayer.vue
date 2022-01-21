<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-bar-layer
          type="light"
          :data="data"
          :edge-count="50"
          :size="200"
          @init="initLayer"
        />
      </el-bmapv-view>
    </el-bmap>
    <div class="control-container">
      <el-button @click="switchVisible">
        {{ visible ? '隐藏图层' : '显示图层' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElBmapvView from "@vue-map/packages/View/View.vue";
import ElBmapvBarLayer from "@vue-map/packages/BarLayer/BarLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvBarLayer,
    ElBmapvView
  },
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      visible: true,
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        height: 100
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5473285, 31.21515044],
        },
        height: 300
      }]
    }
  },
  methods: {
    switchVisible(){
      this.visible = !this.visible;
    },
    initLayer(layer){
      console.log('init: ', layer)
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

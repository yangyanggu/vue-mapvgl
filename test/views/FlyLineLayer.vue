<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-fly-line-layer
          :visible="visible"
          :color="color"
          :texture-color="'#000'"
          :texture-width="40"
          :data="data"
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
import ElBmapvFlyLineLayer from "@vue-map/packages/FlyLineLayer/FlyLineLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvFlyLineLayer,
    ElBmapvView
  },
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      visible: true,
      color: 'rgba(232,33,242,1)',
      data: [{
        geometry: {
          type: 'LineString',
          coordinates: [
            [121.5273285, 31.21515044],
            [121.5673285, 31.21515044],
            [121.5673285, 31.15515044]
          ],
        },
        properties: {
        },
      }]
    }
  },
  methods: {
    switchVisible(){
      this.visible = !this.visible;
    },
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

<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-marker-list-layer
          :visible="visible"
          :data="data"
          :enable-picked="true"
          :on-click="clickLayer"
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
import ElBmapvMarkerListLayer from "@vue-map/packages/MarkerListLayer/MarkerListLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvMarkerListLayer,
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
        properties: {
          text: 'hello',
          fillSize: 50,
          shadowSize: 100
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5473285, 31.21515044],
        },
        properties: {
          text: 'world',
          fillSize: 50,
          shadowSize: 100
        }
      }],
    }
  },
  methods: {
    switchVisible(){
      this.visible = !this.visible;
    },
    clickLayer(e){
      console.log('click layer: ', e)
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

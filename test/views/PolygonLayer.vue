<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-polygon-layer
          :visible="visible"
          :line-join="lineJoin"
          :line-width="4"
          :line-color="lineColor"
          :color="color"
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
import ElBmapvPolygonLayer from "@vue-map/packages/PolygonLayer/PolygonLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvPolygonLayer,
    ElBmapvView
  },
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      visible: true,
      color: 'rgba(50, 50, 200, 1)',
      lineColor: 'rgba(250, 250, 25, 0.6)',
      lineJoin: 'miter',
      data: [{
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [121.5273285, 31.21515044],
              [121.5373285, 31.21515044],
              [121.5373285, 31.22515044],
              [121.5273285, 31.22515044]
            ]
          ],
        },
        properties: {
          height: 0
        }
      }]
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

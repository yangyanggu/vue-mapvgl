<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-spark-layer
          :visible="visible"
          :color="color"
          :height="height"
          :step="0.01"
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
import ElBmapvSparkLayer from "@vue-map/packages/SparkLayer/SparkLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvSparkLayer,
    ElBmapvView
  },
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      visible: true,
      color: 'rgb(255, 153, 51)',
      height(data: any){
        return (data.properties.height || 0 ) as number;
      },
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          height: 3000
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5373285, 31.21515044],
        },
        properties: {
          height: 5000
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

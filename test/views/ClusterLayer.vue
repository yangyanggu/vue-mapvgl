<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-cluster-layer
          :visible="visible"
          :data="data"
          :enable-picked="true"
          :auto-select="true"
          :on-click="clickLayer"
        />
        <el-bmapv-circle-layer
          :size="200"
          unit="m"
          :data="barData"
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
import ElBmapvClusterLayer from "@vue-map/packages/ClusterLayer/ClusterLayer.vue";
import ElBmapvCircleLayer from "@vue-map/packages/CircleLayer/CircleLayer.vue";

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvCircleLayer,
    ElBmapvClusterLayer,
    ElBmapvView
  },
  data(){
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      visible: true,
      barData: [],
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          icon: '/position3.png',
          width: 20,
          height: 20
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          icon: '/position2.png',
          width: 20,
          height: 20
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
    },
    beforeRender(data){
      const points = [] as any;
      data.forEach(item => {
        points.push({
          geometry: item.geometry,
          size: (item.properties.point_count || 1) * 100,
          color: item.properties.color
        })
      });
      this.barData = points;
      return false;
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

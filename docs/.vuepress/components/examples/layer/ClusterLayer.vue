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
  </div>
  <div class="control-container">
    <button @click="switchVisible">
      {{ visible ? '隐藏图层' : '显示图层' }}
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Map",
  components: {
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
          icon: '/images/position3.png',
          width: 20,
          height: 20
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          icon: '/images/position2.png',
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


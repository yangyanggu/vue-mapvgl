<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-heat-point-layer
          :visible="visible"
          :gradient="gradient"
          :data="data"
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
      gradient: {
        0.0: 'rgb(50, 50, 256)',
        0.1: 'rgb(50, 250, 56)',
        0.5: 'rgb(250, 250, 56)',
        1.0: 'rgb(250, 50, 56)'
      },
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          count: 2
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5373285, 31.21515044],
        },
        properties: {
          count: 49
        }
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



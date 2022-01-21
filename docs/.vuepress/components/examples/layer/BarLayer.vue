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



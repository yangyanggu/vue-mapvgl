<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view :effects="effects">
        <el-bmapv-bar-layer
          :visible="visible"
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
import {effect} from 'vue-mapvgl'

export default defineComponent({
  name: "Map",
  components: {
  },
  data(){
    let brightEffect = new effect.BrightEffect({
      threshold: 0.2,
      blurSize: 2.0,
      clarity: 0.8
    });
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      visible: true,
      effects: [brightEffect],
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



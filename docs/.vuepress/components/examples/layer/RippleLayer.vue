<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-ripple-layer
          :visible="visible"
          :size="size"
          :color="color"
          :data="data"
          :enable-picked="true"
          :on-click="clickLayer"
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
      color: '#ffffff',
      size: 100,
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          size: 300,
          color: 'red'
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5373285, 31.21515044],
        },
        properties: {
          size: 400,
          color: 'green'
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5573285, 31.21515044],
        },
        properties: {
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



<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-icon-layer
          :visible="visible"
          :icon="icon"
          :width="width"
          :height="height"
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
      icon: '/images/position1.png',
      width: 24,
      height: 40,
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          icon: '/images/position1.png'
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5473285, 31.21515044],
        },
        properties: {
          icon: '/images/position2.png'
        }
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5673285, 31.21515044],
        },
        properties: {
          icon: '/images/position3.png'
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



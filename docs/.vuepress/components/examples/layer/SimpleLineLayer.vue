<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-simple-line-layer
          :visible="visible"
          :color="color"
          :blend="blend"
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
      color: 'rgba(50, 50, 200, 1)',
      blend: 'lighter',
      data: [{
        geometry: {
          type: 'LineString',
          coordinates: [
            [121.5273285, 31.21515044],
            [121.5473285, 31.21515044]
          ],
        },
        properties: {
          color: 'green'
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



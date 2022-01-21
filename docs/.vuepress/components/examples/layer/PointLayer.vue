<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-point-layer
          :visible="visible"
          :color="color"
          :shape="shape"
          :blend="blend"
          :size="size"
          :data="data"
          :enable-picked="true"
          :auto-select="true"
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
      color: 'rgba(50, 50, 200, 1)',
      shape: 'circle', // 默认为圆形 circle ，可传 square 改为正方形
      blend: 'lighter',
      size: 60,
      data: [{
        geometry: {
          type: 'POINT',
          coordinates: [121.5273285, 31.21515044],
        },
        properties: {
          id: '1'
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



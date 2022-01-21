<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
        <el-bmapv-circle-layer
          :lazy="2000"
          :zoom-threshold="[0,30]"
          :visible="visible"
          unit="px"
          :type="type"
          :size="30"
          :radius="radius"
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
      type: 'bubble',
      radius(size){
        return size * 2;
      },
      data: [{
        geometry: {
          type: 'Point',
          coordinates: [121.5273285, 31.21515044],
        },
        size: 30,
        color: 'red'
      },{
        geometry: {
          type: 'Point',
          coordinates: [121.5373285, 31.21515044],
        },
        size: 40,
        color: 'green'
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

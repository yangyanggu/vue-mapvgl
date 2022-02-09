<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
    >
      <el-bmapv-view>
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

<script lang="ts" setup>
import {ref} from "vue";
const zoom = ref(15);
const center = ref([121.5273285, 31.21515044]);
const visible = ref(true);
const data = ref([{
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
}]);

const switchVisible = () => {
  visible.value = !visible.value;
}

const initLayer = (layer) => {
  console.log('init: ', layer)
}
</script>



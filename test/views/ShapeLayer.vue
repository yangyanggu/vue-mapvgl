<template>
  <div class="map-container">
    <el-bmap
      :center="center"
      :zoom="zoom"
      :tilt="75"
      @init="initMap"
    >
      <el-bmapv-view>
        <el-bmapv-shape-layer
          :visible="visible"
          :ripple-layer="rippleLayer"
          texture="/out.png"
          :texture-scale="0.0001"
          :is-texture-full="true"
          :rise-time="2000"
          effect="ripple"
          :color="color"
          :blend="blend"
          :data="data"
        />
      </el-bmapv-view>
    </el-bmap>
    <div class="control-container">
      <el-button @click="switchVisible">
        {{ visible ? '隐藏图层' : '显示图层' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ElBmapvView from "@vue-map/packages/View/View.vue";
import ElBmapvShapeLayer from "@vue-map/packages/ShapeLayer/ShapeLayer.vue";
import {mapvgl} from '@vue-map/packages/index'

export default defineComponent({
  name: "Map",
  components: {
    ElBmapvShapeLayer,
    ElBmapvView
  },
  data(){
    const rippleLayer = new mapvgl.GroundRippleLayer({
      size: 20,
      opacity: 0.0,
      segs: 100,
      scale: 10,
      speed: 6,
      color: [245 / 255, 35 / 255, 35 / 255, 1]
    });
    return {
      zoom: 15,
      center: [106.542353,29.565448],
      visible: true,
      color: 'rgba(50, 50, 200, 1)',
      blend: 'lighter',
      rippleLayer,
      data: [{
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [121.5273285, 31.21515044],
              [121.5373285, 31.21515044],
              [121.5373285, 31.22515044],
              [121.5273285, 31.22515044]
            ]
          ],
        },
        properties: {
          height: 1000,
          color: 'green'
        }
      }]
    }
  },
  mounted(){
    fetch('/json/chongqing.json').then( (rs) => {
      return rs.json();
    }).then( (rs) => {
      const data = rs;
      const polygons = [] as any;
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const line = data[i];
        const polygon = [] as any;
        const pt = [line[1] * 512, line[2] * 512] as [number, number];
        for (let j = 3; j < line.length; j += 2) {
          pt[0] += (line[j] / 100 / 2) as any;
          pt[1] += line[j + 1] / 100 / 2;
          polygon.push([pt[0], pt[1]]);
        }

        polygons.push({
          geometry: {
            type: 'Polygon',
            coordinates: [polygon]
          },
          properties: {
            height: line[0] / 2
          }
        });
      }

      this.data = polygons;

    });
  },
  methods: {
    initMap(map){
      const point = new (BMapGL as any).Point(106.542353,29.565448);
      const data = [{
        geometry: {type: 'Point', coordinates: [point.lng, point.lat]}
      }];
      this.rippleLayer.setData(data);
    },
    switchVisible(){
      this.visible = !this.visible;
    },
    clickLayer(e){
      console.log('click layer: ', e)
    }
  }
})
</script>

<style scoped>
.map-container{
  width: 100%;
  height: 100%;
  position: relative;
}
.control-container{
  position: absolute;
  padding: 24px;
  background: #ffffff;
  z-index: 11;
  bottom: 40px;
  left: 150px;
  right: 150px;
}
</style>

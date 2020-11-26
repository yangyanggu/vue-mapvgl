# 炫光特效
发光后处理特效，也可以用作炫光效果

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view :effects="effects">
            <el-bmapv-circle-layer :type="type" :size="10" :radius="radius" :data="data"></el-bmapv-circle-layer>
        </el-bmapv-view>
      </el-bmap>
    </div>
  </template>

  <style>
    .bmap-demo {
      height: 300px;
    }
  </style>

  <script>
    //import方式
    // import {effect} from 'vue-mapvgl'
    
    //CDN方式
    let brightEffect = new VueMapvgl.effect.BrightEffect({
            threshold: 0.2,
            blurSize: 2.0,
            clarity: 0.8
        });
  
    module.exports = {
      name: 'bmap-page',
      data() {
        
        return {
          count: 1,
          zoom: 14,
          center: [121.5273285, 31.21515044],
          effects: [brightEffect],
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
        };
      },
      mounted(){
      },
      methods: {
      }
    };
  </script>

</script>


## 静态属性
该对象只可通过View组件的effects属性来使用，可以参考示例使用

名称 | 类型 | 说明
---|:---:|---
threshold | Number | 发光门槛阈值，范围0.0~1.0，值越低发光效果越亮. 默认值：0.0
blurSize | Number | 模糊值半径，默认2，是原图形半径的2倍. 默认值：2.0
clarity | Number | 清晰度，范围0.0~1.0. 默认值：1.0

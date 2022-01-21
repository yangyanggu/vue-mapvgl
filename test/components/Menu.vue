<template>
  <div class="menu-container">
    <el-menu
      :default-active="defaultPath"
      :router="true"
    >
      <el-menu-item
        v-for="item in menus"
        :key="item.path"
        :index="item.path"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Menu",
  data() {
    return {
      defaultPath: '/',
      menus: [
        {
          path: '/',
          name: '柱状图'
        },
        {
          path: '/circle',
          name: '圆图层'
        },
        {
          path: '/cluster',
          name: '聚合图层'
        },
        {
          path: '/fan',
          name: '雷达图层'
        },
        {
          path: '/flyLine',
          name: '飞线图层'
        },
        {
          path: '/gltf',
          name: 'GLTF图层'
        },
        {
          path: '/heatGrid',
          name: '热力柱图层'
        },
        {
          path: '/heatLine',
          name: '热力线图层'
        },
        {
          path: '/heatMap',
          name: '热力图图层'
        },
        {
          path: '/heatPoint',
          name: '热力点图层'
        },
        {
          path: '/honeycomb',
          name: '蜂窝图层'
        },
        {
          path: '/icon',
          name: '图标图层'
        },
        {
          path: '/lineFlow',
          name: '蝌蚪线图层'
        },
        {
          path: '/line',
          name: '线图层'
        },
        {
          path: '/lineTrip',
          name: '线轨迹图层'
        },
        {
          path: '/markerList',
          name: '标注点集合图层'
        },
        {
          path: '/point',
          name: '基础点图层'
        },
        {
          path: '/pointTrip',
          name: '点轨迹图层'
        },
        {
          path: '/polygon',
          name: '面图层'
        },
        {
          path: '/ripple',
          name: '波纹点图层'
        },
        {
          path: '/shape',
          name: '面图层'
        },
        {
          path: '/shapeLine',
          name: '面线图层'
        },
        {
          path: '/simpleLine',
          name: '简单线图层'
        },
        {
          path: '/spark',
          name: '烟花点图层'
        },
        {
          path: '/text',
          name: '文本图层'
        },
        {
          path: '/wall',
          name: '立体墙图层'
        },
        {
          path: '/wallTrip',
          name: '墙轨迹图层'
        },
        {
          path: '/gltfThree',
          name: 'GLTF THREE图层'
        },
      ]
    }
  },
  beforeCreate() {
    this.defaultPath = this.$route.path;
  }
})
</script>

<style scoped>
.menu-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>

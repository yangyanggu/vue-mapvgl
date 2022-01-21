<template>
  <slot />
</template>
<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min.js';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvView',
  mixins: [registerMixin],
  props: {
    mapType: {
      validator: (value: string) => ['bmap', 'blank', 'cesium', 'three'].includes(value)
    },
    effects: {
      type: Array
    },
  },

  data() {
    return {
      converters: {
      },
    };
  },
  computed: {
  },

  unmounted() {
    if (this.$amapComponent) {
      this.$amapComponent.removeAllLayers();
      this.$amapComponent.destroy();
      this.$amapComponent = null;
    }
  },
  methods: {
    __initComponent(options) {
      options.map = this.$parentComponent;
      this.$amapComponent = new mapvgl.View(options);
      // this.$amapComponent.startAnimation();
    },
    __visible(flag) {
      flag === true ? this.$amapComponent.show() : this.$amapComponent.hide();
    }
  },
});
</script>

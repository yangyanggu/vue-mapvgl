<template>
  <div ref="tooltip">
    <slot name="tooltip" />
  </div>
  <div ref="infoWindow">
    <slot name="infoWindow" />
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../mixins/register-component';
import GltfThreeLayer from '../../ext/GltfThreeLayer';

export default defineComponent({
  name: 'ElBmapvGltfThreeLayer',
  mixins: [registerMixin],
  props: {
    url: {
      type: String,
      required: true
    },
    autoScale: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number
    },
    rotate: {
      type: Object
    },
    translate: {
      type: Object
    },
    up: {
      type: Object
    },
    move: {
      type: Object
    },
    animation: {
      type: Object
    },
    light: {
      type: Array
    },
    visible: {
      type: Boolean,
      default: true
    },
    userData: {
      type: Object
    },
    track: {
      type: Object
    },
    tooltip: {
      type: Object
    },
    infoWindow: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      converters: {
      },
    };
  },
  unmounted() {
    if (this.$amapComponent) {
      this.$amapComponent.remove();
      this.$amapComponent = null;
    }
  },
  methods: {
    __initComponent(options) {
      options.view = this.$parentComponent;
      this.$amapComponent = new GltfThreeLayer(options);
      if (this.$slots.tooltip && this.$slots.tooltip()) {
        this.$amapComponent.addOrUpdateTooltip({
          content: this.$refs.tooltip,
          isCustom: true
        });
      } else {
        this.$amapComponent.addOrUpdateTooltip();
      }
      if (this.$slots.infoWindow && this.$slots.infoWindow()) {
        this.$amapComponent.addOrUpdateInfoWindow({
          ele: this.$refs.infoWindow
        });
      } else {
        this.$amapComponent.addOrUpdateInfoWindow();
      }
    },
    __data(value) {
      this.$amapComponent.move(value);
    },
    __visible(flag) {
      if (flag === false) {
        this.$amapComponent.hide();
      } else {
        this.$amapComponent.show();
      }
    },
    __userData(value) {
      this.$amapComponent.setUserData(value);
    },
    __track(value) {
      this.$amapComponent.setTrack(value);
    },
    __tooltip(value) {
      this.$amapComponent.addOrUpdateTooltip(value);
    },
    __infoWindow(value) {
      this.$amapComponent.addOrUpdateInfoWindow({
        visible: value.visible
      });
    }
  },
});
</script>

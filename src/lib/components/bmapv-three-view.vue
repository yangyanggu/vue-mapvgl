<template>
  <div><slot /></div>
</template>
<script>
import registerMixin from '../mixins/register-component';
import CONST from '../utils/constant';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');
import {createLight, createHDR} from '../utils/threeUtil';

export default {
  name: 'el-bmapv-three-view',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    lights: {
      type: Array
    },
    hdr: {
      type: Object
    },
    events: {
      type: Object
    }
  },
  computed: {
  },

  data() {
    return {
      converters: {
      },
      handlers: {
        visible() {

        }
      }
    };
  },

  mounted() {
  },
  methods: {
    __initComponent(options) {
      this.$view = options.view;
      let threeLayer = new mapvglThree.ThreeLayer({
        enabledPointOffset: false,
        webglLayer: options.view.webglLayer
      });
      this.$bmapComponent = threeLayer;
      threeLayer.$view = options.view;
      options.view.addLayer(threeLayer);
      if (options.lights) {
        createLight(options.lights, threeLayer.getWorld());
      }
      if (options.hdr) {
        createHDR(options.hdr, threeLayer);
      }
      if (this.events && this.events.init) this.events.init(this.$bmapComponent);
      this.$children.forEach(component => {
        component.$emit(CONST.MAPV_VIEW_READY_EVENT, this.$bmapComponent);
      });

    }
  },
  destroyed() {
    this.$bmapComponent && this.$bmapComponent.destroy();
  }
};
</script>

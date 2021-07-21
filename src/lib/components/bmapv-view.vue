<template>
  <div><slot /></div>
</template>
<script>
import registerMixin from '../mixins/register-component';
import CONST from '../utils/constant';
const mapvgl = require('mapvgl');
export default {
  name: 'el-bmapv-view',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    mapType: {
      validator: (value) => {
        return ['bmap', 'blank', 'cesium'].indexOf(value) !== -1 || !value;
      }
    },
    effects: {
      type: Array
    },
    visible: {
      type: Boolean
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
        visible(flag) {
          flag === true ? this.show() : this.hide();
        }
      }
    };
  },

  mounted() {
    this.$on(CONST.BMAP_READY_EVENT, map => {
      this.createView(map);
    });
  },
  methods: {
    createView(map) {
      if (!map) {
        return;
      }
      let options = this.convertProps();
      options.map = map;
      this.$bmapComponent = this.$view = new mapvgl.View(options);
      // this.$bmapComponent.startAnimation();
      if (this.events && this.events.init) this.events.init(this.$bmapComponent);
      this.$children.forEach(component => {
        component.$emit(CONST.MAPV_VIEW_READY_EVENT, this.$bmapComponent);
      });
    }
  },
  destroyed() {
    if (this.$bmapComponent) {
      this.$bmapComponent.removeAllLayers();
      this.$bmapComponent.destroy();
      this.$bmapComponent = this.$view = null;
    }
  }
};
</script>

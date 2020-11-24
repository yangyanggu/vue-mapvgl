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
      this.$bmapComponent = new mapvgl.View(options);
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

<style lang="less">

</style>

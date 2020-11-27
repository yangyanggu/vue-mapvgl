<script>
import registerMixin from '../mixins/register-component';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-honeycomb-layer',
  mixins: [registerMixin],
  props: [
    'size',
    'height',
    'enableCluster',
    'showText',
    'maxZoom',
    'minZoom',
    'gradient',
    'textOptions',
    'data'
  ],
  data() {
    return {
      propsRedirect: {
      },
      converters: {
      },
      handlers: {
        data(value) {
          this.setData(value);
        }
      }
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new mapvgl.HoneycombLayer(options);
      this.$view.addLayer(this.$bmapComponent);
    }
  },
  destroyed() {
    if (this.$bmapComponent && this.$view) {
      this.$view.removeLayer(this.$bmapComponent);
    }
  }
};
</script>

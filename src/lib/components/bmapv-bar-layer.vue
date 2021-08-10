<script>
import registerMixin from '../mixins/register-component';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-bar-layer',
  mixins: [registerMixin],
  props: [
    'type',
    'color',
    'size',
    'height',
    'unit',
    'edgeCount',
    'data'
  ],
  data() {
    return {
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
      delete options.view;
      this.$bmapComponent = new mapvgl.BarLayer(options);
      this.$view.addLayer(this.$bmapComponent);
    }
  },
  destroyed() {
    if (this.$bmapComponent && this.$view) {
      this.$view.removeLayer(this.$bmapComponent);
      this.$bmapComponent = null;
      this.$view = null;
    }
  },
  render() {
    return null;
  }
};
</script>

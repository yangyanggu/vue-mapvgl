<script>
import registerMixin from '../mixins/register-component';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');

export default {
  name: 'el-bmapv-fan-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'size',
    'unit',
    'step',
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
      this.$bmapComponent = new mapvglThree.FanLayer(options);
      this.$view.addLayer(this.$bmapComponent);
    }
  },
  destroyed() {
    if (this.$bmapComponent && this.$view) {
      this.$view.removeLayer(this.$bmapComponent);
    }
  },
  render() {
    return null;
  }
};
</script>

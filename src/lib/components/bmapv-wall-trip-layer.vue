<script>
import registerMixin from '../mixins/register-component';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-wall-trip-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'gradient',
    'height',
    'startTime',
    'endTime',
    'step',
    'trailLength',
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
      this.$bmapComponent = new mapvgl.WallTripLayer(options);
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

<script>
import registerMixin from '../mixins/register-component';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');

export default {
  name: 'el-bmapv-fly-line-layer',
  mixins: [registerMixin],
  props: [
    'style',
    'color',
    'textureColor',
    'textureWidth',
    'textureLength',
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
      console.log(options);
      this.$bmapComponent = new mapvglThree.FlyLineLayer(options);
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

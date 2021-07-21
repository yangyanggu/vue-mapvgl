<script>
import registerMixin from '../mixins/register-component';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');

export default {
  name: 'el-bmapv-fly-line-layer',
  mixins: [registerMixin],
  props: [
    'effect',
    'color',
    'textureColor',
    'textureWidth',
    'textureLength',
    'step',
    'data'
  ],
  data() {
    return {
      propsRedirect: {
        effect: 'style'
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
      this.$bmapComponent = new mapvglThree.FlyLineLayer(options);
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

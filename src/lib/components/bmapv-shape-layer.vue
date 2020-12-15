<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-shape-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'opacity',
    'texture',
    'isTextureFull',
    'textureScale',
    'topColor',
    'blend',
    'riseTime',
    'effect',
    'rippleLayer',
    'data',
    ...pickMixin.props
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
        },
        ...pickMixin.handlers
      }
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new mapvgl.ShapeLayer(options);
      this.$view.addLayer(this.$bmapComponent);
      if (options.style === 'ripple' && options.rippleLayer) {
        this.$view.addLayer(options.rippleLayer);
      }
    },
    ...pickMixin.methods
  },
  destroyed() {
    if (this.$bmapComponent && this.$view) {
      this.$view.removeLayer(this.$bmapComponent);
    }
    if (this.rippleLayer) {
      this.$view.removeLayer(this.rippleLayer);
    }
  },
  render() {
    return null;
  }
};
</script>

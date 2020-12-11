<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-line-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'blend',
    'width',
    'dashArray',
    'dashOffset',
    'lineCap',
    'lineJoin',
    'miterLimit',
    'antialias',
    'offset',
    'animation',
    'interval',
    'duration',
    'trailLength',
    'minZoom',
    'maxZoom',
    'mapStyle',
    'styleOptions',
    'data',
    ...pickMixin.props
  ],
  data() {
    return {
      propsRedirect: {
        mapStyle: 'style'
      },
      converters: {
      },
      handlers: {
        dashOffset(value) {
          this.setOptions({
            dashOffset: value
          });
        },
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
      console.log(options);
      this.$bmapComponent = new mapvgl.LineLayer(options);
      this.$view.addLayer(this.$bmapComponent);
    },
    ...pickMixin.methods
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

<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-line-flow-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'blend',
    'width',
    'interval',
    'duration',
    'trailLength',
    'minZoom',
    'maxZoom',
    'data',
    ...pickMixin.props
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
        },
        ...pickMixin.handlers
      }
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new mapvgl.LineFlowLayer(options);
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

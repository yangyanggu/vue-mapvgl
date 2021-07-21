<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-icon-layer',
  mixins: [registerMixin],
  props: [
    'icon',
    'width',
    'height',
    'unit',
    'scale',
    'angle',
    'flat',
    'offset',
    'padding',
    'data',
    ...pickMixin.props
  ],
  data() {
    return {
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
      this.$bmapComponent = new mapvgl.IconLayer(options);
      this.$view.addLayer(this.$bmapComponent);
    },
    ...pickMixin.methods
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

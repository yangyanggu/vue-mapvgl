<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-marker-list-layer',
  mixins: [registerMixin],
  props: [
    'fillColor',
    'fillSize',
    'fillBorderColor',
    'fillBorderWidth',
    'shadowColor',
    'shadowSize',
    'shadowBorderColor',
    'shadowBorderWidth',
    'fontColor',
    'fontSize',
    'fontFamily',
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
      this.$bmapComponent = new mapvgl.MarkerListLayer(options);
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

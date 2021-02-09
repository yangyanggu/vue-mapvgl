<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-text-layer',
  mixins: [registerMixin],
  props: [
    'fontFamily',
    'color',
    'fontSize',
    'unit',
    'angle',
    'flat',
    'collides',
    'offset',
    'padding',
    'margin',
    'data',
    ...pickMixin.props
  ],
  data() {
    return {
      converters: {
        offset(value) {
          return value;
        }
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
      console.log('text layer options: ', options);
      this.$bmapComponent = new mapvgl.TextLayer(options);
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

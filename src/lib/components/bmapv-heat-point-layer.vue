<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-heat-point-layer',
  mixins: [registerMixin],
  props: [
    'effect',
    'girdSize',
    'gradient',
    'max',
    'min',
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
      this.$bmapComponent = new mapvgl.HeatPointLayer(options);
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

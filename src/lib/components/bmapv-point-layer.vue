<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-point-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'shape',
    'size',
    'borderWidth',
    'borderColor',
    'blend',
    'data',
    ...pickMixin.props
  ],
  data() {
    return {
      converters: {
      },
      handlers: {
        color(value) {
          this.setOptions({
            color: value
          });
        },
        shape(value) {
          this.setOptions({
            shape: value
          });

        },
        size(value) {
          this.setOptions({
            size: value
          });
        },
        borderWidth(value) {
          this.setOptions({
            borderWidth: value
          });
        },
        borderColor(value) {
          this.setOptions({
            borderColor: value
          });
        },
        blend(value) {
          this.setOptions({
            blend: value
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
      console.log(this.enablePicked);
      this.$bmapComponent = new mapvgl.PointLayer(options);
      this.$view.addLayer(this.$bmapComponent);
    },
    ...pickMixin.methods
  },
  destroyed() {
    if (this.$bmapComponent && this.$view) {
      this.$view.removeLayer(this.$bmapComponent);
    }
  }
};
</script>

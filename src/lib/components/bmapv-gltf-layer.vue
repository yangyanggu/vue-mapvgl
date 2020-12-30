<script>
import registerMixin from '../mixins/register-component';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-gltf-layer',
  mixins: [registerMixin],
  props: [
    'url',
    'scale',
    'data'
  ],
  data() {
    return {
      propsRedirect: {
      },
      converters: {
      },
      handlers: {
        data(value) {
          this.setData(value, {
            autoRender: true
          });
        }
      }
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new mapvgl.GltfLayer(options);
      this.$view.addLayer(this.$bmapComponent);
      if (options.data && options.data.length > 0) {
        this.$bmapComponent.setData(options.data, {
          autoRender: true
        });
      }
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

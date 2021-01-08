<script>
import registerMixin from '../mixins/register-component';
import GltfThreeLayer from '../ext/GltfThreeLayer';

export default {
  name: 'el-bmapv-gltf-three-layer',
  mixins: [registerMixin],
  props: [
    'url',
    'autoScale',
    'scale',
    'rotate',
    'translate',
    'up',
    'move',
    'animation',
    'light',
    'data',
    'events'
  ],
  data() {
    return {
      converters: {
      },
      handlers: {
        data(value) {
          this.move(value);
        }
      }
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      let threeLayer = new GltfThreeLayer(options);
      this.$bmapComponent = threeLayer;
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

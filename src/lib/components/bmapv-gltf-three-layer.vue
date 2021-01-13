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
    'visible',
    'data',
    'userData',
    'events'
  ],
  data() {
    return {
      converters: {
      },
      handlers: {
        data(value) {
          this.move(value);
        },
        visible(flag) {
          if (flag === false) {
            this.hide();
          } else {
            this.show();
          }
        },
        userData(value) {
          this.setUserData(value);
        }
      }
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new GltfThreeLayer(options);
    }
  },
  destroyed() {
    if (this.$bmapComponent) {
      this.$bmapComponent.remove();
    }
  },
  render() {
    return null;
  }
};
</script>

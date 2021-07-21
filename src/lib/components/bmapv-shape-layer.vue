<script>
import registerMixin from '../mixins/register-component';
import pickMixin from '../mixins/pick-mixin';
import {clone} from 'lodash';
const mapvgl = require('mapvgl');

export default {
  name: 'el-bmapv-shape-layer',
  mixins: [registerMixin],
  props: [
    'color',
    'opacity',
    'texture',
    'isTextureFull',
    'textureScale',
    'topColor',
    'blend',
    'riseTime',
    'effect',
    'rippleLayer',
    'data',
    'animationDuration',
    'animationElevation',
    ...pickMixin.props
  ],
  data() {
    let self = this;
    return {
      propsRedirect: {
        effect: 'style'
      },
      converters: {
      },
      handlers: {
        data(value) {
          this.setData(value);
          self.startAnimation();
        },
        animationDuration() {
          self.startAnimation();
        },
        ...pickMixin.handlers
      },
      animateData: []
    };
  },
  created() {
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new mapvgl.ShapeLayer(options);
      this.$view.addLayer(this.$bmapComponent);
      if (options.style === 'ripple' && options.rippleLayer) {
        this.$view.addLayer(options.rippleLayer);
      }
    },
    startAnimation() {
      if (!this.animationDuration) {
        return;
      }
      if (typeof this.animationDuration !== 'number') {
        console.error('animationDuration必须是number型数据');
        return;
      }
      this.animateData = clone(this.data);
      this.checkElevation();
    },
    animation() {
      if (!this.animationDuration) {
        return;
      }
      this.moveElevation();
      window.requestAnimationFrame(this.animation);
    },
    checkElevation() {

    },
    moveElevation() {

    },
    ...pickMixin.methods
  },
  destroyed() {
    if (this.$bmapComponent && this.$view) {
      this.$view.removeLayer(this.$bmapComponent);
    }
    if (this.rippleLayer) {
      this.$view.removeLayer(this.rippleLayer);
    }
    this.$bmapComponent = null;
    this.$view = null;
  },
  render() {
    return null;
  }
};
</script>

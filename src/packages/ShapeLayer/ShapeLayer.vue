<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvShapeLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    color: {
      type: String
    },
    opacity: {
      type: Number
    },
    texture: {
      type: String
    },
    isTextureFull: {
      type: Boolean,
      default: false
    },
    textureScale: {
      type: Number
    },
    topColor: {
      type: String
    },
    blend: {
      type: String,
      validator: (value:string) => ['lighter', 'normal'].includes(value)
    },
    riseTime: {
      type: Number
    },
    effect: {
      type: String,
      validator: (value:string) => ['normal', 'window', 'windowAnimation', 'gradual', 'ripple'].includes(value)
    },
    rippleLayer: {
      type: Object
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      propsRedirect: {
        effect: 'style'
      },
      converters: {
      },
    }
  },
  unmounted() {
    if (this.$amapComponent && this.$parentComponent) {
      this.$parentComponent.removeLayer(this.$amapComponent);
    }
    if (this.rippleLayer) {
      this.$parentComponent.removeLayer(this.rippleLayer);
    }
    this.$amapComponent = null;
    this.$parentComponent = null;
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new mapvgl.ShapeLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
      if (options.style === 'ripple' && options.rippleLayer) {
        this.$parentComponent.addLayer(options.rippleLayer);
        this.$parentComponent.startAnimation();
      }
    },
  },
  render() {
    return null;
  }
});
</script>

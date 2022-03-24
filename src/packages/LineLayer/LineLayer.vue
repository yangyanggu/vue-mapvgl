<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvLineLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    color: {
      type: String
    },
    blend: {
      type: String
    },
    width: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string) => ['m', 'px'].includes(value)
    },
    dashArray: {
      type: Array
    },
    dashOffset: {
      type: Number
    },
    lineCap: {
      type: String,
      validator: (value:string) => ['butt', 'square', 'round'].includes(value)
    },
    lineJoin: {
      type: String,
      validator: (value:string) => ['miter', 'bevel', 'round'].includes(value)
    },
    miterLimit: {
      type: Number
    },
    antialias: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number
    },
    animation: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number
    },
    duration: {
      type: Number
    },
    trailLength: {
      type: Number
    },
    minZoom: {
      type: Number
    },
    maxZoom: {
      type: Number
    },
    mapStyle: {
      type: String
    },
    styleOptions: {
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
        mapStyle: 'style'
      },
      converters: {
      },
    };
  },
  unmounted() {
    if (this.$amapComponent && this.$parentComponent) {
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new mapvgl.LineLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    __dashOffset(value) {
      this.$amapComponent.setOptions({
        dashOffset: value
      });
    },
  },
  render() {
    return null;
  }
});
</script>

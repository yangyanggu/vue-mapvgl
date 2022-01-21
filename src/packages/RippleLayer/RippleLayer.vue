<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvRippleLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    color: {
      type: String
    },
    size: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string) => ['m','px'].includes(value)
    },
    duration: {
      type: Number
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
      this.$amapComponent = new mapvgl.RippleLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

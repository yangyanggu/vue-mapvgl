<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvHeatMapLayer',
  mixins: [registerMixin],
  props: {
    size: {
      type: Number
    },
    gradient: {
      type: Object
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string) => ['m', 'px'].includes(value)
    },
    height: {
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
      this.$amapComponent = new mapvgl.HeatmapLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

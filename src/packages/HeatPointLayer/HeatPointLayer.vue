<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvHeatPointLayer',
  mixins: [registerMixin],
  props: {
    blend: {
      type: String,
      validator: (value:string) => ['lighter','normal'].includes(value)
    },//点叠加模式，可选lighter
    effect: {
      type: String,
      validator: (value:string) => ['grid', 'normal'].includes(value)
    },
    girdSize: {
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
      this.$amapComponent = new mapvgl.HeatPointLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvSimpleLineLayer',
  mixins: [registerMixin],
  props: {
    color: {
      type: String
    },
    blend: {
      type: String,
      validator: (value:string) => ['lighter', 'normal'].includes(value)
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
      this.$amapComponent = new mapvgl.SimpleLineLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

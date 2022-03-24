<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary'
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvBarLayer',
  mixins: [registerMixin],
  props: {
    type: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: Number
    },
    height: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string ) => ['m', 'px'].includes(value)
    },
    edgeCount: {
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
      this.$amapComponent = new mapvgl.BarLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

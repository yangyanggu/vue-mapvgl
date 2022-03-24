<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvHoneycombLayer',
  mixins: [registerMixin],
  props: {
    size: {
      type: Number
    },
    height: {
      type: Number
    },
    enableCluster: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: true
    },
    maxZoom: {
      type: Number
    },
    minZoom: {
      type: Number
    },
    gradient: {
      type: Object
    },
    textOptions: {
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
      this.$amapComponent = new mapvgl.HoneycombLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

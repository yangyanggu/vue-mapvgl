<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary'
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvClusterLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    minSize: {
      type: Number
    },
    maxSize: {
      type: Number
    },
    clusterRadius: {
      type: Number
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
    iconOptions: {
      type: Object
    },
    data: {
      type: Array,
      required: true
    },
    beforeRender: {
      type: Function
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
      this.$amapComponent = new mapvgl.ClusterLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

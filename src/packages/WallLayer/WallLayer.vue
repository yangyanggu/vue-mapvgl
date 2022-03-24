<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvWallLayer',
  mixins: [registerMixin],
  props: {
    color: {
      type: String
    },
    gradient: {
      type: Object
    },
    height: {
      type: Number
    },
    texture: {
      type: [HTMLCanvasElement, String]
    },
    enablePreciseMap: {
      type: Boolean,
      default: false
    },
    repeatMap: {
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
      this.$amapComponent = new mapvgl.WallLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

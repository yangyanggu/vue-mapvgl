<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvWallTripLayer',
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
    startTime: {
      type: Number
    },
    endTime: {
      type: Number
    },
    step: {
      type: Number
    },
    trailLength: {
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
      this.$amapComponent = new mapvgl.WallTripLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

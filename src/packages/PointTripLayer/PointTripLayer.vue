<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvPointTripLayer',
  mixins: [registerMixin],
  props: {
    blend: {
      type: String,
      validator: (value:string) => ['lighter', 'normal'].includes(value)
    },
    shape: {
      type: String,
      validator: (value:string) => ['circle', 'square'].includes(value)
    }, //点的形状
    color: {
      type: String
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
    size: {
      type: Number
    },//点的大小
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
      this.$amapComponent = new mapvgl.PointTripLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

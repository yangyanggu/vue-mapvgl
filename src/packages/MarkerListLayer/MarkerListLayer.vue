<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvMarkerListLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    fillColor: {
      type: String
    },
    fillSize: {
      type: Number
    },
    fillBorderColor: {
      type: String
    },
    fillBorderWidth: {
      type: Number
    },
    shadowColor: {
      type: String
    },
    shadowSize: {
      type: Number
    },
    shadowBorderColor: {
      type: String
    },
    shadowBorderWidth: {
      type: Number
    },
    fontColor: {
      type: String
    },
    fontSize: {
      type: Number
    },
    fontFamily: {
      type: String
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
      this.$amapComponent = new mapvgl.MarkerListLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

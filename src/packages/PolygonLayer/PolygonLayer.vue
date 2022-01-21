<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvPolygonLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    lineColor: {
      type: String
    },
    lineWidth: {
      type: Number
    },
    lineJoin: {
      type: String,
      validator: (value:string) => ['miter', 'bevel', 'round'].includes(value)
    },
    dashArray: {
      type: Array
    },
    fillColor: {
      type: String
    },
    fillOpacity: {
      type: Number
    },
    data: {
      type: Array
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
      this.$amapComponent = new mapvgl.PolygonLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

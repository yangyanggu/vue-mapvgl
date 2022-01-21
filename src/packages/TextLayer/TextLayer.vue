<script lang="ts">
import {defineComponent} from "vue";
import * as mapvgl from 'mapvgl/dist/mapvgl.min';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvTextLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    fontFamily: {
      type: String
    },
    color: {
      type: String
    },
    fontSize: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string) => ['m','px'].includes(value)
    },
    angle: {
      type: Number
    },
    flat: {
      type: Boolean,
      default: false
    },
    collides: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array
    },
    padding: {
      type: Array
    },
    margin: {
      type: Array
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      converters: {
        offset(value) {
          return value;
        }
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
      this.$amapComponent = new mapvgl.TextLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

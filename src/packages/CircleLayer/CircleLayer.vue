<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary'
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvCircleLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    type: {
      type: String,
      validator: (value:string) => ['simple','wave','bubble'].includes(value)
    },
    color: {
      type: String
    },
    size: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string) => ['m','px'].includes(value)
    },
    radius: {
      type: [Number, Function]
    },
    duration: {
      type: Number
    },
    trial: {
      type: Number
    },
    random: {
      type: Boolean,
      default: true
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
      this.$amapComponent = new mapvgl.CircleLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

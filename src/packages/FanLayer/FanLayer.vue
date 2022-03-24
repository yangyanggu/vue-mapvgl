<script lang="ts">
import {defineComponent} from "vue";
import {mapvglThree} from '../../utils/getLibary'
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvFanLayer',
  mixins: [registerMixin],
  props: {
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
    step: {
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
      this.$amapComponent = new mapvglThree.FanLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

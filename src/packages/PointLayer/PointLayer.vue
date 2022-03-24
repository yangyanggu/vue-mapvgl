<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary';
import registerMixin from '../../mixins/register-component';
import pickMixin from '../../mixins/pick-mixin';

export default defineComponent({
  name: 'ElBmapvPointLayer',
  mixins: [registerMixin, pickMixin],
  props: {
    color: {
      type: String
    },
    shape: {
      type: String,
      validator: (value:string) => ['circle', 'square'].includes(value)
    },
    size: {
      type: Number
    },
    unit: {
      type: String,
      validator: (value:string) => ['m', 'px'].includes(value)
    },
    borderWidth: {
      type: Number
    },
    borderColor: {
      type: String
    },
    blend: {
      type: String,
      validator: (value:string) => ['normal', 'lighter'].includes(value)
    },
    data: {
      type: Array
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
      this.$amapComponent = new mapvgl.PointLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    __color(value) {
      this.$amapComponent.setOptions({
        color: value
      });
    },
    __shape(value) {
      this.$amapComponent.setOptions({
        shape: value
      });
    },
    __size(value) {
      this.$amapComponent.setOptions({
        size: value
      });
    },
    __borderWidth(value) {
      this.$amapComponent.setOptions({
        borderWidth: value
      });
    },
    __borderColor(value) {
      this.$amapComponent.setOptions({
        borderColor: value
      });
    },
    __blend(value) {
      this.$amapComponent.setOptions({
        blend: value
      });
    },
  },
  render() {
    return null;
  }
});
</script>

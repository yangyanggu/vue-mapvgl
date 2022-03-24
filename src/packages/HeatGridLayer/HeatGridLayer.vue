<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary'
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvHeatGridLayer',
  mixins: [registerMixin],
  props: {
    effect: {
      type: String,
      validator: (value:string) => ['normal', 'grid'].includes(value)
    },
    girdSize: {
      type: Number
    },
    gradient: {
      type: Object
    },
    max: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    maxHeight: {
      type: Number,
    },
    minHeight: {
      type: Number
    },
    riseTime: {
      type: Number
    }, //楼块初始化升起时间
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      propsRedirect: {
        effect: 'style'
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
      this.$amapComponent = new mapvgl.HeatGridLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
  },
  render() {
    return null;
  }
});
</script>

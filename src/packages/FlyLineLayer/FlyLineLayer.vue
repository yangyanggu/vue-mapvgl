<script lang="ts">
import {defineComponent} from "vue";
import * as mapvglThree from 'mapvgl/dist/mapvgl.threelayers.min.js';
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvFlyLineLayer',
  mixins: [registerMixin],
  props: {
    effect: {
      type: String,
      validator: (value:string) => ['normal', 'chaos'].includes(value)
    },
    color: {
      type: String
    },
    textureColor: {
      type: String
    },
    textureWidth: {
      type: Number
    },
    textureLength: {
      type: Number
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
      this.$amapComponent = new mapvglThree.FlyLineLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    }
  },
  render() {
    return null;
  }
});
</script>

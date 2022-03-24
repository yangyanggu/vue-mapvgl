<script lang="ts">
import {defineComponent} from "vue";
import {mapvgl} from '../../utils/getLibary'
import registerMixin from '../../mixins/register-component';

export default defineComponent({
  name: 'ElBmapvGltfLayer',
  mixins: [registerMixin],
  props: {
    url: {
      type: String,
      required: true,
    },
    scale: {
      type: Number
    },
    data: {
      type: Array
    },
    enablePicked: {
      type: Boolean
    },
    onClick: {
      type: Function
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
      this.$amapComponent = new mapvgl.GltfLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
      if (options.data && options.data.length > 0) {
        this.$amapComponent.setData(options.data, {
          autoRender: true
        } as any);
      }
    },
    __data(value) {
      this.$amapComponent.setData(value, {
        autoRender: true
      } as any);
    }
  },
  render() {
    return null;
  }
});
</script>

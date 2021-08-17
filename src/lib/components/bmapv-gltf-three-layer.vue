<script>
import Vue from 'vue';
import registerMixin from '../mixins/register-component';
import GltfThreeLayer from '../ext/GltfThreeLayer';

export default {
  name: 'el-bmapv-gltf-three-layer',
  mixins: [registerMixin],
  props: [
    'url',
    'autoScale',
    'scale',
    'rotate',
    'translate',
    'up',
    'move',
    'animation',
    'light',
    'visible',
    'data',
    'userData',
    'track',
    'tooltip',
    'infoWindow',
    'events'
  ],
  data() {
    return {
      converters: {
      },
      handlers: {
        data(value) {
          this.move(value);
        },
        visible(flag) {
          if (flag === false) {
            this.hide();
          } else {
            this.show();
          }
        },
        userData(value) {
          this.setUserData(value);
        },
        track(value) {
          this.setTrack(value);
        },
        tooltip(value) {
          this.addOrUpdateTooltip(value);
        },
        infoWindow(value) {
          this.addOrUpdateInfoWindow({
            visible: value.visible
          });
        }
      },
      preTooltip: '',
      preInfoWindow: '',
      hasTooltipSlot: false
    };
  },
  created() {
    const tooltipSlot = this.$slots.tooltip || [];
    if (tooltipSlot.length > 0) {
      this.hasTooltipSlot = true;
    }
    this.tooltipVM = new Vue({
      data() {
        return {node: ''};
      },
      render(h) {
        const { node } = this;
        return h('div', {ref: 'node'}, Array.isArray(node) ? node : [node]);
      }
    }).$mount();
    this.infoWindowVM = new Vue({
      data() {
        return {node: ''};
      },
      render(h) {
        const { node } = this;
        return h('div', {ref: 'node'}, Array.isArray(node) ? node : [node]);
      }
    });
  },
  updated() {
    this.$nextTick(() => {
      if (this.$bmapComponent && this.hasTooltipSlot) {
        let tooltipHtml = this.tooltipVM.$refs.node.outerHTML;
        if (tooltipHtml !== this.preTooltip) {
          this.$bmapComponent.addOrUpdateTooltip({
            content: tooltipHtml,
            isCustom: true
          });
          this.preTooltip = tooltipHtml;
        }
      }
    });
  },
  methods: {
    __initComponent(options) {
      this.$bmapComponent = new GltfThreeLayer(options);
      if (this.$slots.tooltip && this.$slots.tooltip.length) {
        this.$bmapComponent.addOrUpdateTooltip({
          content: this.tooltipVM.$refs.node.outerHTML,
          isCustom: true
        });
      } else {
        this.$bmapComponent.addOrUpdateTooltip();
      }
      if (this.$slots.infoWindow && this.$slots.infoWindow.length) {
        this.$bmapComponent.addOrUpdateInfoWindow({
          ele: this.infoWindowVM
        });
      } else {
        this.$bmapComponent.addOrUpdateInfoWindow();
      }
    }
  },
  destroyed() {
    if (this.$bmapComponent) {
      this.$bmapComponent.remove();
      this.$bmapComponent = null;
    }
    if (this.tooltipVM) {
      this.tooltipVM.$destroy();
      this.tooltipVM = null;
    }
    if (this.infoWindowVM) {
      this.infoWindowVM.$destroy();
      this.infoWindowVM = null;
    }
  },
  render() {

    const tooltipSlot = this.$slots.tooltip || [];
    if (tooltipSlot.length) {
      this.tooltipVM.node = tooltipSlot;
    }
    const infoWindowSlot = this.$slots.infoWindow || [];
    if (infoWindowSlot.length) {
      this.infoWindowVM.node = infoWindowSlot;
    }
    return null;
  }
};
</script>

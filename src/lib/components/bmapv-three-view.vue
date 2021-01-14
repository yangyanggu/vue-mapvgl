<template>
  <div><slot /></div>
</template>
<script>
import registerMixin from '../mixins/register-component';
import CONST from '../utils/constant';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');
const THREE = mapvglThree.THREE;
import {createLight, createHDR} from '../utils/threeUtil';

export default {
  name: 'el-bmapv-three-view',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    lights: {
      type: Array
    },
    hdr: {
      type: Object
    },
    events: {
      type: Object
    }
  },
  computed: {
  },

  data() {
    return {
      converters: {
      },
      handlers: {
        visible() {

        }
      }
    };
  },

  mounted() {
  },
  methods: {
    __initComponent(options) {
      this.$view = options.view;
      let threeLayer = new mapvglThree.ThreeLayer({
        enabledPointOffset: false,
        webglLayer: options.view.webglLayer
      });
      this.$bmapComponent = threeLayer;
      threeLayer.$view = options.view;
      options.view.addLayer(threeLayer);
      if (options.lights) {
        createLight(options.lights, threeLayer.getWorld());
      }
      if (options.hdr) {
        createHDR(options.hdr, threeLayer);
      }
      if (this.events && this.events.init) this.events.init(this.$bmapComponent);
      this.$children.forEach(component => {
        component.$emit(CONST.MAPV_VIEW_READY_EVENT, this.$bmapComponent);
      });
      this.bindClick();
      this.requestFrame();
    },
    requestFrame() {
      requestAnimationFrame(this.requestFrame);
      this.$bmapComponent.update();
    },
    bindClick() {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      this.$view.webglLayer.map.map.addEventListener('click', (e) => {
        let client = e.srcElement;
        mouse.x = (e.x / client.clientWidth) * 2 - 1;
        mouse.y = -(e.y / client.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.$bmapComponent.getCamera());
        const intersects = raycaster.intersectObjects(this.$bmapComponent.getWorld().children, true);
        if (intersects.length > 0) {
          let object = intersects[0];
          let group = this.getGroup(object.object);
          if (group.events && group.events.click) {
            group.events.click();
          }
        }
      });
    },
    getGroup(object) {
      if (object.isCustomGroup) {
        return object;
      }
      return this.getGroup(object.parent);
    }
  },
  destroyed() {
    this.$bmapComponent && this.$bmapComponent.destroy();
  }
};
</script>

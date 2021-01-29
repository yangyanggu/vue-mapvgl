<template>
  <div><slot /></div>
</template>
<script>
import registerMixin from '../mixins/register-component';
import CONST from '../utils/constant';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');
// const THREE = mapvglThree.THREE;
import {Raycaster, Vector2, AxesHelper, PerspectiveCamera} from 'three/build/three.module';
import {createLight, createHDR} from '../utils/threeUtil';

const raycaster = new Raycaster();
const mouse = new Vector2();

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
    },
    debug: {
      type: Boolean,
      default: false
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
      let threeLayer = new mapvglThree.ThreeLayer({
        enabledPointOffset: false,
        webglLayer: options.view.webglLayer
      });
      this.$bmapComponent = this.$view = threeLayer;
      options.view.addLayer(threeLayer);
      if (options.debug) {
        let map = options.view.webglLayer.map.map;
        let center = map.getCenter();
        let mercator = map.lnglatToMercator(center.lng, center.lat);
        let axes = new AxesHelper(1000000000000);
        axes.position.set(mercator[0], mercator[1], 0);
        threeLayer.getWorld().add(axes);
      }
      let canvas = options.view.webglLayer.canvas;
      let camera = threeLayer.getCamera();
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      if (options.lights) {
        createLight(options.lights, threeLayer.getWorld());
      }
      if (options.hdr) {
        createHDR(options.hdr, threeLayer);
      }
      threeLayer.needsUpdate = true;
      if (this.events && this.events.init) this.events.init(this.$bmapComponent);
      this.$children.forEach(component => {
        component.$emit(CONST.MAPV_VIEW_READY_EVENT, this.$bmapComponent);
      });
      this.bindClick();
      this.requestFrame();
    },
    requestFrame() {
      requestAnimationFrame(this.requestFrame);
      if (this.$bmapComponent.needsUpdate) {
        this.$bmapComponent.needsUpdate = false;
        this.$bmapComponent.update();
      }
    },
    bindClick() {
      this.$bmapComponent.webglLayer.map.map.addEventListener('click', this.clickGltf);
      this.$bmapComponent.webglLayer.map.map.addEventListener('resize', this.resizeCamera);
      // window.addEventListener('click', this.clickGltf);
    },
    resizeCamera(e) {
      let camera = this.$bmapComponent.getCamera();
      camera.aspect = e.size.width / e.size.height;
      camera.updateProjectionMatrix();
    },
    clickGltf(e) {
      e = e.domEvent;
      let client = e.srcElement;
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      let getBoundingClientRect = client.getBoundingClientRect();

      // window.pageYOffset 鼠标滚动的距离
      // clientTop 一个元素顶部边框的宽度
      let offsetTop = getBoundingClientRect.top + window.pageYOffset - client.clientTop;
      let offsetLeft = getBoundingClientRect.left + window.pageXOffset - client.clientLeft;

      mouse.x = ((e.x + window.pageXOffset - offsetLeft) / getBoundingClientRect.width) * 2 - 1;
      mouse.y = -((e.y + window.pageYOffset - offsetTop) / getBoundingClientRect.height) * 2 + 1;
      let camera = new PerspectiveCamera();
      camera.copy(this.$bmapComponent.getCamera());
      camera.projectionMatrixInverse = camera.projectionMatrix.invert();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(this.$bmapComponent.eventObjects || []);
      if (intersects.length > 0) {
        let object = intersects[0];
        // let group = this.getGroup(object.object);
        let group = object.object.sourceObject;
        if (group.events && group.events.click) {
          group.events.click();
        }
      }
    },
    getGroup(object) {
      if (object.isCustomGroup) {
        return object;
      }
      return this.getGroup(object.parent);
    }
  },
  destroyed() {
    if (this.$bmapComponent) {
      // window.removeEventListener('click', this.clickGltf);
      this.$bmapComponent.webglLayer.map.map.removeEventListener('click', this.clickGltf);
      this.$bmapComponent.webglLayer.map.map.removeEventListener('resize', this.resizeCamera);
      this.$bmapComponent.destroy();
    }
  }
};
</script>

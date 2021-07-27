<template>
  <div><slot /></div>
</template>
<script>
import registerMixin from '../mixins/register-component';
import CONST from '../utils/constant';
const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');
// const THREE = mapvglThree.THREE;
import {Raycaster, Vector2, AxesHelper} from 'three/build/three.module';
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
      },
      animationFrame: null,
      timeout: null
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
      if (!threeLayer.eventObjects) {
        threeLayer.eventObjects = [];
      }
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
      this.bindEvents();
      this.requestFrame();
    },
    requestFrame() {
      this.animationFrame = requestAnimationFrame(this.requestFrame);
      if (this.$bmapComponent.needsUpdate) {
        this.$bmapComponent.needsUpdate = false;
        this.timeout = setTimeout(() => {
          this.$bmapComponent.update();
        }, 1);
      }
    },
    bindEvents() {
      let dom = this.$bmapComponent.webglLayer.map.map.getContainer().querySelector('#mask');
      dom.addEventListener('click', this.clickGltf);
      this.$bmapComponent.webglLayer.map.map.addEventListener('resize', this.resizeCamera);
      dom.addEventListener('mousemove', this.hoverGltf);
      // window.addEventListener('click', this.clickGltf);
    },
    resizeCamera(e) {
      let camera = this.$bmapComponent.getCamera();
      camera.aspect = e.size.width / e.size.height;
      camera.updateProjectionMatrix();
    },
    intersectGltf(e) {
      let client = e.srcElement;
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      let getBoundingClientRect = client.getBoundingClientRect();

      // window.pageYOffset 鼠标滚动的距离
      // clientTop 一个元素顶部边框的宽度
      let offsetTop = getBoundingClientRect.top + window.pageYOffset - client.clientTop;
      let offsetLeft = getBoundingClientRect.left + window.pageXOffset - client.clientLeft;

      mouse.x = ((e.x + window.pageXOffset - offsetLeft) / getBoundingClientRect.width) * 2 - 1;
      mouse.y = -((e.y + window.pageYOffset - offsetTop) / getBoundingClientRect.height) * 2 + 1;
      let camera = this.$bmapComponent.getCamera();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(this.$bmapComponent.eventObjects || []);
      let length = intersects.length;
      if (length > 0) {
        let group = null;
        for (let i = 0;i < length;i++) {
          let object = intersects[i];
          // let group = this.getGroup(object.object);
          // 处理显隐问题，当模型隐藏后不应该继续触发事件
          let sourceObject = object.object.sourceObject;
          if (sourceObject.visible !== false) {
            group = sourceObject;
            break;
          }
        }
        return group;
      }
      return null;
    },
    clickGltf(e) {
      let group = this.intersectGltf(e);
      if (group && group.events && group.events.click) {
        group.events.click();
        e.preventDefault();
        e.stopPropagation();
      }
    },
    hoverGltf(e) {
      let group = this.intersectGltf(e);
      if (!group) {
        this.$bmapComponent.eventObjects.forEach(obj => {
          if (obj.sourceObject.isHover === true) {
            obj.sourceObject.isHover = false;
            obj.sourceObject.events.mouseout();
          }
        });
      } else if (group.events && group.events.mouseover && !group.isHover) {
        group.isHover = true;
        group.events.mouseover();
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
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      // window.removeEventListener('click', this.clickGltf);
      this.$bmapComponent.webglLayer.map.map.removeEventListener('click', this.clickGltf);
      this.$bmapComponent.webglLayer.map.map.removeEventListener('resize', this.resizeCamera);
      this.$bmapComponent.destroy();
      this.$bmapComponent = null;
    }
  }
};
</script>

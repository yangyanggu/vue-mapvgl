<template>
  <slot />
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {Raycaster, Vector2, AxesHelper} from 'three/build/three.module';
import {mapvglThree} from '../../utils/getLibary';
// const THREE = mapvglThree.THREE;
import registerMixin from '../../mixins/register-component';
import {createLight, createHDR} from '../../utils/threeUtil';

const raycaster = new Raycaster();
const mouse = new Vector2();

export default defineComponent({
  name: 'ElBmapvThreeView',
  mixins: [registerMixin],
  props: {
    lights: {
      type: Array
    },
    hdr: {
      type: Object
    },
    debug: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      converters: {
      },
      animationFrame: null as any,
      timeout: null as any
    };
  },
  computed: {
  },

  unmounted() {
    if (this.$amapComponent) {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      // window.removeEventListener('click', this.clickGltf);
      this.$amapComponent.webglLayer.map.map.removeEventListener('click', this.clickGltf);
      this.$amapComponent.webglLayer.map.map.removeEventListener('resize', this.resizeCamera);
      this.$amapComponent.destroy();
      this.$amapComponent = null;
    }
  },
  methods: {
    __initComponent(options) {
      const threeLayer = new mapvglThree.ThreeLayer({
        enabledPointOffset: false,
        webglLayer: this.$parentComponent.webglLayer
      });
      if (!threeLayer.eventObjects) {
        threeLayer.eventObjects = [];
      }
      this.$amapComponent = threeLayer;
      this.$parentComponent.addLayer(threeLayer);
      if (options.debug) {
        const map = this.$parentComponent.webglLayer.map.map;
        const center = map.getCenter();
        const mercator = map.lnglatToMercator(center.lng, center.lat);
        const axes = new AxesHelper(1000000000000);
        axes.position.set(mercator[0], mercator[1], 0);
        threeLayer.getWorld().add(axes);
      }
      const canvas = this.$parentComponent.webglLayer.canvas;
      const camera = threeLayer.getCamera();
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      if (options.lights) {
        createLight(options.lights, threeLayer.getWorld());
      }
      if (options.hdr) {
        createHDR(options.hdr, threeLayer);
      }
      threeLayer.needsUpdate = true;
      // if (this.events && this.events.init) this.events.init(this.$amapComponent);
      this.bindEvents();
      this.requestFrame();
    },
    requestFrame() {
      this.animationFrame = requestAnimationFrame(this.requestFrame);
      if (this.$amapComponent.needsUpdate) {
        this.$amapComponent.needsUpdate = false;
        this.timeout = setTimeout(() => {
          this.$amapComponent.update();
        }, 1);
      }
    },
    bindEvents() {
      const dom = this.$amapComponent.webglLayer.map.map.getContainer().querySelector('#mask');
      dom.addEventListener('click', this.clickGltf);
      this.$amapComponent.webglLayer.map.map.addEventListener('resize', this.resizeCamera);
      dom.addEventListener('mousemove', this.hoverGltf);
      // window.addEventListener('click', this.clickGltf);
    },
    resizeCamera(e) {
      const camera = this.$amapComponent.getCamera();
      camera.aspect = e.size.width / e.size.height;
      camera.updateProjectionMatrix();
    },
    intersectGltf(e) : any{
      const client = e.srcElement;
      // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
      const getBoundingClientRect = client.getBoundingClientRect();

      // window.pageYOffset 鼠标滚动的距离
      // clientTop 一个元素顶部边框的宽度
      const offsetTop = getBoundingClientRect.top + window.pageYOffset - client.clientTop;
      const offsetLeft = getBoundingClientRect.left + window.pageXOffset - client.clientLeft;

      mouse.x = ((e.x + window.pageXOffset - offsetLeft) / getBoundingClientRect.width) * 2 - 1;
      mouse.y = -((e.y + window.pageYOffset - offsetTop) / getBoundingClientRect.height) * 2 + 1;
      const camera = this.$amapComponent.getCamera();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(this.$amapComponent.eventObjects || []);
      const length = intersects.length;
      if (length > 0) {
        let group = null;
        for (let i = 0;i < length;i++) {
          const object = intersects[i];
          // let group = this.getGroup(object.object);
          // 处理显隐问题，当模型隐藏后不应该继续触发事件
          const sourceObject = object.object.sourceObject;
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
      const group = this.intersectGltf(e);
      if (group && group.events && group.events.click) {
        group.events.click();
        e.preventDefault();
        e.stopPropagation();
      }
    },
    hoverGltf(e) {
      const group = this.intersectGltf(e);
      if (!group) {
        this.$amapComponent.eventObjects.forEach(obj => {
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
    },
  }
});
</script>

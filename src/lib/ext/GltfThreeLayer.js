const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');
import {merge} from 'lodash';
const THREE = mapvglThree.THREE;
const eventsList = ['loaded', 'click'];
import TWEEN from '@tweenjs/tween.js';
import {GLTFLoader} from '../three-loader/GLTFLoader';
import {addEnvMap} from '../utils/threeUtil';

const lightTypes = {
  AmbientLight: THREE.AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight: THREE.DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight: THREE.HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight: THREE.PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight: THREE.RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight: THREE.SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};

function GltfThreeLayer(options) {
  let defaultOptions = this.getDefaultOptions();
  this.options = merge(defaultOptions, options);
  this.init();
}

/**
 *
 * 灯光配置：
 * {
      type: 'DirectionalLight',
      args: [],
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      lookAt: {
        x: 0,
        y: 0,
        z: 0
      }
    }
 *
 * @returns {{rotate: {x: number, y: number, z: number}, move: {duration: number, smooth: boolean}, light: [], scale: number, up: {x: number, y: number, z: number}, translate: {x: number, y: number, z: number}, autoScale: boolean, animation: {options: {duration: number, delay: number, offset: {x: number, y: number, z: number}}, type: string}}}
 */
GltfThreeLayer.prototype.getDefaultOptions = function() {
  return {
    autoScale: true,
    scale: 1,
    move: {
      smooth: false,
      duration: 200
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    translate: {
      x: 0,
      y: 0,
      z: 0
    },
    up: {
      x: 0,
      y: 1,
      z: 0
    },
    light: [],
    animation: {
      type: 'none', // 动画类型，目前支持liner(往返直线运动) ,默认为none
      unit: 'px', // 移动单位，默认按像素移动，不同比例尺下移动距离基本一致
      options: {
        offset: {
          x: 0,
          y: 0,
          z: 20
        },
        duration: 2000,
        delay: 0
      }
    },
    userData: null
  };
};

/**
 * 初始化方法
 * @returns {ThreeLayer}
 */
GltfThreeLayer.prototype.init = function() {
  this.initLayer();
  this.events = new Map();
  this.loadModel();
};

/**
 * 初始化图层
 * @returns {ThreeLayer}
 */
GltfThreeLayer.prototype.initLayer = function() {
  this.threeLayer = this.options.view;
  this.options.view = this.threeLayer.$view;
};

GltfThreeLayer.prototype.loadModel = function() {
  let url = this.options.url;
  let tempUrl = url.split('?')[0];
  let suffix = tempUrl.substring((tempUrl.lastIndexOf('.') + 1), tempUrl.length);
  if (suffix === 'gltf' || suffix === 'glb') {
    this.loadGltf(url);
  } else if (suffix === 'json') {
    this.loadObject(url);
  }
};

GltfThreeLayer.prototype.loadGltf = function(url) {
  let loader = new GLTFLoader(); // 读取模型
  loader.load(url, (gltf) => {
    let object = gltf.scene;
    this.addObject3D(object, gltf.animations);
  });
};

/**
 * 加载模型，目前只支持threejs的object模型
 */
GltfThreeLayer.prototype.loadObject = function(url) {
  let objectLoader = new THREE.ObjectLoader(); // 读取模型
  objectLoader.load(url, (object) => {
    this.addObject3D(object);
  });
};

GltfThreeLayer.prototype.addObject3D = function(object, animations) {
  let options = this.options;
  let data = options.data;
  let coordinates = data.geometry.coordinates;
  let angle = data.angle;
  let autoScale = options.autoScale;
  let scale = options.scale;
  let rotate = options.rotate;
  let translate = options.translate;
  let up = options.up;
  let rotateZ = angle !== undefined ? (Math.PI / 180 * angle) : rotate.z;
  object.scale.set(scale, scale, scale);
  object.translateX(translate.x);
  object.translateY(translate.y);
  object.translateZ(translate.z);
  object.lookAt(up.x, up.y, up.z);
  let mercator = this.convertPosition(coordinates);
  let point = new BMapGL.Point(mercator[0], mercator[1]);
  if (autoScale) {
    this.add(object, point);
  } else {
    this.threeLayer.add(object, point);
    let worldChildren = this.threeLayer.getWorld().children;
    this.group = worldChildren[worldChildren.length - 1];
  }
  if (animations) {
    let mixer = new THREE.AnimationMixer(object);
    let actions = {};

    for (let i = 0; i < animations.length; i++) {
      const clip = animations[ i ];
      actions[ clip.name ] = mixer.clipAction(clip);
    }
    object.customAnimations = {
      actions,
      mixer
    };
  }
  if (options.userData) {
    this.group.userData = options.userData;
  }
  this.group.isCustomGroup = true;
  this.group.events = {};
  this.object = object;
  this.group.rotation.set(rotate.x, rotate.y, rotateZ);
  if (options.visible === false) {
    this.hide();
  }
  addEnvMap(object, this.threeLayer);
  this.createLight();
  this.createAnimation();
  this.addEvents();
  this.emit('loaded', {
    object,
    group: this.group,
    threeLayer: this.threeLayer
  });
};

GltfThreeLayer.prototype.addEvents = function() {
  let events = this.options.events;
  if (events) {
    if (events.click) {
      this.group.events.click = () => {
        this.emit('click', this.group);
      };
    }
  }
};

GltfThreeLayer.prototype.remove = function() {
  this.threeLayer.getWorld().remove(this.group);
};

GltfThreeLayer.prototype.createLight = function() {
  let lightArray = this.options.light;
  let defaultLightOptions = {
    type: 'DirectionalLight', // 灯光类型， 可选值见下面的字典
    args: [], // 灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
    position: {
      x: 0,
      y: 0,
      z: 0
    }, // 光源的位置
    lookAt: {
      x: 0,
      y: 0,
      z: 0
    } // 光源查看的目标点
  };
  if (lightArray.length > 0) {
    lightArray.forEach(lightOptions => {
      lightOptions = merge({}, defaultLightOptions, lightOptions);
      if (lightTypes[lightOptions.type]) {
        let light = new lightTypes[lightOptions.type](...lightOptions.args);
        let position = lightOptions.position;
        let lookAt = lightOptions.lookAt;
        light.position.set(position.x, position.y, position.z);
        light.lookAt(lookAt.x, lookAt.y, lookAt.z);
        this.group.add(light);
      } else {
        console.warn('当前设置的灯光类型不存在');
      }
    });
  }
};

GltfThreeLayer.prototype.convertPosition = function(coordinates) {
  return this.options.view.webglLayer.map.lnglatToMercator(coordinates[0], coordinates[1]);
};

/**
 * 将模型添加到地图上
 * @param object  模型的Object3D对象
 * @param point   添加的位置，对象： BMapGL.Point
 */
GltfThreeLayer.prototype.add = function(object, point) {
  this.threeLayer.scene.add(object);
  let threeLayer = this.threeLayer;
  let group = new THREE.Group();
  group.isGeoGroup = true;
  group.object = object;
  group.add(object);
  let offset = [0, 0];
  threeLayer.enabledPointOffset === true && (offset = threeLayer.getPointOffset());
  group.position.x = point.lng - offset[0];
  group.position.y = point.lat - offset[1];
  group.position.z = object.position.z;
  this.group = group;
  if (this.options.visible === false) {
    group.visible = false;
  }
  threeLayer.getWorld().add(group);
};

GltfThreeLayer.prototype.createAnimation = function() {
  let animation = this.options.animation;
  if (animation.type === 'none') {
    return;
  }
  if (!this.animationGroup) {
    this.animationGroup = new TWEEN.Group();
  }
  this.animationGroup.removeAll();
  if (animation.type === 'liner') {
    this.createLinerAnimation();
  } else if (animation.type === 'self') {
    this.createSelfAnimation();
  }
};

GltfThreeLayer.prototype.createLinerAnimation = function() {
  let animation = this.options.animation;
  let animationOptions = animation.options;
  let offset = animationOptions.offset;
  let group = this.group;
  let currentPosition = {
    x: group.translate.x || 0,
    y: group.translate.y || 0,
    z: group.translate.z || 0
  };
  let startPosition = {
    x: group.translate.x || 0,
    y: group.translate.y || 0,
    z: group.translate.z || 0
  };
  let endPosition = {
    x: (startPosition.x + offset.x),
    y: (startPosition.y + offset.y),
    z: (startPosition.z + offset.z)
  };
  let prePosition = {
    x: currentPosition.x,
    y: currentPosition.y,
    z: currentPosition.z
  };
  const _this = this;
  function changeGroup() {
    let zoomUnit = _this.options.view.webglLayer.map.getZoomUnits();
    if (_this.options.animation.unit !== 'px') {
      zoomUnit = 1;
    }
    group.translateX((currentPosition.x - prePosition.x) * zoomUnit);
    group.translateY((currentPosition.y - prePosition.y) * zoomUnit);
    group.translateZ((currentPosition.z - prePosition.z) * zoomUnit);
    prePosition.x = currentPosition.x;
    prePosition.y = currentPosition.y;
    prePosition.z = currentPosition.z;
    _this.refreshRender();
  }
  let animationGroup = this.animationGroup;
  let tweenA = new TWEEN.Tween(currentPosition, animationGroup)
    .to(endPosition)
    .delay(animationOptions.delay)
    .duration(animationOptions.duration)
    .easing(TWEEN.Easing.Cubic.In)
    .onUpdate(() => {
      changeGroup();
    });
  let tweenB = new TWEEN.Tween(currentPosition, animationGroup)
    .to(startPosition)
    .duration(animationOptions.duration)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(() => {
      changeGroup();
    });
  tweenA.chain(tweenB);
  tweenB.chain(tweenA);
  tweenA.start();
  this.animate(() => {
    this.animationGroup.update();
  });
};

GltfThreeLayer.prototype.animate = function(callback) {
  requestAnimationFrame(() => {
    this.animate(callback);
  });
  callback();
};

GltfThreeLayer.prototype.createSelfAnimation = function() {
  let animations = this.object.customAnimations;
  animations.clock = new THREE.Clock();
  for (let name in animations.actions) {
    animations.actions[name].play();
  }
  this.animate(() => {
    const dt = animations.clock.getDelta();
    let mixer = animations.mixer;
    if (mixer) mixer.update(dt);
  });
};

GltfThreeLayer.prototype.move = function(newPosition) {
  if (!this.group) {
    return;
  }
  let rotateZ = this.group.rotation.z;
  let angle = newPosition.angle;
  let newRotateZ = angle !== undefined ? (Math.PI / 180 * angle) : rotateZ;
  let moveOption = this.options.move;
  if (!moveOption.smooth) {
    let mercator = this.convertPosition(newPosition.geometry.coordinates);
    this.group.position.x = mercator[0];
    this.group.position.y = mercator[1];
    this.group.rotation.z = newRotateZ;
    this.refreshRender();
    return;
  }
  if (!this.moveGroup) {
    this.moveGroup = new TWEEN.Group();
  }
  if (this.moveRequestAnimationFrame) {
    window.cancelAnimationFrame(this.moveRequestAnimationFrame);
  }
  this.moveGroup.getAll().forEach(v => {
    v.end();
  });
  this.moveGroup.removeAll();
  let group = this.group;
  let currentPosition = {
    x: group.position.x,
    y: group.position.y,
    rotateZ: rotateZ
  };
  let mercator = this.convertPosition(newPosition.geometry.coordinates);
  let endPosition = {
    x: mercator[0],
    y: mercator[1],
    rotateZ: newRotateZ
  };
  new TWEEN.Tween(currentPosition, this.moveGroup)
    .easing(TWEEN.Easing.Linear.None)
    .duration(moveOption.duration)
    .to(endPosition)
    .onUpdate(() => {
      this.group.position.x = currentPosition.x;
      this.group.position.y = currentPosition.y;
      this.group.rotation.z = currentPosition.rotateZ;
      this.refreshRender();
    }).start();
  this.moveAnimate();
};

GltfThreeLayer.prototype.moveAnimate = function() {
  this.moveRequestAnimationFrame = requestAnimationFrame(() => {
    this.moveAnimate();
  });
  this.moveGroup.update();
};

GltfThreeLayer.prototype.show = function() {
  if (this.group) {
    this.group.visible = true;
  }

};

GltfThreeLayer.prototype.hide = function() {
  if (this.group) {
    this.group.visible = false;
  }
};

GltfThreeLayer.prototype.refreshRender = function() {
  // this.threeLayer.renderer.render(this.threeLayer.scene, this.threeLayer.camera);
  if (this.group.visible) {
  }
};

GltfThreeLayer.prototype.on = function(eventName, handler, isOnce = false) {
  if (eventsList.includes(eventName)) {
    if (!this.events.get(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push({
      handler,
      isOnce
    });
  } else {
    console.warn(`事件[${eventName}]不在可操作事件列表中！`);
  }
};

GltfThreeLayer.prototype.off = function(eventName, handler) {
  if (eventsList.includes(eventName)) {
    let array = this.events.get(eventName);
    if (array) {
      let l_index = array.indexOf(handler);
      array.splice(l_index, 1);
    }
  } else {
    console.warn(`事件[${eventName}]不在可操作事件列表中！`);
  }
};

GltfThreeLayer.prototype.removeEventListener = function(eventName) {
  if (eventsList.includes(eventName)) {
    this.events.delete(eventName);
  } else {
    console.warn(`事件[${eventName}]不在可操作事件列表中！`);
  }
};

GltfThreeLayer.prototype.emit = function(eventName, obj) {
  let array = this.events.get(eventName);
  if (array) {
    let length = array.length;
    for (let i = 0; i < length; i++) {
      let event = array[i];
      event.handler.call(this, obj);
      if (event.isOnce) {
        array.splice(i, 1);
        i--;
        length--;
      }
    }
  }
};

GltfThreeLayer.prototype.setUserData = function(data) {
  this.group.userData = data;
};

export default GltfThreeLayer;

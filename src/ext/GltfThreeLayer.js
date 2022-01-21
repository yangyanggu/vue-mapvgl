import * as mapvglThree from 'mapvgl/dist/mapvgl.threelayers.min';
import {merge} from 'lodash-es';
import TWEEN from '@tweenjs/tween.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Box3, Vector3, MeshBasicMaterial, BoxBufferGeometry, Mesh} from 'three/build/three.module';
import {addEnvMap} from '../utils/threeUtil';
import guid from '../utils/guid';
const THREE = mapvglThree.THREE;
const eventsList = ['loaded', 'click', 'mouseover', 'mouseout'];

const lightTypes = {
  AmbientLight: THREE.AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight: THREE.DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight: THREE.HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight: THREE.PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight: THREE.RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight: THREE.SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};

function GltfThreeLayer(options) {
  const defaultOptions = this.getDefaultOptions();
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
    userData: null,
    track: {
      focus: false,
      autoRotate: true,
      tilt: 45,
      offsetHeading: 0,
      zoom: 0
    },
    tooltip: {
      offset: {
        x: 0,
        y: -20
      },
      isCustom: false,
      content: ''
    },
    infoWindow: {
      visible: false,
      offset: {
        x: 0,
        y: -20
      },
      anchor: 'bottom',
      content: ''
    }
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
};

GltfThreeLayer.prototype.loadModel = function() {
  const url = this.options.url;
  if (!window.VueMapvglGltfCache) {
    window.VueMapvglGltfCache = {};
  }
  if (window.VueMapvglGltfCache[url] === false) {
    setTimeout(() => {
      this.loadModel();
    }, 20);
    return;
  }
  if (window.VueMapvglGltfCache[url] === undefined) {
    window.VueMapvglGltfCache[url] = false;
  }
  const tempUrl = url.split('?')[0];
  const suffix = tempUrl.substring((tempUrl.lastIndexOf('.') + 1), tempUrl.length);
  if (suffix === 'gltf' || suffix === 'glb') {
    this.loadGltf(url);
  } else if (suffix === 'json') {
    this.loadObject(url);
  }
};

GltfThreeLayer.prototype.loadGltf = function(url) {
  if (window.VueMapvglGltfCache[url] === false) {
    const loader = new GLTFLoader(); // 读取模型
    loader.load(url, (gltf) => {
      window.VueMapvglGltfCache[url] = gltf;
      const object = gltf.scene;
      this.addObject3D(object, gltf.animations);
    });
  } else {
    const gltf = window.VueMapvglGltfCache[url];
    const object = gltf.scene;
    this.addObject3D(object, gltf.animations);
  }
};

/**
 * 加载模型，目前只支持threejs的object模型
 */
GltfThreeLayer.prototype.loadObject = function(url) {
  if (window.VueMapvglGltfCache[url] === false) {
    const objectLoader = new THREE.ObjectLoader(); // 读取模型
    objectLoader.load(url, (object) => {
      window.VueMapvglGltfCache[url] = object;
      this.addObject3D(object);
    });
  } else {
    this.addObject3D(window.VueMapvglGltfCache[url]);
  }
};

GltfThreeLayer.prototype.addObject3D = function(sourceObject, animations) {
  const object = sourceObject.clone(true);
  const options = this.options;
  const data = options.data;
  const coordinates = data.geometry.coordinates;
  const angle = data.angle;
  const autoScale = options.autoScale;
  const scale = options.scale;
  const rotate = options.rotate;
  const translate = options.translate;
  const up = options.up;
  const rotateZ = angle !== undefined ? (Math.PI / 180 * angle) : rotate.z;
  object.scale.set(scale, scale, scale);
  object.translateX(translate.x);
  object.translateY(translate.y);
  object.translateZ(translate.z);
  object.lookAt(up.x, up.y, up.z);
  const mercator = this.convertPosition(coordinates);
  const point = new BMapGL.Point(mercator[0], mercator[1]);
  this.point = point;
  if (autoScale) {
    this.group = this.add(object, point);
  } else {
    this.threeLayer.add(object, point);
    const worldChildren = this.threeLayer.getWorld().children;
    this.group = worldChildren[worldChildren.length - 1];
  }
  if (animations) {
    const mixer = new THREE.AnimationMixer(object);
    const actions = {};

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
  this.refreshRender();
  // if (options.events) {
  const box = new Box3();
  const size = new Vector3();
  const center = new Vector3();
  box.setFromObject(this.object);
  box.getSize(size);
  box.getCenter(center);
  const geometry = new BoxBufferGeometry(size.x, size.y, size.z);
  const material = new MeshBasicMaterial({color: 'rgb(255,255,255)'});
  material.transparent = true;
  material.opacity = 0;
  const cube = new Mesh(geometry, material);
  cube.position.z = size.z / 2;
  cube.sourceObject = this.group;
  cube.renderOrder = 1;
  this.box = cube;
  this.group.add(cube);
  this.threeLayer.eventObjects.push(cube);
  // }
  addEnvMap(object, this.threeLayer);
  this.createLight();
  this.createAnimation();
  this.addEvents();
  this.addOrUpdateTooltip();
  this.addOrUpdateInfoWindow();
  this.emit('loaded', {
    object,
    group: this.group,
    threeLayer: this.threeLayer
  });
};

GltfThreeLayer.prototype.addEvents = function() {
  this.group.events.click = () => {
    this.emit('click', this.group);
  };
  this.group.events.mouseover = () => {
    this.emit('mouseover', this.group);
  };
  this.group.events.mouseout = () => {
    this.emit('mouseout', this.group);
  };
};

/**
 * 移除对象时进行相关对象销毁
 */
GltfThreeLayer.prototype.remove = function() {
  this.threeLayer.getWorld().remove(this.group);
  if (this.moveRequestAnimationFrame) {
    window.cancelAnimationFrame(this.moveRequestAnimationFrame);
  }
  if (this.linerAnimationFrame) {
    window.cancelAnimationFrame(this.linerAnimationFrame);
  }
  if (this.animationGroup) {
    this.animationGroup.removeAll();
    this.animationGroup = null;
  }
  if (this.mapEvents) {
    const map = this.threeLayer.webglLayer.map.map;
    map.removeEventListener('moving', this.mapEvents.moving);
    map.removeEventListener('dragging', this.mapEvents.dragging);
    map.removeEventListener('zooming', this.mapEvents.zooming);
  }
  if (this.group) {
    this.group.object = null;
  }
  this.object = null;
  this.group = null;
  if (this.tooltip) {
    this.tooltip.remove();
    this.tooltip = null;
  }
  if (this.infoWindow) {
    this.infoWindow.remove();
    this.infoWindow = null;
  }
  const index = this.threeLayer.eventObjects.indexOf(this.box);
  if (index > -1) {
    this.threeLayer.eventObjects.splice(index, 1);
  }
  if (this.box) {
    this.box.sourceObject = null;
  }
  this.box = null;
  this.events = null;
  this.updateThreeLayer();
};

GltfThreeLayer.prototype.createLight = function() {
  const lightArray = this.options.light;
  const defaultLightOptions = {
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
        const light = new lightTypes[lightOptions.type](...lightOptions.args);
        const position = lightOptions.position;
        const lookAt = lightOptions.lookAt;
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
  return this.threeLayer.webglLayer.map.lnglatToMercator(coordinates[0], coordinates[1]);
};

/**
 * 将模型添加到地图上
 * @param object  模型的Object3D对象
 * @param point   添加的位置，对象： BMapGL.Point
 */
GltfThreeLayer.prototype.add = function(object, point) {
  this.threeLayer.scene.add(object);
  const threeLayer = this.threeLayer;
  const group = new THREE.Group();
  group.isGeoGroup = true;
  group.object = object;
  group.add(object);
  let offset = [0, 0];
  threeLayer.enabledPointOffset === true && (offset = threeLayer.getPointOffset());
  group.position.x = point.lng - offset[0];
  group.position.y = point.lat - offset[1];
  group.position.z = object.position.z;
  if (this.options.visible === false) {
    group.visible = false;
  }
  group.track = this.options.track;
  threeLayer.getWorld().add(group);
  return group;
};

GltfThreeLayer.prototype.createAnimation = function() {
  const animation = this.options.animation;
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
  const animation = this.options.animation;
  const animationOptions = animation.options;
  const offset = animationOptions.offset;
  const group = this.group;
  const currentPosition = {
    x: group.translate.x || 0,
    y: group.translate.y || 0,
    z: group.translate.z || 0
  };
  const startPosition = {
    x: group.translate.x || 0,
    y: group.translate.y || 0,
    z: group.translate.z || 0
  };
  const endPosition = {
    x: (startPosition.x + offset.x),
    y: (startPosition.y + offset.y),
    z: (startPosition.z + offset.z)
  };
  const prePosition = {
    x: currentPosition.x,
    y: currentPosition.y,
    z: currentPosition.z
  };
  const _this = this;
  function changeGroup() {
    let zoomUnit = _this.threeLayer.webglLayer.map.getZoomUnits();
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
  const animationGroup = this.animationGroup;
  const tweenA = new TWEEN.Tween(currentPosition, animationGroup)
    .to(endPosition)
    .delay(animationOptions.delay)
    .duration(animationOptions.duration)
    .easing(TWEEN.Easing.Cubic.In)
    .onUpdate(() => {
      changeGroup();
    });
  const tweenB = new TWEEN.Tween(currentPosition, animationGroup)
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
  this.linerAnimationFrame = requestAnimationFrame(() => {
    this.animate(callback);
  });
  callback();
};

GltfThreeLayer.prototype.createSelfAnimation = function() {
  const animations = this.object.customAnimations;
  animations.clock = new THREE.Clock();
  for (const name in animations.actions) {
    animations.actions[name].play();
  }
  this.animate(() => {
    const dt = animations.clock.getDelta();
    const mixer = animations.mixer;
    if (mixer) mixer.update(dt);
    this.refreshRender();
  });
};

GltfThreeLayer.prototype.move = function(newPosition) {
  if (!this.group) {
    return;
  }
  const track = this.group.track;
  const map = this.threeLayer.webglLayer.map.map;
  const rotateZ = this.group.rotation.z;
  const angle = newPosition.angle;
  const newRotateZ = angle !== undefined ? (Math.PI / 180 * angle) : rotateZ;
  const moveOption = this.options.move;
  const coordinates = newPosition.geometry.coordinates;
  const mercator = this.convertPosition(coordinates);
  if (!moveOption.smooth || document.visibilityState === 'hidden') {
    this.group.position.x = mercator[0];
    this.group.position.y = mercator[1];
    this.group.rotation.z = newRotateZ;
    if (track && track.focus === true) {
      this.moveMapCenter(map, {
        center: new BMapGL.Point(coordinates[0], coordinates[1]),
        heading: (angle - 90 + (track.offsetHeading || 0)),
        tilt: track.tilt,
        zoom: track.zoom
      }, track);
    }
    if (this.infoWindow) {
      this.changeTipPosition(this.group.position, this.threeLayer.webglLayer.map.map, this.options.infoWindow.offset, this.infoWindow);
    }
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
  const group = this.group;
  const currentPosition = {
    x: group.position.x,
    y: group.position.y,
    rotateZ
  };
  const endPosition = {
    x: mercator[0],
    y: mercator[1],
    rotateZ: newRotateZ
  };
  if (track && track.focus === true) {
    currentPosition.heading = map.getHeading();
    currentPosition.tilt = map.getTilt();
    endPosition.heading = angle + (track.offsetHeading || 0) - 90;
    endPosition.tilt = track.tilt;
    if (track.zoom) {
      currentPosition.zoom = map.getZoom();
      endPosition.zoom = track.zoom;
    }
  }
  new TWEEN.Tween(currentPosition, this.moveGroup)
    .easing(TWEEN.Easing.Linear.None)
    .duration(moveOption.duration)
    .to(endPosition)
    .onUpdate(() => {
      this.group.position.x = currentPosition.x;
      this.group.position.y = currentPosition.y;
      this.group.rotation.z = currentPosition.rotateZ;
      if (track && track.focus === true) {
        // console.log('track', track);
        const lnglat = map.mercatorToLnglat(currentPosition.x, currentPosition.y);
        const p = new BMapGL.Point(lnglat[0], lnglat[1]);
        this.moveMapCenter(map, {
          center: p,
          heading: currentPosition.heading,
          tilt: currentPosition.tilt,
          zoom: currentPosition.zoom
        }, track);
      }
      if (this.infoWindow) {
        this.changeTipPosition(currentPosition, this.threeLayer.webglLayer.map.map, this.options.infoWindow.offset, this.infoWindow);
      }
      this.refreshRender();
    })
    .onComplete(() => {
      window.cancelAnimationFrame(this.moveRequestAnimationFrame);
    }).start();
  this.moveAnimate();
};

GltfThreeLayer.prototype.moveMapCenter = function(map, params, track) {
  clearTimeout(this.moveMapCenterTimer);
  const {center, heading, tilt, zoom} = params;
  if (document.visibilityState === 'hidden') {
    this.moveMapCenterTimer = setTimeout(() => {
      this.moveMapCenter(map, params, track);
    }, 100);
  } else {
    if (zoom) {
      map.setZoom(zoom, {
        noAnimation: true
      });
    }
    map.panTo(center, {
      noAnimation: true
    });
    if (track.autoRotate) {
      map.setHeading(heading, {
        noAnimation: true
      });
      map.setTilt(tilt, {
        noAnimation: true
      });
    }
  }
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
    this.updateThreeLayer();
  }

};

GltfThreeLayer.prototype.hide = function() {
  if (this.group) {
    this.group.visible = false;
    this.updateThreeLayer();
  }
};

GltfThreeLayer.prototype.refreshRender = function() {
  // this.threeLayer.renderer.render(this.threeLayer.scene, this.threeLayer.camera);
  if (this.group.visible) {
    this.updateThreeLayer();
  }
};

GltfThreeLayer.prototype.updateThreeLayer = function() {
  this.threeLayer.needsUpdate = true;
};

GltfThreeLayer.prototype.addEventListener = GltfThreeLayer.prototype.on = function(eventName, handler, isOnce = false) {
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

GltfThreeLayer.prototype.removeEventListener = GltfThreeLayer.prototype.off = function(eventName, handler) {
  if (eventsList.includes(eventName)) {
    const array = this.events.get(eventName);
    if (array) {
      const index = array.indexOf(handler);
      array.splice(index, 1);
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
  const array = this.events.get(eventName);
  if (array) {
    let length = array.length;
    for (let i = 0; i < length; i++) {
      const event = array[i];
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
  if (this.group) {
    this.group.userData = data;
  }
};

GltfThreeLayer.prototype.setTrack = function(track) {
  if (!this.group) {
    return;
  }
  if (!track) {
    this.options.track = undefined;
    this.group.track = undefined;
    return;
  }
  track = merge({}, this.getDefaultOptions().track, track);
  if (track.focus === true) {
    this.threeLayer.getWorld().children.forEach(g => {
      if (g !== this.group) {
        g.track = undefined;
      }
    });
  }
  this.group.track = track;
};

GltfThreeLayer.prototype.addOrUpdateTooltip = function(options = {}) {
  const tooltip = merge({}, this.options.tooltip, options);
  this.options.tooltip = tooltip;
  if (!tooltip || !tooltip.content || !this.group) {
    return;
  }
  const map = this.threeLayer.webglLayer.map.map;
  const content = tooltip.content;
  const isCustom = tooltip.isCustom;
  if (this.tooltip) {
    this.tooltip.innerHTML = content;
  } else {
    const ele = document.createElement('div');
    ele.appendChild(content);
    ele.className = 'bmap-gl-tooltip-container';
    ele.style.display = 'none';
    ele.style.zIndex = '100';
    ele.style.position = 'absolute';
    ele.style.transform = 'translate(-50%,-100%)';
    if (!isCustom) {
      ele.style.background = '#fff';
      ele.style.padding = '5px 10px';
    }
    map.container.appendChild(ele);
    this.tooltip = ele;
    this.on('mouseover', () => {
      this.changeTipPosition(this.group.position, map, tooltip.offset, ele);
      ele.style.display = 'block';
    });
    this.on('mouseout', () => {
      ele.style.display = 'none';
    });
  }

};

GltfThreeLayer.prototype.addOrUpdateInfoWindow = function(options = {}) {
  const infoWindow = merge({}, this.options.infoWindow, options);
  this.options.infoWindow = infoWindow;
  if (!infoWindow || !infoWindow.ele || !this.group) {
    return;
  }
  const map = this.threeLayer.webglLayer.map.map;
  const childEle = infoWindow.ele;
  if (this.infoWindow) {
    if (infoWindow.visible === true) {
      this.infoWindow.style.display = 'block';
    } else {
      this.infoWindow.style.display = 'none';
    }
  } else {
    const ele = document.createElement('div');
    ele.appendChild(childEle);
    ele.className = 'bmap-gl-info-window-container';
    ele.style.display = 'none';
    ele.style.zIndex = '99';
    ele.style.position = 'absolute';
    const anchor = infoWindow.anchor;
    if (anchor === 'bottom') {
      ele.style.transform = 'translate(-50%,-100%)';
    } else if (anchor === 'left') {
      ele.style.transform = 'translate(-100%,-50%)';
    } else if (anchor === 'top') {
      ele.style.transform = 'translate(-50%,0)';
    } else if (anchor === 'right') {
      ele.style.transform = 'translate(0,-50%)';
    } else if (anchor === 'left-top') {
      ele.style.transform = '';
    } else if (anchor === 'left-bottom') {
      ele.style.transform = 'translate(0,-100%)';
    } else if (anchor === 'right-top') {
      ele.style.transform = 'translate(-100%,0)';
    } else if (anchor === 'right-bottom') {
      ele.style.transform = 'translate(-100%,-100%)';
    } else {
      ele.style.transform = 'translate(-50%,-100%)';
    }
    if (infoWindow.visible) {
      ele.style.display = 'block';
    }
    map.container.appendChild(ele);
    this.infoWindow = ele;
    this.changeTipPosition(this.group.position, map, infoWindow.offset, ele);
    this.mapEvents = {
      moving: () => {
        this.changeTipPosition(this.group.position, map, infoWindow.offset, ele);
      },
      dragging: () => {
        this.changeTipPosition(this.group.position, map, infoWindow.offset, ele);
      },
      zooming: () => {
        this.changeTipPosition(this.group.position, map, infoWindow.offset, ele);
      }
    };
    map.addEventListener('moving', this.mapEvents.moving);
    map.addEventListener('dragging', this.mapEvents.dragging);
    map.addEventListener('zooming', this.mapEvents.zooming);
  }
};
GltfThreeLayer.prototype.changeTipPosition = function(position, map, offset, ele) {
  const lnglat = map.mercatorToLnglat(position.x, position.y);
  const pixel = map.pointToPixel(new BMapGL.Point(lnglat[0], lnglat[1]));
  const left = pixel.x + offset.x;
  const top = pixel.y + offset.y;
  ele.style.left = `${left  }px`;
  ele.style.top = `${top  }px`;
};
export default GltfThreeLayer;

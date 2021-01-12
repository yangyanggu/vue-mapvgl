const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');
import {merge} from 'lodash';
const THREE = mapvglThree.THREE;
import {HDRCubeTextureLoader} from '../three-loader/HDRCubeTextureLoader';

// 灯光类型
const lightTypes = {
  AmbientLight: THREE.AmbientLight, // 环境光  环境光会均匀的照亮场景中的所有物体
  DirectionalLight: THREE.DirectionalLight, // 平行光  平行光是沿着特定方向发射的光
  HemisphereLight: THREE.HemisphereLight, // 半球光  光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
  PointLight: THREE.PointLight, // 点光源  从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光
  RectAreaLight: THREE.RectAreaLight, // 平面光光源  平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源
  SpotLight: THREE.SpotLight // 聚光灯  光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
};

/**
 * 通用创建灯光的方法
 * @param lights  灯光配置的数组
 * @param group  需要进行灯光配置的对象
 */
export function createLight(lights, group) {
  if (lights === null || lights.length === 0) {
    console.warn('光源配置不可为空');
    return;
  }
  if (group === null) {
    console.warn('存放光源的group不可为空');
    return;
  }
  let defaultLightOptions = {
    type: 'DirectionalLight', // 灯光类型， 可选值见下面的字典
    args: [] // 灯光初始化时需要的参数，具体参数顺序可以查看threejs官网灯光的说明。 采用 ...args 的方式进行初始化
    /* position: {
      x: 0,
      y: 0,
      z: 0
    }, // 光源的位置
    lookAt: {
      x: 0,
      y: 0,
      z: 0
    } // 光源查看的目标点*/
  };
  if (lights.length > 0) {
    lights.forEach(lightOptions => {
      lightOptions = merge({}, defaultLightOptions, lightOptions);
      if (lightTypes[lightOptions.type]) {
        let light = new lightTypes[lightOptions.type](...lightOptions.args);
        let position = lightOptions.position;
        let lookAt = lightOptions.lookAt;
        if (position) {
          light.position.set(position.x, position.y, position.z);
        }
        if (lookAt) {
          light.lookAt(lookAt.x, lookAt.y, lookAt.z);
        }
        group.add(light);
      } else {
        console.warn('当前设置的灯光类型不存在');
      }
    });
  }
}

/**
 * 创建HDR功能
 * @param options HDR配置
 * @param threeLayer
 */
export function createHDR(options, threeLayer) {
  if (!options.urls) {
    console.warn('HDR贴图不可为空');
    return;
  }
  options = merge({}, {
    urls: '', // HDR贴图下载地址，需要6个文件，代表6个方向
    path: '/', // HDR下载地址的路径前缀
    // roughness: 0.0,
    exposure: 1.0 // 光亮程度
  }, options);
  let render = threeLayer.getRenderer();
  render.physicallyCorrectLights = true;
  render.outputEncoding = THREE.sRGBEncoding;
  render.toneMappingExposure = options.exposure;
  let hdrUrls = options.urls;
  if (!(hdrUrls instanceof Array)) {
    hdrUrls = [hdrUrls];
  }
  const pmremGenerator = new THREE.PMREMGenerator(render);
  pmremGenerator.compileCubemapShader();
  let hdrCubeMap = new HDRCubeTextureLoader()
    .setDataType(THREE.UnsignedByteType)
    .setPath(options.path)
    .load(hdrUrls, () => {
      let hdrCubeRenderTarget = pmremGenerator.fromCubemap(hdrCubeMap);
      hdrCubeMap.magFilter = THREE.LinearFilter;
      hdrCubeMap.needsUpdate = true;
      threeLayer.envMap = hdrCubeRenderTarget ? hdrCubeRenderTarget.texture : null;
      addEnvMap(threeLayer.getWorld(), threeLayer);
    });
}

export function addEnvMap(object, threeLayer) {
  let envMap = threeLayer.envMap;
  if (!envMap) {
    return;
  }
  if (object.material && envMap) {
    object.material.envMap = envMap;
    // object.material.roughness = 0;
    object.material.needsUpdate = true;
  }
  if (object.children && object.children.length > 0) {
    object.children.forEach(o => {
      addEnvMap(o, threeLayer);
    });
  }
  threeLayer.update();
}

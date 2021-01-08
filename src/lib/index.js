// polyfills
import './polyfills';

// 组建导入
import BMapvView from './components/bmapv-view';
import BMapvPointLayer from './components/bmapv-point-layer';
import BMapvIconLayer from './components/bmapv-icon-layer';
import BMapvPointTripLayer from './components/bmapv-point-trip-layer';
import BMapvHeatPointLayer from './components/bmapv-heat-point-layer';
import BMapvHeatMapLayer from './components/bmapv-heat-map-layer';
import BMapvHeatGridLayer from './components/bmapv-heat-grid-layer';
import BMapvSparkLayer from './components/bmapv-spark-layer';
import BMapvCircleLayer from './components/bmapv-circle-layer';
import BMapvRippleLayer from './components/bmapv-ripple-layer';
import BMapvTextLayer from './components/bmapv-text-layer';
import BMapvFanLayer from './components/bmapv-fan-layer';
import BMapvSimpleLineLayer from './components/bmapv-simple-line-layer';
import BMapvLineLayer from './components/bmapv-line-layer';
import BMapvWallLayer from './components/bmapv-wall-layer';
import BMapvHeatLineLayer from './components/bmapv-heat-line-layer';
import BMapvLineFlowLayer from './components/bmapv-line-flow-layer';
import BMapvLineTripLayer from './components/bmapv-line-trip-layer';
import BMapvWallTripLayer from './components/bmapv-wall-trip-layer';
import BMapvFlyLineLayer from './components/bmapv-fly-line-layer';
import BMapvShapeLayer from './components/bmapv-shape-layer';
import BMapvShapeLineLayer from './components/bmapv-shape-line-layer';
import BMapvPolygonLayer from './components/bmapv-polygon-layer';
import BMapvClusterLayer from './components/bmapv-cluster-layer';
import BMapvHoneycombLayer from './components/bmapv-honeycomb-layer';
import BMapvGltfLayer from './components/bmapv-gltf-layer';
import BMapvGltfThreeLayer from './components/bmapv-gltf-three-layer';

const mapvgl = require('mapvgl');

const mapvglThree = require('mapvgl/dist/mapvgl.threelayers.min');

const THREE = mapvglThree.THREE;

const effect = {
  BloomEffect: mapvgl.BloomEffect,
  BrightEffect: mapvgl.BrightEffect
};

const util = {
  Intensity: mapvgl.Intensity,
  BezierCurve: mapvgl.BezierCurve,
  GeodesicCurve: mapvgl.GeodesicCurve,
  OdCurve: mapvgl.OdCurve
};

let components = [
  BMapvView,
  BMapvPointLayer,
  BMapvIconLayer,
  BMapvPointTripLayer,
  BMapvHeatPointLayer,
  BMapvHeatMapLayer,
  BMapvHeatGridLayer,
  BMapvSparkLayer,
  BMapvCircleLayer,
  BMapvRippleLayer,
  BMapvTextLayer,
  BMapvFanLayer,
  BMapvSimpleLineLayer,
  BMapvLineLayer,
  BMapvWallLayer,
  BMapvHeatLineLayer,
  BMapvLineFlowLayer,
  BMapvLineTripLayer,
  BMapvWallTripLayer,
  BMapvFlyLineLayer,
  BMapvShapeLayer,
  BMapvShapeLineLayer,
  BMapvPolygonLayer,
  BMapvClusterLayer,
  BMapvHoneycombLayer,
  BMapvGltfLayer,
  BMapvGltfThreeLayer
];

const install = function(Vue) {
  components.map(_component => {
    // register component
    Vue.component(_component.name, _component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
export {
  effect,
  util,
  mapvgl,
  mapvglThree,
  THREE
};


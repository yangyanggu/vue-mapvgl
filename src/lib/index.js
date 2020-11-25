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
  BMapvFanLayer
];

const install = function(Vue, opts = {}) {
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


// polyfills
import './polyfills';

// 组建导入
import BMapvView from './components/bmapv-view';
import BMapvPointLayer from './components/bmapv-point-layer';

let components = [
  BMapvView,
  BMapvPointLayer
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


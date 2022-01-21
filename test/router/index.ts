import {createRouter, createWebHashHistory} from "vue-router";

import BarLayer from '../views/BarLayer.vue';
import CircleLayer from '../views/CircleLayer.vue';
import ClusterLayer from '../views/ClusterLayer.vue';
import FanLayer from '../views/FanLayer.vue';
import FlyLineLayer from '../views/FlyLineLayer.vue';
import GltfLayer from '../views/GltfLayer.vue';
import HeatGridLayer from '../views/HeatGridLayer.vue';
import HeatLineLayer from '../views/HeatLineLayer.vue';
import HeatMapLayer from '../views/HeatMapLayer.vue';
import HeatPointLayer from '../views/HeatPointLayer.vue';
import HoneycombLayer from '../views/HoneycombLayer.vue';
import IconLayer from '../views/IconLayer.vue';
import LineFlowLayer from '../views/LineFlowLayer.vue';
import LineLayer from '../views/LineLayer.vue';
import LineTripLayer from '../views/LineTripLayer.vue';
import MarkerListLayer from '../views/MarkerListLayer.vue';
import PointLayer from '../views/PointLayer.vue';
import PointTripLayer from '../views/PointTripLayer.vue';
import PolygonLayer from '../views/PolygonLayer.vue';
import RippleLayer from '../views/RippleLayer.vue';
import ShapeLayer from '../views/ShapeLayer.vue';
import ShapeLineLayer from '../views/ShapeLineLayer.vue';
import SimpleLineLayer from '../views/SimpleLineLayer.vue';
import SparkLayer from '../views/SparkLayer.vue';
import TextLayer from '../views/TextLayer.vue';
import WallLayer from '../views/WallLayer.vue';
import WallTripLayer from '../views/WallTripLayer.vue';
import GltfThreeLayer from '../views/GltfThreeLayer.vue';

const routes = [
  {path: '/', component: BarLayer},
  {path: '/circle', component: CircleLayer},
  {path: '/cluster', component: ClusterLayer},
  {path: '/fan', component: FanLayer},
  {path: '/flyLine', component: FlyLineLayer},
  {path: '/gltf', component: GltfLayer},
  {path: '/heatGrid', component: HeatGridLayer},
  {path: '/heatLine', component: HeatLineLayer},
  {path: '/heatMap', component: HeatMapLayer},
  {path: '/heatPoint', component: HeatPointLayer},
  {path: '/honeycomb', component: HoneycombLayer},
  {path: '/icon', component: IconLayer},
  {path: '/lineFlow', component: LineFlowLayer},
  {path: '/line', component: LineLayer},
  {path: '/lineTrip', component: LineTripLayer},
  {path: '/markerList', component: MarkerListLayer},
  {path: '/point', component: PointLayer},
  {path: '/pointTrip', component: PointTripLayer},
  {path: '/polygon', component: PolygonLayer},
  {path: '/ripple', component: RippleLayer},
  {path: '/shape', component: ShapeLayer},
  {path: '/shapeLine', component: ShapeLineLayer},
  {path: '/simpleLine', component: SimpleLineLayer},
  {path: '/spark', component: SparkLayer},
  {path: '/text', component: TextLayer},
  {path: '/wall', component: WallLayer},
  {path: '/wallTrip', component: WallTripLayer},
  {path: '/gltfThree', component: GltfThreeLayer},
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})

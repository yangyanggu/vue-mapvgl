import * as mapvgl from 'mapvgl/dist/mapvgl.min'
import * as mapvglThree from 'mapvgl/dist/mapvgl.threelayers.min'
export * from './View'
export * from './BarLayer'
export * from './CircleLayer'
export * from './ClusterLayer'
export * from './FanLayer'
export * from './FlyLineLayer'
export * from './GltfLayer'
export * from './HeatGridLayer'
export * from './HeatLineLayer'
export * from './HeatMapLayer'
export * from './HeatPointLayer'
export * from './HoneycombLayer'
export * from './IconLayer'
export * from './LineFlowLayer'
export * from './LineLayer'
export * from './LineTripLayer'
export * from './MarkerListLayer'
export * from './PointLayer'
export * from './PointTripLayer'
export * from './PolygonLayer'
export * from './RippleLayer'
export * from './ShapeLayer'
export * from './ShapeLineLayer'
export * from './SimpleLineLayer'
export * from './SparkLayer'
export * from './TextLayer'
export * from './WallLayer'
export * from './WallTripLayer'

export * from './ThreeView'
export * from './GltfThreeLayer'


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

export {
  effect,
  util,
  mapvgl,
  mapvglThree,
  THREE
}

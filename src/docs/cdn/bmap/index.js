!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define("VueBMap",["vue"],e):"object"==typeof exports?exports.VueBMap=e(require("vue")):t.VueBMap=e(t.Vue)}(window,(function(t){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s=2)}([function(e,n){e.exports=t},function(t,e,n){"use strict";var i=n(3);t.exports=function(){var t=i.apply(i,arguments);return t.charAt(0).toUpperCase()+t.slice(1)}},function(t,e,n){t.exports=n(4)},function(t,e,n){"use strict";t.exports=function(){var t=[].map.call(arguments,(function(t){return t.trim()})).filter((function(t){return t.length})).join("-");return t.length?1!==t.length&&/[_.\- ]+/.test(t)?t.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(t,e){return e.toUpperCase()})):t[0]===t[0].toLowerCase()&&t.slice(1)!==t.slice(1).toLowerCase()?t:t.toLowerCase():""}},function(t,e,n){"use strict";n.r(e),n.d(e,"BMapManager",(function(){return M})),n.d(e,"initBMapApiLoader",(function(){return m})),n.d(e,"createCustomComponent",(function(){return G})),n.d(e,"lazyBMapApiLoaderInstance",(function(){return u}));var i=n(1),o=n.n(i),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};var s={ak:null,v:"1.0",type:"webgl",protocol:"https",hostAndPath:"api.map.baidu.com/api",callback:"bmapInitComponent",plugins:""},a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=r({},s,e),this._document=document,this._window=window,this._scriptLoaded=!1}return t.prototype.load=function(){var t=this;if(this._scriptLoadingPromise)return this._scriptLoadingPromise;var e=this._document.createElement("script");return e.type="text/javascript",e.async=!0,e.defer=!0,e.src=this._getScriptSrc(),this._scriptLoadingPromise=new Promise((function(n,i){t._window.bmapInitComponent=function(){t._loadPlugins((function(){n()}))},e.onerror=function(t){return i(t)}})),this._document.head.appendChild(e),this._scriptLoadingPromise},t.prototype._getScriptSrc=function(){var t=this._config,e=["v","ak","type","callback"],n=Object.keys(t).filter((function(t){return~e.indexOf(t)})).filter((function(e){return null!=t[e]})).filter((function(e){return!Array.isArray(t[e])||Array.isArray(t[e])&&t[e].length>0})).map((function(e){var n=t[e];return Array.isArray(n)?{key:e,value:n.join(",")}:{key:e,value:n}})).map((function(t){return t.key+"="+t.value})).join("&");return this._config.protocol+"://"+this._config.hostAndPath+"?"+n},t.prototype._loadPlugins=function(t){var e=this;if(this._config.plugins&&""!==this._config.plugins.trim()){var n=this._config.plugins.split(",");if(n.length>0){var i=n.length,o=0;n.forEach((function(n){if(""!==(n=n.trim())){var r=e._getPluginSrc(n),s=e._document.createElement("script");s.type="text/javascript",s.src=r,e._document.head.appendChild(s),s.addEventListener("load",(function(){o++,i===o&&t()}))}else i--}))}else t()}else t()},t.prototype._getPluginSrc=function(t){return"//mapopen.bj.bcebos.com/github/BMapGLLib/"+t+"/src/"+t+".min.js"},t}(),p=n(0),l=n.n(p),u=null,m=function(t){l.a.prototype.$isServer||u||(u||(u=new a(t)),u.load())};var h="BMAP_READY_EVENT";function c(t){return t&&Array.isArray(t)?new BMapGL.Size(t[0],t[1]):null}function d(t){return Array.isArray(t)?t:[t.x,t.y]}function f(t){return t&&Array.isArray(t)?new BMapGL.Point(t[0],t[1]):null}function b(t){return t?[t.lng,t.lat]:null}var y={position:f,offset:c};var v=void 0,g=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._listener=new Map}return t.prototype.addListener=function(t,e,n,i){if(!BMapGL)throw new Error("please wait for Map API load");t.on(e,n,i),this._listener.get(t)||this._listener.set(t,{});var o=this._listener.get(t);o[e]||(o[e]=[]),o[e].push(n)},t.prototype.removeListener=function(t,e,n){if(!BMapGL)throw new Error("please wait for Map API load");if(this._listener.get(t)&&this._listener.get(t)[e]){var i=this._listener.get(t)[e];if(n){var o=i.indexOf(n);t.removeEventListener(e,i[o]),i.splice(o,1)}else i.forEach((function(n){t.removeEventListener(e,n)})),this._listener.get(t)[e]=[]}},t.prototype.addListenerOnce=function(t,e,n,i){return t.on(e,n,i,!0)},t.prototype.trigger=function(t,e,n){return t.emit(e,n)},t.prototype.clearListeners=function(t){var e=this._listener.get(t);e&&Object.keys(e).map((function(n){e[n].forEach((function(e){t.removeEventListener(n,e)}))}))},t}(),C=v=v||new g,$={data:function(){return{unwatchFns:[]}},mounted:function(){var t=this;u&&u.load().then((function(){t.__contextReady&&t.__contextReady.call(t,t.convertProps())})),this.$bmap=this.$bmap||this.$parent.$bmap,this.$bmap?this.register():this.$on(h,(function(e){t.$bmap=e,t.register()}))},destroyed:function(){this.unregisterEvents(),this.$bmapComponent&&(this.$bmapComponent.setMap&&this.$bmapComponent.setMap(null),this.$bmapComponent.close&&this.$bmapComponent.close(),this.$bmapComponent.editor&&this.$bmapComponent.editor.close(),this.unwatchFns.forEach((function(t){return t()})),this.unwatchFns=[])},methods:{getHandlerFun:function(t){var e=this;return this.handlers&&this.handlers[t]?this.handlers[t]:t.startsWith("enable")?function(n){var i=t;n||(i=i.replace("enable","disable"));var o=e.$bmapComponent[i];o&&o.call(e.$bmapComponent)}:this.$bmapComponent["set"+o()(t)]},convertProps:function(){var t=this,e={};this.$bmap&&(e.map=this.$bmap);var n=this.$options.propsData,i=void 0===n?{}:n,o=this.propsRedirect;return Object.keys(i).reduce((function(n,r){var s=r,a=t.convertSignalProp(s,i[s]);return void 0===a||(o&&o[r]&&(s=o[s]),e[s]=a),n}),e)},convertSignalProp:function(t,e){if(this.converters&&this.converters[t])return this.converters[t].call(this,e);var n=y[t];return n?n(e):e},registerEvents:function(){if(this.setEditorEvents&&this.setEditorEvents(),this.$options.propsData){if(this.$options.propsData.events)for(var t in this.events)C.addListener(this.$bmapComponent,t,this.events[t]);if(this.$options.propsData.onceEvents)for(var e in this.onceEvents)C.addListenerOnce(this.$bmapComponent,e,this.onceEvents[e])}},unregisterEvents:function(){C.clearListeners(this.$bmapComponent)},setPropWatchers:function(){var t=this,e=this.propsRedirect,n=this.$options.propsData,i=void 0===n?{}:n;Object.keys(i).forEach((function(n){var i=n;e&&e[n]&&(i=e[n]);var o=t.getHandlerFun(i);if(o||"events"===n){var r=t.$watch(n,(function(e){return"events"===n?(t.unregisterEvents(),void t.registerEvents()):o&&o===t.$bmapComponent.setOptions?o.call(t.$bmapComponent,((r={})[i]=t.convertSignalProp(n,e),r)):void o.call(t.$bmapComponent,t.convertSignalProp(n,e));var r}));t.unwatchFns.push(r)}}))},registerToManager:function(){var t=this.bmapManager||this.$parent.bmapManager;t&&void 0!==this.vid&&t.setComponent(this.vid,this.$bmapComponent)},initProps:function(){var t=this;["editable","visible"].forEach((function(e){if(void 0!==t[e]){var n=t.getHandlerFun(e);n&&n.call(t.$bmapComponent,t.convertSignalProp(e,t[e]))}}))},printReactiveProp:function(){var t=this;Object.keys(this._props).forEach((function(e){t.$bmapComponent["set"+o()(e)]&&console.log(e)}))},register:function(){var t=this,e=this.__initComponent&&this.__initComponent(this.convertProps());e&&e.then?e.then((function(e){return t.registerRest(e)})):this.registerRest(e)},registerRest:function(t){!this.$bmapComponent&&t&&(this.$bmapComponent=t),this.registerEvents(),this.initProps(),this.setPropWatchers(),this.registerToManager(),this.events&&this.events.init&&this.events.init(this.$bmapComponent,this.$bmap,this.bmapManager||this.$parent.bmapManager)},$$getInstance:function(){return this.$bmapComponent}}};var M=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._componentMap=new Map,this._map=null}return t.prototype.setMap=function(t){this._map=t},t.prototype.getMap=function(){return this._map},t.prototype.setComponent=function(t,e){this._componentMap.set(t,e)},t.prototype.getComponent=function(t){return this._componentMap.get(t)},t.prototype.getChildInstance=function(t){return this.getComponent(t)},t.prototype.removeComponent=function(t){this._componentMap.delete(t)},t}();function A(t,e,n,i,o,r,s,a){var p,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),s?(p=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=p):o&&(p=a?function(){o.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:o),p)if(l.functional){l._injectStyles=p;var u=l.render;l.render=function(t,e){return p.call(e),u(t,e)}}else{var m=l.beforeCreate;l.beforeCreate=m?[].concat(m,p):[p]}return{exports:t,options:l}}var w=A({name:"el-bmap",mixins:[$],props:{vid:{type:[String,Number]},center:{type:Array,validator:function(t){return t&&2===t.length}},zoom:{type:Number},minZoom:{type:Number},maxZoom:{type:Number},mapType:{type:String,validator:function(t){return-1!==["B_NORMAL_MAP","B_EARTH_MAP"].indexOf(t)}},tilt:{type:Number},heading:{type:Number},enableAutoResize:{type:Boolean},enableDragging:{type:Boolean},enableInertialDragging:{type:Boolean},enableScrollWheelZoom:{type:Boolean,default:!0},enableContinuousZoom:{type:Boolean},enableResizeOnCenter:{type:Boolean},enableDoubleClickZoom:{type:Boolean},enableKeyboard:{type:Boolean},enablePinchToZoom:{type:Boolean},enableRotateGestures:{type:Boolean},enableTiltGestures:{type:Boolean},bounds:{type:Array},draggingCursor:{type:String},defaultCursor:{type:String},mapStyleV2:{type:Object},trafficVisible:{type:Boolean},bmapManager:{type:M},events:{type:Object},lazy:{type:Number,default:-1}},beforeCreate:function(){this._loadPromise=u.load()},destroyed:function(){this.$bmap&&this.$bmap.destroy()},computed:{},data:function(){return{converters:{center:function(t){return f(t)},bounds:function(t){return new BMapGL.Bounds(f(t[0]),f(t[1]))}},handlers:{center:function(t){if(this.setCenter){var e=this.getTilt(),n=this.getHeading();this.setCenter(t,{noAnimation:!1,tilt:e,heading:n})}},trafficVisible:function(t){t?this.setTrafficOn():this.setTrafficOff()},mapStyleV2:function(t){this.setMapStyleV2(t)}}}},mounted:function(){this.lazyLoadMap()},methods:{lazyLoadMap:function(){var t=this;this._loadPromise.then((function(){t.lazy<0?t.createMap():setTimeout((function(){t.createMap()}),t.lazy)}))},createMap:function(){var t=this,e=this.$el.querySelector(".el-vue-bmap"),n=this.vid||function(){for(var t=[],e=0;e<36;e++)t[e]="0123456789abcdef".substr(Math.floor(16*Math.random()),1);return t[14]="4",t[19]="0123456789abcdef".substr(3&t[19]|8,1),t[8]=t[13]=t[18]=t[23]="-",t.join("")}();e.id=n;var i=this.convertProps();this.$bmap=this.$bmapComponent=new BMapGL.Map(n,i),this.$bmap.centerAndZoom(f(this.center),this.zoom),this.$bmap.enableScrollWheelZoom(!0),void 0!==i.tilt&&this.$bmap.setTilt(i.tilt),void 0!==i.heading&&this.$bmap.setHeading(i.heading),i.trafficVisible&&this.$bmap.setTrafficOn(),i.mapStyleV2&&this.$bmap.setMapStyleV2(i.mapStyleV2),i.defaultCursor&&this.$bmap.setDefaultCursor(i.defaultCursor),i.bounds&&this.$bmap.setBounds(i.bounds),Object.keys(i).forEach((function(e){if(e.startsWith("enable")){var n=t.getHandlerFun(e);n&&n(i[e])}})),this.bmapManager&&this.bmapManager.setMap(this.$bmap),this.$emit(h,this.$bmap),this.$children.forEach((function(e){e.$emit(h,t.$bmap)}))}},beforeDestroy:function(){this.$bmap&&(this.$bmap.clearOverlays(),this.$bmap.destroy(),this.$bmap=null)}},(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"el-vue-bmap-container"},[e("div",{staticClass:"el-vue-bmap"}),this._v(" "),this._t("default")],2)}),[],!1,null,null,null).exports,S=A({name:"el-bmap-marker",mixins:[$],props:{vid:{type:[String,Number]},position:{type:Array,required:!0},offset:{type:Array},icon:{type:Object},enableMassClear:{type:Boolean},enableDragging:{type:Boolean},enableClicking:{type:Boolean},raiseOnDrag:{type:Boolean,default:!1},draggingCursor:{type:String},rotation:{type:Number},visible:{type:Boolean,default:!0},title:{type:String},label:{type:Object},events:{type:Object}},data:function(){return{converters:{position:function(t){return f(t)},offset:function(t){return c(t)},icon:function(t){if(!t)return null;var e=t.url,n=t.size,i=void 0===n?[16,16]:n,o=t.imageSize,r=t.imageOffset,s=void 0===r?[0,0]:r,a=t.anchor,p=void 0===a?[0,0]:a;return new BMapGL.Icon(e,c(i),{imageOffset:c(s),anchor:c(p),imageSize:o||c(i)})},label:function(t){if(!t)return null;var e=t.content,n=void 0===e?"":e,i=t.offset,o=void 0===i?[0,0]:i,r=t.enableMassClear,s=t.style,a=t.title,p=void 0===a?"":a,l=t.zIndex,u=new BMapGL.Label(n,{title:p,offset:c(o),enableMassClear:void 0===r||r});return s&&u.setStyle(s),void 0!==l&&u.setZIndex(l),u}},handlers:{visible:function(t){!1===t?this.hide():this.show()}}}},created:function(){},methods:{__initComponent:function(t){var e=this;this.$bmapComponent=new BMapGL.Marker(t.position,t),t.map.addOverlay(this.$bmapComponent),!1===t.visible&&this.$nextTick((function(){e.$bmapComponent.hide()}))},$$getPosition:function(){return b(this.$bmapComponent.getPosition())},$$getOffset:function(){return d(this.$bmapComponent.getOffset())}},render:function(){return null},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},void 0,void 0,!1,null,null,null).exports,O=A({name:"el-bmap-marker-3d",mixins:[$],props:{vid:{type:[String,Number]},height:{type:Number,default:0,required:!0},position:{type:Array},size:{type:Number},icon:{type:Object},shape:{type:Number,validator:function(t){return-1!==[1,2].indexOf(t)}},fillColor:{type:String},fillOpacity:{type:Number},events:{type:Object}},data:function(){return{converters:{position:function(t){return f(t)},icon:function(t){if(!t)return null;var e=t.url,n=t.size,i=void 0===n?[16,16]:n,o=t.imageSize,r=t.imageOffset,s=void 0===r?[-8,-8]:r,a=t.anchor,p=void 0===a?[0,0]:a;return new BMapGL.Icon(e,c(i),{imageOffset:c(s),anchor:c(p),imageSize:o||c(i)})}},handlers:{}}},created:function(){},methods:{__initComponent:function(t){this.$bmapComponent=new BMapGL.Marker3D(t.position,t.height,t),t.map.addOverlay(this.$bmapComponent)},$$getPosition:function(){return b(this.$bmapComponent.getPosition())},$$getSize:function(){return d(this.$bmapComponent.getSize())}},render:function(){return null},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},void 0,void 0,!1,null,null,null).exports,_=A({name:"el-bmap-ground-overlay",mixins:[$],props:{vid:{type:[String,Number]},opacity:{type:Number},type:{type:String,validator:function(t){return-1!==["image","video","canvas"].indexOf(t)}},url:{type:[String,HTMLElement],required:!0},bounds:{type:Array,required:!0},visible:{type:Boolean,default:!0},events:{type:Object}},data:function(){return{propsRedirect:{},converters:{bounds:function(t){return new BMapGL.Bounds(f(t[0]),f(t[1]))}},handlers:{visible:function(t){!1===t?this.hide():this.show()}}}},methods:{__initComponent:function(t){var e=this;this.$bmapComponent=new BMapGL.GroundOverlay(t.bounds,t),t.map.addOverlay(this.$bmapComponent),!1===t.visible&&this.$nextTick((function(){e.$bmapComponent.hide()}))}},render:function(){return null},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},void 0,void 0,!1,null,null,null).exports,B=A({name:"el-bmap-info-window",mixins:[$],props:{vid:{type:[String,Number]},title:{type:[String,HTMLElement]},content:{type:[String,HTMLElement]},width:{type:Number},height:{type:Number},maxWidth:{type:Number},offset:{type:Array},position:{type:Array},visible:{type:Boolean,default:!0},enableAutoPan:{type:Boolean},enableCloseOnClick:{type:Boolean},events:{type:Object}},data:function(){var t=this;return{withSlots:!1,tmpVM:null,propsRedirect:{template:"content",vnode:"content",contentRender:"content"},converters:{offset:function(t){return c(t)}},handlers:{visible:function(e){var n=t.position;n&&(!1===e?t.$bmap.closeInfoWindow():t.$bmap.openInfoWindow(t.$bmapComponent,f(n)))},template:function(t){this.setContent(t)},content:function(e){t.$bmapComponent.setContent(e),t.$bmapComponent.redraw()},title:function(e){t.$bmapComponent.setTitle(e),t.$bmapComponent.redraw()},position:function(e){!1!==t.visible&&t.$bmap.openInfoWindow(t.$bmapComponent,e)}}}},created:function(){this.tmpVM=new l.a({data:function(){return{node:""}},render:function(t){var e=this.node;return t("div",{ref:"node"},Array.isArray(e)?e:[e])}}).$mount()},destroyed:function(){this.$bmap.closeInfoWindow(),this.tmpVM.$destroy(),this.tmpVM=null,this.$customContent&&this.$customContent.$destroy&&(this.$customContent.$destroy(),this.$bmapComponent=null)},methods:{__initComponent:function(t){this.$slots.default&&this.$slots.default.length&&(t.content=this.tmpVM.$refs.node),delete t.map,this.$bmapComponent=new BMapGL.InfoWindow(t.content,t),!1!==this.visible&&this.$bmap.openInfoWindow(this.$bmapComponent,f(this.position))}},render:function(){var t=this.$slots.default||[];return t.length&&(this.tmpVM.node=t),null}},void 0,void 0,!1,null,null,null).exports,x=A({name:"el-bmap-circle",mixins:[$],props:{vid:{type:[String,Number]},zIndex:{type:Number},center:{type:Array},radius:{type:Number},strokeColor:{type:String},strokeOpacity:{type:Number},strokeWeight:{type:Number},fillColor:{type:String},fillOpacity:{type:Number},strokeStyle:{type:String,validator:function(t){return-1!==["solid","dashed"].indexOf(t)}},enableMassClear:{type:Boolean},enableEditing:{type:Boolean},enableClicking:{type:Boolean},visible:{type:Boolean,default:!0},events:{type:Object}},data:function(){return{converters:{center:function(t){return f(t)}},handlers:{visible:function(t){!1===t?this.hide():this.show()}}}},methods:{__initComponent:function(t){var e=this;this.$bmapComponent=new BMapGL.Circle(t.center,t.radius,t),t.map.addOverlay(this.$bmapComponent),!1===t.visible&&this.$nextTick((function(){e.$bmapComponent.hide()}))},$$getCenter:function(){return b(this.$bmapComponent.getCenter())},$$getRadius:function(){return this.$bmapComponent.getRadius()}},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},(function(){var t=this.$createElement;return(this._self._c||t)("div")}),[],!1,null,null,null).exports,P=A({name:"el-bmap-polygon",mixins:[$],props:{vid:{type:[String,Number]},path:{type:Array,required:!0},strokeColor:{type:String},strokeOpacity:{type:Number},strokeWeight:{type:Number},strokeStyle:{type:String,validator:function(t){return-1!==["solid","dashed"].indexOf(t)}},fillColor:{type:String},fillOpacity:{type:Number},enableMassClear:{type:Boolean,default:!0},enableEditing:{type:Boolean,default:!1},events:{type:Object}},data:function(){return{converters:{path:function(t){return Array.isArray(t)?t.map(f):[]}},handlers:{path:function(t){this.setPath(t),this._config.enableEditing&&(this.disableEditing(),this.enableEditing())}}}},methods:{__initComponent:function(t){this.$bmapComponent=new BMapGL.Polygon(t.path,t),t.map.addOverlay(this.$bmapComponent)},$$getPath:function(){return this.$bmapComponent.getPath().map(b)}},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},(function(){var t=this.$createElement;return(this._self._c||t)("div")}),[],!1,null,null,null).exports,E=A({name:"el-bmap-polyline",mixins:[$],props:{vid:{type:[String,Number]},geodesic:{type:Boolean},clip:{type:Boolean,default:!0},path:{type:Array,required:!0},strokeColor:{type:String},strokeOpacity:{type:Number},strokeWeight:{type:Number},strokeStyle:{type:String,validator:function(t){return-1!==["solid","dashed"].indexOf(t)}},enableMassClear:{type:Boolean,default:!0},enableEditing:{type:Boolean,default:!1},enableClicking:{type:Boolean},events:{type:Object}},data:function(){return{converters:{path:function(t){return Array.isArray(t)?t.map(f):[]}},handlers:{path:function(t){this.setPath(t),this._config.enableEditing&&(this.disableEditing(),this.enableEditing())}}}},methods:{__initComponent:function(t){this.$bmapComponent=new BMapGL.Polyline(t.path,t),t.map.addOverlay(this.$bmapComponent)},$$getPath:function(){return this.$bmapComponent.getPath().map(b)}},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},(function(){var t=this.$createElement;return(this._self._c||t)("div")}),[],!1,null,null,null).exports,k=A({name:"el-bmap-label",mixins:[$],props:{vid:{type:[String,Number]},content:{type:String},position:{type:Array},offset:{type:Array},title:{type:String},labelStyle:{type:Object},enableMassClear:{type:Boolean},visible:{type:Boolean,default:!0},events:{type:Object},isCustom:{type:Boolean}},data:function(){return{preHtml:"",tmpVM:null,propsRedirect:{labelStyle:"style"},converters:{position:function(t){return f(t)},offset:function(t){return c(t)}},handlers:{visible:function(t){!1===t?this.hide():this.show()},position:function(t){this.setPosition(t)}}}},methods:{__initComponent:function(t){var e=this;this.$bmapComponent=new BMapGL.Label(t.content,t),t.map.addOverlay(this.$bmapComponent),t.style&&this.$bmapComponent.setStyle(t.style),t.isCustom&&this.$bmapComponent.setStyle({border:"none",background:"none"}),this.$slots.default&&this.$slots.default.length&&this.$nextTick((function(){e.preHtml=e.tmpVM.$refs.node.outerHTML,e.$bmapComponent.setContent(e.preHtml)})),!1===t.visible&&this.$nextTick((function(){e.$bmapComponent.hide()}))}},created:function(){this.tmpVM=new l.a({data:function(){return{node:""}},render:function(t){var e=this.node;return t("div",{ref:"node"},Array.isArray(e)?e:[e])}}).$mount()},updated:function(){var t=this;this.$nextTick((function(){var e=t.tmpVM.$refs.node.outerHTML;t.preHtml!==e&&(t.$bmapComponent&&t.$bmapComponent.setContent(e),t.preHtml=e)}))},destroyed:function(){this.tmpVM&&this.tmpVM.$destroy(),this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null,this.tmpVM=null)},render:function(){var t=this.$slots.default||[];return t.length&&(this.tmpVM.node=t),null}},void 0,void 0,!1,null,null,null).exports,j=A({name:"el-bmap-bezier-curve",mixins:[$],props:{vid:{type:[String,Number]},path:{type:Array},controlPoints:{type:Array},strokeColor:{type:String},strokeOpacity:{type:Number},strokeWeight:{type:Number},strokeStyle:{type:String,validator:function(t){return-1!==["solid","dashed"].indexOf(t)}},enableMassClear:{type:Boolean},visible:{type:Boolean,default:!0},events:{type:Object}},data:function(){return{converters:{path:function(t){return Array.isArray(t)?t.map(f):[]},controlPoints:function(t){return Array.isArray(t)?t.map(f):[]}},handlers:{visible:function(t){!1===t?this.hide():this.show()}}}},methods:{__initComponent:function(t){var e=this;this.$bmapComponent=new BMapGL.BezierCurve(t.path,t.controlPoints,t),t.map.addOverlay(this.$bmapComponent),!1===t.visible&&this.$nextTick((function(){e.$bmapComponent.hide()}))},$$getPath:function(){return this.$bmapComponent.getPath().map(b)},$$getControlPoints:function(){return this.$bmapComponent.getControlPoints().map(b)}},render:function(){return null},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},void 0,void 0,!1,null,null,null).exports,N=A({name:"el-bmap-prism",mixins:[$],props:{vid:{type:[String,Number]},path:{type:Array,required:!0},altitude:{type:Number},topFillColor:{type:String},topFillOpacity:{type:Number},sideFillColor:{type:String},sideFillOpacity:{type:Number},enableMassClear:{type:Boolean},events:{type:Object}},data:function(){return{converters:{path:function(t){return Array.isArray(t)?t.map(f):[]}},handlers:{}}},methods:{__initComponent:function(t){this.$bmapComponent=new BMapGL.Prism(t.path,t.altitude,t),t.map.addOverlay(this.$bmapComponent)},$$getPath:function(){return this.$bmapComponent.getPath().map(b)}},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeOverlay(this.$bmapComponent),this.$bmapComponent=null)}},(function(){var t=this.$createElement;return(this._self._c||t)("div")}),[],!1,null,null,null).exports,L=A({name:"el-bmap-menu",mixins:[$],props:{vid:{type:[String,Number]},events:{type:Object}},data:function(){return{converters:{},handlers:{}}},methods:{__initComponent:function(t){var e=this;this.$bmapComponent=new BMapGL.ContextMenu,t.map.addContextMenu(this.$bmapComponent),this.$children.forEach((function(t){t.$emit(h,e.$bmap)}))}},destroyed:function(){this.$bmapComponent&&this.$bmapComponent.getMap()&&(this.$bmapComponent.getMap().removeContextMenu(this.$bmapComponent),this.$bmapComponent=null)}},(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._t("default")],2)}),[],!1,null,null,null).exports,V=A({name:"el-bmap-menu-item",mixins:[$],props:{text:{type:String},enable:{type:Boolean,default:!0},width:{type:Number},domId:{type:String},callback:{type:Function}},data:function(){return{propsRedirect:{domId:"id"},converters:{},handlers:{}}},methods:{__initComponent:function(t){var e=this.$parent.$bmapComponent,n={};t.width&&(n.width=t.width),t.id&&(n.id=t.id),this.$bmapComponent=new BMapGL.MenuItem(t.text,t.callback,n),e.addItem(this.$bmapComponent),!1===t.enable&&this.$bmapComponent.disable()}},render:function(){return null},destroyed:function(){this.$bmapComponent&&this.$parent.$bmapComponent&&(this.$parent.$bmapComponent.removeItem(this.$bmapComponent),this.$bmapComponent=null)}},void 0,void 0,!1,null,null,null).exports,z=null,T=A({name:"el-bmap-track",mixins:[$],props:{icon:{type:Object,default:function(){return{url:"data:image/png;base64,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",size:[58,58]}}},onlyView:{type:Boolean,default:!0},position:{required:!0,type:Array},offset:{type:Array},heading:{type:Number,default:0},autoStart:{type:Boolean,default:!1},events:{type:Object}},data:function(){return{mapSize:{width:0,height:0},offsetSize:{x:0,y:0},iconVisible:!1,tilt:0,pixelLngLatScale:{x:1,y:1},preParentDomStyle:{overflow:"",height:"",width:""},converters:{position:function(t){return t}},handlers:{position:function(t){if(z&&z.iconVisible&&this.isLoaded()){var e=new BMapGL.Point(t[0],t[1]),n={noAnimation:!1,tilt:this.getTilt(),heading:this.getHeading()};this.setCenter(e,n)}},offset:function(){},heading:function(){},onlyView:function(t){t?(this.disableDragging(),this.disableScrollWheelZoom(),this.disableContinuousZoom(),this.disableDoubleClickZoom(),this.disableKeyboard(),this.disablePinchToZoom()):(this.enableDragging(),this.enableScrollWheelZoom(),this.enableContinuousZoom(),this.enableDoubleClickZoom(),this.enableKeyboard(),this.enablePinchToZoom())}}}},computed:{iconStyle:function(){var t={};return t.width=this.icon.size[0]+"px",t.height=this.icon.size[1]+"px",this.offset&&this.offset.length>0?(t.left=this.mapSize.width/2+this.offset[0]+"px",t.top=this.mapSize.height/2+this.offset[1]+"px"):(t.left=this.mapSize.width/4*2+"px",t.top=this.mapSize.height/4*3+"px"),t}},created:function(){},methods:{__initComponent:function(t){z=this;var e=t.map;this.mapSize=e.getContainerSize(),this.offset&&this.offset.length>0?this.offsetSize={x:this.offset[0],y:this.offset[1]}:this.offsetSize={x:this.mapSize.width/4,y:this.mapSize.height/4},this.map=e,this.$bmapComponent=e,t.autoStart&&this.start()},start:function(){this.iconVisible=!0;var t=this.map,e=t.getContainer(),n=e.parentNode;this.preParentDomStyle.overflow=n.style.overflow,this.preParentDomStyle.width=n.style.width,this.preParentDomStyle.height=n.style.height,n.style.overflow="hidden",n.style.width=this.mapSize.width+"px",n.style.height=this.mapSize.height+"px";var i=this.offset||[0,this.mapSize.height/4];e.style.width=this.mapSize.width+2*i[0]+"px",e.style.height=this.mapSize.height+2*i[1]+"px",t.resize();var o=this.$parent.tilt||0;this.tilt=o,t.setCenter(new BMapGL.Point(this.position[0],this.position[1]),{noAnimation:!1,heading:360-this.heading,tilt:o}),this.onlyView&&(t.disableDragging(),t.disableScrollWheelZoom(),t.disableContinuousZoom(),t.disableDoubleClickZoom(),t.disableKeyboard(),t.disablePinchToZoom())},stop:function(){this.iconVisible=!1;var t=this.map,e=t.getContainer(),n=e.parentNode;n.style.overflow=this.preParentDomStyle.overflow,n.style.width=this.preParentDomStyle.width,n.style.height=this.preParentDomStyle.height,e.style.width="100%",e.style.height="100%",t.resize(),this.onlyView&&(t.enableDragging(),t.enableScrollWheelZoom(),t.enableContinuousZoom(),t.enableDoubleClickZoom(),t.enableKeyboard(),t.enablePinchToZoom())}},render:function(){return null},destroyed:function(){}},(function(){var t=this.$createElement,e=this._self._c||t;return this.iconVisible?e("div",{staticClass:"el-track-container"},[e("img",{staticClass:"el-track-icon",style:this.iconStyle,attrs:{src:this.icon.url}})]):this._e()}),[],!1,null,"ab5acf48",null).exports,R=A({name:"el-bmap-info-window-custom",mixins:[$],props:{vid:{type:[String,Number]},offset:{type:Array,default:function(){return[0,0]}},position:{type:Array,default:function(){return[0,0]}},isCustom:{type:Boolean,default:!1},visible:{type:Boolean,default:!0},enableAutoPan:{type:Boolean,default:!0},enableCloseOnClick:{type:Boolean,default:!0},events:{type:Object,default:function(){return{}}}},data:function(){var t=this;return{styleObj:{display:"block",left:0,top:0},savePosition:null,saveVisible:!1,handlers:{position:function(e){t.savePosition=e,t.calcPosition()},visible:function(e){t.saveVisible!==e&&(t.saveVisible=e,t.emitEvent())}}}},computed:{computedStyle:function(){var t={};return this.saveVisible?t.display="block":t.display="none",t.left=this.styleObj.left,t.top=this.styleObj.top,t}},created:function(){},destroyed:function(){this.unBindEvent(),this.$bmapComponent=null},methods:{__initComponent:function(t){var e=this;this.$bmapComponent={on:function(){},off:function(){},emit:function(){},removeEventListener:function(){},addEventListener:function(){}},this.saveVisible=this.visible,t.position&&(this.emitEvent(),this.savePosition=t.position,this.calcPosition(),this.$nextTick((function(){var t=e.$refs.infoWindow.offsetHeight+11,n=e.$refs.infoWindow.offsetWidth,i=e.$bmap.pointToOverlayPixel(e.savePosition),o=i.x-n/2+e.offset[0],r=i.y-t+e.offset[1],s=0,a=0;o<0&&(s=Math.abs(o)+10),r<0&&(a=Math.abs(r)+10),0===s&&0===a||e.$bmap.panBy(s,a)})),this.bindEvent())},bindEvent:function(){this.$bmap.on("moving",this.moveMap),this.$bmap.on("dragging",this.draggingMap),this.$bmap.on("zoomend",this.zoomendMap),this.$bmap.on("resize",this.resizeMap),this.$bmap.on("click",this.clickMap)},unBindEvent:function(){this.$bmap.off("moving",this.moveMap),this.$bmap.off("dragging",this.draggingMap),this.$bmap.off("zoomend",this.zoomendMap),this.$bmap.off("resize",this.resizeMap),this.$bmap.off("click",this.clickMap)},moveMap:function(){this.calcPosition()},draggingMap:function(){this.calcPosition()},zoomendMap:function(){this.calcPosition()},resizeMap:function(){this.calcPosition()},clickMap:function(){this.enableCloseOnClick&&!0===this.saveVisible&&(this.saveVisible=!1,this.$emit("update:visible",!1),this.emitEvent())},calcPosition:function(){var t=this.$bmap.pointToOverlayPixel(this.savePosition);this.styleObj.left=t.x+this.offset[0]+"px",this.styleObj.top=t.y+this.offset[1]+"px"},emitEvent:function(){this.events&&this.events.close&&!this.saveVisible?this.events.close():this.events&&this.events.open&&this.saveVisible&&this.events.open()}}},(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{ref:"infoWindow",staticClass:"bmap-info-window-custom",class:{custom:this.isCustom},style:this.computedStyle},[this.isCustom?this._e():e("div",{staticClass:"arrow"}),this._v(" "),this._t("default")],2)}),[],!1,null,"707cf7ac",null).exports,I=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},G=function(t){var e=t.init,n=t.data,i=void 0===n?function(){return{}}:n,o=t.converters,r=void 0===o?{}:o,s=t.handlers,a=void 0===s?{}:s,p=t.computed,l=t.methods,u=t.name,m=t.render,h=t.contextReady,c=t.template,d=t.mixins,f=void 0===d?[]:d,b=t.props,y=I({},t,{props:void 0===b?{}:b,data:function(){return I({},i(),{converters:r,handlers:a})},mixins:[$].concat(f),computed:p,methods:I({},l,{__initComponent:e,__contextReady:h})});return c||m||(y.render=function(){return null}),y.install=function(t){return t.use(u,y)},y},D=[w,S,O,_,x,P,E,k,j,N,B,L,V,T,R],Z={initBMapApiLoader:m,BMapManager:M,install:function(t){Z.installed||(t.config.optionMergeStrategies.deferredReady=t.config.optionMergeStrategies.created,D.map((function(e){t.component(e.name,e),Z[o()(e.name).replace(/^El/,"")]=e})))}};"undefined"!=typeof window&&window.Vue&&function t(e){t.installed||Z.install(e)}(window.Vue);e.default=Z}])}));
//# sourceMappingURL=index.js.map
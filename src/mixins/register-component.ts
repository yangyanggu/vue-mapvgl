import {defineComponent} from "vue";
import upperCamelCase from 'uppercamelcase';
import { commonConvertMap } from '../utils/convert-helper';
import eventHelper from '../utils/event-helper';
import {convertEventToLowerCase, eventReg} from "../utils/util";
import type {WatchStopHandle, ComponentPublicInstance, PropType} from "vue";

export default defineComponent({
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    zoomThreshold: {
      type: Array,
      default() {
        return [0, 30];
      }
    },
    renderOrder: {
      type: Number
    },
    lazy: {
      type: Number as PropType<number>,
      default: -1
    }
  },
  emits: ['init'],
  data() {
    return {
      lazyTimer: null as any,
      needInitComponents: [] as (ComponentPublicInstance & customComponent)[],
      unwatchFns: [] as WatchStopHandle[],
      propsRedirect: {},
      converters: {},
    };
  },
  mounted() {
    this.$parentComponent = this.$parentComponent || (this.$parent as any).$amapComponent;
    if (this.$parentComponent) {
      this.lazyRegisterForTimeout();
    }else{
      this.lazyRegister();
    }
  },

  unmounted() {
    if (this.lazyTimer) {
      clearTimeout(this.lazyTimer);
    }
    if (!this.$amapComponent) return;
    this.unwatchFns.forEach(item => item());
    this.unwatchFns = [];
  },

  methods: {
    lazyRegisterForTimeout(){
      if (this['lazy'] < 0) {
        this.register();
      } else {
        this.lazyTimer = setTimeout(() => {
          this.register();
        }, this['lazy']);
      }
    },
    getHandlerFun(prop) {
      if (this[`__${prop}`]) {
        return this[`__${prop}`];
      }

      return this.$amapComponent[`set${upperCamelCase(prop)}`];
    },

    convertProps() {
      const props = {};
      const {$props, propsRedirect} = this;
      return Object.keys($props).reduce((res, _key) => {
        let key = _key;
        const propsValue = this.convertSignalProp(key, $props[key]);
        if (propsValue === undefined) return res;
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key];
        props[key] = propsValue;
        return res;
      }, props);
    },

    convertSignalProp(key, sourceData) {
      if(sourceData === undefined || sourceData === null){
        return sourceData;
      }
      if (this.converters && this.converters[key]) {
        return this.converters[key].call(this, sourceData);
      } else {
        const convertFn = commonConvertMap[key];
        if (convertFn) return convertFn(sourceData);
        return sourceData;
      }
    },

    registerEvents() {
      const $props = this.$attrs;
      Object.keys($props).forEach(key => {
        if(eventReg.test(key)){
          const eventKey = convertEventToLowerCase(key);
          eventHelper.addListener(this.$amapComponent, eventKey, $props[key]);
        }
      });
    },

    unregisterEvents() {
      const $props = this.$attrs;
      Object.keys($props).forEach(key => {
        if(eventReg.test(key)){
          const eventKey = convertEventToLowerCase(key);
          eventHelper.removeListener(this.$amapComponent, eventKey, $props[key]);
        }
      });
    },

    setPropWatchers() {
      const {propsRedirect, $props} = this;

      Object.keys($props).forEach(prop => {
        let handleProp = prop;
        if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop];
        const handleFun = this.getHandlerFun(handleProp);
        if (!handleFun) return;
        const watchOptions = {
          deep: false
        };
        const propValueType = Object.prototype.toString.call($props[prop]);
        if ( propValueType === '[object Object]' || propValueType === '[object Array]') {
          watchOptions.deep = true;
        }
        // watch props
        const unwatch = this.$watch(prop, nv => {
          handleFun.call(this.$amapComponent, this.convertSignalProp(prop, nv));
        },watchOptions);

        // collect watchers for destroyed
        this.unwatchFns.push(unwatch);
      });
    },

    // some prop can not init by initial created methods
    initProps() {
      const props = ['visible'];

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr);
          handleFun && handleFun.call(this.$amapComponent, this.convertSignalProp(propStr, this[propStr]));
        }
      });

      // this.printReactiveProp();
    },

    lazyRegister(){
      const $parent = this.$parent as (ComponentPublicInstance & customComponent);
      if($parent && $parent.addChildComponent){
        $parent.addChildComponent(this);
      }
    },
    addChildComponent(component : ComponentPublicInstance & customComponent){
      this.needInitComponents.push(component);
    },
    createChildren(){
      while (this.needInitComponents.length > 0){
        this.needInitComponents[0].$parentComponent = this.$amapComponent;
        this.needInitComponents[0].lazyRegisterForTimeout();
        this.needInitComponents.splice(0, 1);
      }
    },
    register() {
      const res = this['__initComponent'] && this['__initComponent'](this.convertProps());
      this.registerRest(res);
    },

    registerRest(instance) {
      if (!this.$amapComponent && instance) this.$amapComponent = instance;
      this.registerEvents();
      this.initProps();
      this.setPropWatchers();
      this.$emit('init', this.$amapComponent, this);
      this.createChildren();
    },

    // helper method
    $$getInstance() {
      return this.$amapComponent;
    },
    __visible(flag){
      if (this.$options.name && this.$options.name.toLowerCase().endsWith('layer') && this.$parentComponent && this.$parentComponent.showLayer) {
        if (flag) {
          this.$parentComponent.showLayer(this.$amapComponent);
        } else {
          this.$parentComponent.hideLayer(this.$amapComponent);
        }
      }
    },
    __data(value) {
      if(this.$amapComponent.setData){
        this.$amapComponent.setData(value);
      }
    }
  }
});

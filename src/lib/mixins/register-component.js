import upperCamelCase from 'uppercamelcase';
import { commonConvertMap } from '../utils/convert-helper';
import eventHelper from '../utils/event-helper';
import CONSTANTS from '../utils/constant';

export default {
  props: ['visible'],
  data() {
    let self = this;
    return {
      unwatchFns: [],
      handlers: {
        visible(flag) {
          if (self.$options.name && self.$options.name.endsWith('layer') && self.$view && self.$view.showLayer) {
            if (flag) {
              self.$view.showLayer(self.$bmapComponent);
            } else {
              self.$view.hideLayer(self.$bmapComponent);
            }
          }
        }
      }
    };
  },

  mounted() {
    this.$view = this.$view || this.$parent.$view;
    if (this.$view) {
      this.register();
    } else {
      this.$on(CONSTANTS.MAPV_VIEW_READY_EVENT, view => {
        this.$view = view;
        this.register();
      });
    }
  },

  destroyed() {
    this.unregisterEvents();
    if (!this.$bmapComponent) return;

    this.unwatchFns.forEach(item => item());
    this.unwatchFns = [];
  },

  methods: {
    getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop];
      }
    },

    convertProps() {
      const props = {};
      if (this.$view) props.view = this.$view;
      const { $options: { propsData = {} }, propsRedirect } = this;
      return Object.keys(propsData).reduce((res, _key) => {
        let key = _key;
        let propsValue = this.convertSignalProp(key, propsData[key]);
        if (propsValue === undefined) return res;
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key];
        props[key] = propsValue;
        return res;
      }, props);
    },

    convertSignalProp(key, sourceData) {
      let converter = '';
      let type = '';

      if (type && converter) {
        return converter(sourceData);
      } else if (this.converters && this.converters[key]) {
        return this.converters[key].call(this, sourceData);
      } else {
        const convertFn = commonConvertMap[key];
        if (convertFn) return convertFn(sourceData);
        return sourceData;
      }
    },

    registerEvents() {
      this.setEditorEvents && this.setEditorEvents();
      if (!this.$options.propsData) return;
      if (this.$options.propsData.events) {
        for (let eventName in this.events) {
          eventHelper.addListener(this.$bmapComponent, eventName, this.events[eventName]);
        }
      }

      if (this.$options.propsData.onceEvents) {
        for (let eventName in this.onceEvents) {
          eventHelper.addListenerOnce(this.$bmapComponent, eventName, this.onceEvents[eventName]);
        }
      }
    },

    unregisterEvents() {
      eventHelper.clearListeners(this.$bmapComponent);
    },

    setPropWatchers() {
      const { propsRedirect, $options: { propsData = {} } } = this;
      Object.keys(propsData).forEach(prop => {
        let handleProp = prop;
        if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop];
        let handleFun = this.getHandlerFun(handleProp);
        if (!handleFun && prop !== 'events') return;

        // watch props
        const unwatch = this.$watch(prop, nv => {
          if (prop === 'events') {
            // this.unregisterEvents();
            // this.registerEvents();
            return;
          }
          if (handleFun && handleFun === this.$bmapComponent.setOptions) {
            return handleFun.call(this.$bmapComponent, {[handleProp]: this.convertSignalProp(prop, nv)});
          }

          handleFun.call(this.$bmapComponent, this.convertSignalProp(prop, nv));
        }, {
          deep: true
        });

        // collect watchers for destroyed
        this.unwatchFns.push(unwatch);
      });
    },

    // some prop can not init by initial created methods
    initProps() {
      const props = [];

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr);
          handleFun && handleFun.call(this.$bmapComponent, this.convertSignalProp(propStr, this[propStr]));
        }
      });

      // this.printReactiveProp();
    },

    /**
     * methods for developing
     * find reactive props
     */
    printReactiveProp() {
      Object.keys(this._props).forEach(k => {
        let fn = this.$bmapComponent[`set${upperCamelCase(k)}`];
        if (fn) {
          console.log(k);
        }
      });
    },

    register() {
      let props = this.convertProps();
      const res = this.__initComponent && this.__initComponent(props);
      this.registerRest(res);
      if (props.visible === false && this.handlers.visible) {
        this.handlers.visible.call(this.$bmapComponent, false);
      }
    },

    registerRest(instance) {
      if (!this.$bmapComponent && instance) this.$bmapComponent = instance;
      this.registerEvents();
      this.initProps();
      this.setPropWatchers();

      if (this.events && this.events.init) this.events.init(this.$bmapComponent, this.$view, this.bmapManager || this.$parent.bmapManager);
    },

    // helper method
    $$getInstance() {
      return this.$bmapComponent;
    }
  }
};

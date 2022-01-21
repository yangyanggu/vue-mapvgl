import {defineComponent} from "vue";

export default defineComponent({
  props: {
    enablePicked: {
      type: Boolean,
      default: false
    },
    selectedIndex: {
      type: Number
    },
    selectedColor: {
      type: String
    },
    autoSelect: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function
    },
    onDblClick: {
      type: Function
    },
    onRightClick: {
      type: Function
    },
    onMousemove: {
      type: Function
    }
  },
  methods: {
    $$pick(x, y) {
      return this['$amapComponent'].pick(x, y);
    }
  }
});

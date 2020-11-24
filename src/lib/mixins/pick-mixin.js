const props = [
  'enablePicked',
  'selectedIndex',
  'selectedColor',
  'autoSelect',
  'onClick',
  'onDblClick',
  'onRightClick',
  'onMousemove'
];

const handlers = {

};

const methods = {
  $$pick(x, y) {
    return this.$bmapComponent.pick(x, y);
  }
};

export default {
  props,
  handlers,
  methods
};

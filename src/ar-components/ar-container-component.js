const arContainerComponent = {
  schema: {
    position: {type: 'vec3', default: '0 0 0'},
    rotation: {type: 'vec3', default: '0 0 0'},
    scale: {type: 'vec3', default: '1 1 1'},
    visible: {type: 'boolean', default: true},
  },
  init: function() {
    this.reset();
  },
  reset: function() {
    const el = this.el;
    const data = this.data;
    el.setAttribute('position', data.position);
    el.setAttribute('rotation', data.rotation);
    el.setAttribute('scale', data.scale);
    el.setAttribute('visible', data.visible);
  },
  hide: function() {
    this.el.setAttribute('visible', false);
  },
  show: function() {
    this.el.setAttribute('visible', true);
  }
}

export default arContainerComponent;
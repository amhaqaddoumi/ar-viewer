const arViewComponent = {
  schema: {
    minScale: {type: 'number', default: 0.5},
    maxScale: {type: 'number', default: 2},
    defaultScale: {type: 'number', default: 1},
    defaultRotation: {type: 'number', default: 0}
  },
  init: function() {
    const el = this.el;
    const data = this.data;
    el.setAttribute('scale', `${data.defaultScale} ${data.defaultScale} ${data.defaultScale}`)
    el.setAttribute('rotation', `${data.defaultRotation} ${data.defaultRotation} ${data.defaultRotation}`)
  },
  reset: function() {
    const el = this.el;
    const data = this.data;
    this.resetContainer(el);
    el.setAttribute('scale', `${data.defaultScale} ${data.defaultScale} ${data.defaultScale}`)
    el.setAttribute('rotation', `${data.defaultRotation} ${data.defaultRotation} ${data.defaultRotation}`)
  },
  resetContainer: function(element) {
    if (element.components['ar-container'] != undefined) {
      element.components['ar-container'].reset();
    }

    for (let i = 0; i < element.children.length; i++) {
      this.resetContainer(element.children[i]);
    }
  },
  hide: function() {
    this.el.setAttribute('visible', false);
  },
  show: function() {
    this.el.setAttribute('visible', true);
  },
  scale: function(scale) {
    const data = this.data;
    if (scale <= data.minScale) {
      scale = data.minScale;
    } else if (scale >= data.maxScale) {
      scale = data.maxScale;
    }
    this.el.setAttribute('scale', `${scale} ${scale} ${scale}`)
  },
  rotate: function(rotation) {
    this.el.setAttribute('rotation', `0 ${rotation} 0`)
  }
}

export default arViewComponent;
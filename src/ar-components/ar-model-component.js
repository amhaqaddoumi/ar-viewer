const arModelComponent = {
  schema: {
    src: { type: 'string', default: ''}
  },
  init: function() {
    const el = this.el;
    const data = this.data;
    el.setAttribute('gltf-model', data.src);
  }
}

export default arModelComponent;
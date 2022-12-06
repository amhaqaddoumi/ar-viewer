const arCameraComponent = {
  init: function() {
    const el = this.el;
    el.setAttribute('look-controls', 'enabled', false);
    el.setAttribute('position', '0 0 0');
  }
}

export default arCameraComponent;
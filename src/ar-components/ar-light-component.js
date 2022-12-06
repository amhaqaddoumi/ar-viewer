const arLightComponent = {
  schema: {
    lightType: {type: 'string', default: 'directional'},
    intensity: {type: 'number', default: 1},
    color: {type: 'color', default: '#fff'},
    groundColor: {type: 'color', default: '#fff'},
    distance: {type: 'number', default: 0},
    angle: {type: 'number', default: 60},
    decay: {type: 'number', default: 1},
    penumbra: {type: 'number', default: 0}
  },
  init: function() {
    const el = this.el;
    const data = this.data;
    el.setAttribute('light', {
      type: data.lightType,
      intensity: data.intensity,
      color: data.color,
      groundColor: data.groundColor,
      distance: data.distance,
      angle: data.angle,
      decay: data.decay,
      penumbra: data.penumbra
    })
  }
}

export default arLightComponent;
export class Node {
  constructor(type) {
    this.type = type;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

export class ArNode extends Node {
  constructor(type, options) {
    super(type);
    this.id = options.id;
    this.position = options.position;
    this.rotation = options.rotation;
    this.scale = options.scale;
    this.visible = options.visible;
  }
}

export class ArViewerNode extends ArNode {
  constructor(options) {
    super('ar-viewer', options);
    this.mode = options.mode;
    this.scaleSlider = options.scaleSlider;
    this.rotateSlider = options.rotateSlider;
    this.qrSize = options.qrSize;
    this.drawerHeight = options.drawerHeight;
  }
}

export class ArViewNode extends ArNode {
  constructor(options) {
    super('ar-view', options);
    this.minScale = options.minScale;
    this.maxScale = options.maxScale;
    this.defaultScale = options.defaultScale;
    this.defaultRotation = options.defaultRotation;
  }
}

export class ArModelNode extends ArNode {
  constructor(options) {
    super('ar-model', options);
    this.src = options.src;
  }
}

export class ArLightNode extends ArNode {
  constructor(options) {
    super('ar-light', options);
    this.lightType = options.lightType;
    this.intensity = options.intensity;
    this.color = options.color;
    this.groundColor = options.groundColor;
    this.distance = options.distance;
    this.angle = options.angle;
    this.decay = options.decay;
    this.penumbra = options.penumbra;
  }
}

export class UiNode extends Node {
  constructor(type, options) {
    super(type);
    this.id = options.id;
  }
}

export class UiTextNode extends UiNode {
  constructor(options) {
    super('ui-text', options);
    this.text = options.text;
    this.variant = options.variant;
  }
}

export class UiSwitchNode extends UiNode {
  constructor(options) {
    super('ui-switch', options);
    this.label = options.label;
    this.defaultValue = options.defaultValue;
    this.action = options.action;
    this.target = options.target;
  }
}

export class UiSliderNode extends UiNode {
  constructor(options) {
    super('ui-slider', options);
    this.label = options.label;
    this.defaultValue = options.defaultValue;
    this.min = options.min;
    this.max = options.max;
    this.action = options.action;
    this.target = options.target;
  }
}
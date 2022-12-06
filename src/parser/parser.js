import { v4 as uuid} from 'uuid';
import { ArNode, ArViewerNode, ArViewNode, ArModelNode, ArLightNode } from './nodes';
import { UiTextNode, UiSwitchNode, UiSliderNode } from './nodes';

export default class ArViewerParser {ArNoteNode
  constructor() {
    this.domParser = new DOMParser();
    this.arScene = document.getElementById('ar-scene');
  }

  //Data
  parse(data) {
    let newData = this.parseData(data);
    this.parseScene(newData);
    return newData;
  }

  parseData(data) {
    const docElement = this.domParser.parseFromString(data, 'text/xml').documentElement;
    const newData = this.parseDataElement(docElement);
    return newData;
  }

  parseDataElement(element) {
    const node = this.createNode(element);
    for (let c of element.children) {
      let childNode = this.parseDataElement(c);
      node.addChild(childNode);
    }
    return node;
  }

  createNode(element) {
    if (element.tagName == 'ar-viewer') {
      return this.createArViewerNode(element);
    } else if (element.tagName == 'ar-view') {
      return this.createArViewNode(element);
    } else if (element.tagName == 'ar-container') {
      return this.createArContainerNode(element);
    } else if (element.tagName == 'ar-model') {
      return this.createArModelNode(element);
    } else if (element.tagName == 'ar-light') {
      return this.createArLightNode(element);
    }

    else if (element.tagName == 'ui-text') {
      return this.createUiTextNode(element);
    } else if (element.tagName == 'ui-switch') {
      return this.createUiSwitchNode(element);
    } else if (element.tagName == 'ui-slider') {
      return this.createUiSliderNode(element);
    }
  }

  addArNodeProperties(element, options) {
    options.id = element.attributes['id'] != undefined ? element.attributes['id'].nodeValue : uuid();
    options.position = element.attributes['position'] != undefined ? element.attributes['position'].nodeValue : '0 0 0';
    options.rotation = element.attributes['rotation'] != undefined ? element.attributes['rotation'].nodeValue : '0 0 0';
    options.scale = element.attributes['scale'] != undefined ? element.attributes['scale'].nodeValue : '1 1 1';
    options.visible = element.attributes['visible'] != undefined ? element.attributes['visible'].nodeValue === "true" : true;
  }

  createArNode(element) {
    const options = {};
    this.addArElementProperties(element, option);
    return new ArNode(options);
  }

  createArViewerNode(element) {
    const options = {};
    this.addArNodeProperties(element, options);
    options.mode = element.attributes['mode'] != undefined ? element.attributes['mode'].nodeValue : 'ar';
    options.scaleSlider = element.attributes['scale-slider'] != undefined ? element.attributes['scale-slider'].nodeValue === "true" : true;
    options.rotateSlider = element.attributes['rotate-slider'] != undefined ? element.attributes['rotate-slider'].nodeValue === "true" : true;
    return new ArViewerNode(options);
  }

  createArViewNode(element) {
    const options = {};
    this.addArNodeProperties(element, options);
    options.minScale = element.attributes['min-scale'] != undefined ? Number(element.attributes['min-scale'].nodeValue) : 0.5;
    options.maxScale = element.attributes['max-scale'] != undefined ? Number(element.attributes['max-scale'].nodeValue) : 2;
    options.defaultScale = element.attributes['default-scale'] != undefined ? Number(element.attributes['default-scale'].nodeValue) : 1;
    options.defaultRotation = element.attributes['default-rotation'] != undefined ? Number(element.attributes['default-rotation'].nodeValue) : 0;
    return new ArViewNode(options);
  }

  createArContainerNode(element) {
    const options = {};
    this.addArNodeProperties(element, options);
    return new ArNode('ar-container', options);
  }

  createArModelNode(element) {
    const options = {};
    this.addArNodeProperties(element, options);
    options.src = element.attributes['src'].nodeValue;
    return new ArModelNode(options);
  }

  createArLightNode(element) {
    const options = {};
    this.addArNodeProperties(element, options);
    options.lightType = element.attributes['light-type'] != undefined ? element.attributes['light-type'].nodeValue : 'directional';
    options.intensity = element.attributes['intensity'] != undefined ? Number(element.attributes['intensity'].nodeValue) : 1;
    options.color = element.attributes['color'] != undefined ? element.attributes['color'].nodeValue : '#fff';
    options.groundColor = element.attributes['ground-color'] != undefined ? element.attributes['ground-color'].nodeValue : '#fff';
    options.distance = element.attributes['distance'] != undefined ? Number(element.attributes['distance'].nodeValue) : 0;
    options.angle = element.attributes['angle'] != undefined ? Number(element.attributes['angle'].nodeValue) : 60;
    options.decay = element.attributes['decay'] != undefined ? Number(element.attributes['decay'].nodeValue) : 1;
    options.penumbra = element.attributes['penumbra'] != undefined ? Number(element.attributes['penumbra'].nodeValue) : 0;
    return new ArLightNode(options);
  }

  addUiNodeProperties(element, options) {
    options.id = element.attributes['id'] != undefined ? element.attributes['id'].nodeValue : uuid();
  }

  createUiTextNode(element) {
    const options = {};
    this.addUiNodeProperties(element, options);
    options.text = element.attributes['text'] != undefined ? element.attributes['text'].nodeValue : "None";
    options.variant = element.attributes['variant'] != undefined ? element.attributes['variant'].nodeValue : "body1";
    return new UiTextNode(options);
  }

  createUiSwitchNode(element) {
    const options = {};
    this.addUiNodeProperties(element, options);
    options.label = element.attributes['label'] != undefined ? element.attributes['label'].nodeValue : "None";
    options.defaultValue = element.attributes['default-value'] != undefined ? element.attributes['default-value'].nodeValue === "true" : true;
    options.action = element.attributes['action'] != undefined ? element.attributes['action'].nodeValue : "visible";
    options.target = element.attributes['target'] != undefined ? element.attributes['target'].nodeValue : "";
    return new UiSwitchNode(options);
  }

  createUiSliderNode(element) {
    const options = {};
    this.addUiNodeProperties(element, options);
    options.label = element.attributes['label'] != undefined ? element.attributes['label'].nodeValue : "None";
    options.defaultValue = element.attributes['default-value'] != undefined ? Number(element.attributes['default-value'].nodeValue) : 50;
    options.min = element.attributes['min'] != undefined ? Number(element.attributes['min'].nodeValue) : 0;
    options.max = element.attributes['max'] != undefined ? Number(element.attributes['max'].nodeValue) : 100;
    options.action = element.attributes['action'] != undefined ? element.attributes['action'].nodeValue : "scale";
    options.target = element.attributes['target'] != undefined ? element.attributes['target'].nodeValue : "";
    return new UiSliderNode(options);
  }
  
  //Scene
  parseScene(data) {
    this.parseSceneElement(data, null);
    this.arScene.components['ar-scene'].start();
  }

  parseSceneElement(data, parentElement) {
    const element = this.createSceneElement(data, parentElement);
    for (let c of data.children) {
      this.parseSceneElement(c, element);
    }
  }

  createSceneElement(data, parentElement) {
    if (data.type == 'ar-viewer') {
      return this.createArViewerElement(data, parentElement);
    } else if (data.type == 'ar-view') {
      return this.createArViewElement(data, parentElement);
    } else if (data.type == 'ar-container') {
      return this.createArContainerElement(data, parentElement);
    } else if (data.type == 'ar-model') {
      return this.createArModelElement(data, parentElement);
    } else if (data.type == 'ar-light') {
      return this.createArLightElement(data, parentElement);
    }
  }

  addArElementProperties(element, data) {
    element.setAttribute('id', data.id);
    element.setAttribute('ar-container', {
      position: data.position,
      rotation: data.rotation,
      scale: data.scale,
      visible: data.visible
    });
  }

  createArViewerElement(data, parentElement) {
    this.arScene.setAttribute('ar-scene', 'mode', data.mode);
    const arViewerElement = document.createElement('a-entity');
    arViewerElement.setAttribute('ar-viewer', '');

    if (data.mode == "ar") {
      const markerElement = document.createElement('a-marker');
      markerElement.setAttribute('preset', 'hiro');
      markerElement.setAttribute('id', 'ar-marker');
      this.arScene.appendChild(markerElement);
      markerElement.appendChild(arViewerElement);
    } else if (data.mode == "3d") {
      this.arScene.setAttribute('ar-scene', 'mode', data.mode);
      this.arScene.appendChild(arViewerElement);
      arViewerElement.setAttribute('position', '0 0 -1');
    }
    return arViewerElement;
  }

  createArViewElement(data, parentElement) {
    const arViewElement = document.createElement('a-entity');
    parentElement.appendChild(arViewElement);
    this.addArElementProperties(arViewElement, data);

    arViewElement.setAttribute('ar-view', {
      minScale: data.minScale,
      maxScale: data.maxScale,
      defaultScale: data.defaultScale,
      defaultRotation: data.defaultRotation
    });

    return arViewElement;
  }

  createArContainerElement(data, parentElement) {
    const arContainerElement = document.createElement('a-entity');
    parentElement.appendChild(arContainerElement);
    this.addArElementProperties(arContainerElement, data);
    return arContainerElement;
  }

  createArModelElement(data, parentElement) {
    const arModelElement = document.createElement('a-entity');
    parentElement.appendChild(arModelElement);
    this.addArElementProperties(arModelElement, data);
    arModelElement.setAttribute('ar-model', {
      "src": data.src,
    });
    return arModelElement;
  }

  createArLightElement(data, parentElement) {
    const arLightElement = document.createElement('a-entity');
    parentElement.appendChild(arLightElement);
    this.addArElementProperties(arLightElement, data);
    arLightElement.setAttribute('ar-light', {
      lightType: data.lightType,
      intensity: data.intensity,
      color: data.color,
      groundColor: data.groundColor,
      distance: data.distance,
      angle: data.angle,
      decay: data.decay,
      penumbra: data.penumbra
    });
    return arLightElement;
  }
}

//View
export function parseView(scaleSlider, rotateSlider, viewData) {
  const view = {};
  view.elements = {}
  view.id = viewData.id;
  view.minScale = viewData.minScale;
  view.maxScale = viewData.maxScale;
  view.defaultScale = viewData.defaultScale;
  view.defaultRotation = viewData.defaultRotation;

  if (scaleSlider) {
    const data = {};
    data.type = 'ui-slider';
    data.id = view.id + '-scale-slider';
    data.label = "Scale";
    data.min = view.minScale;
    data.max = view.maxScale;
    data.defaultValue = view.defaultScale;
    data.action = 'scale';
    data.target = view.id;
    data.currentValue = view.defaultScale;
    view.elements[data.id] = data;
  }

  if (rotateSlider) {
    const data = {};
    data.type = 'ui-slider';
    data.id = view.id + '-rotate-slider';
    data.label = "Rotate";
    data.min = -180;
    data.max = 180;
    data.defaultValue = view.defaultRotation;
    data.action = 'rotate';
    data.target = view.id;
    data.currentValue = view.defaultRotation;
    view.elements[data.id] = data;
  }

  for (let i = 0; i < viewData.children.length; i++) {
    const childData = viewData.children[i];
    if (childData.type == 'ui-text') {
      view.elements[childData.id] = parseUiTextView(childData);
    } else if (childData.type == 'ui-switch') {
      view.elements[childData.id] = parseUiSwitchView(childData);
    } else if (childData.type == 'ui-slider') {
      view.elements[childData.id] = parseUiSliderView(childData);
    }
  }

  return view;
}

function parseUiTextView(data) {
  const uiText = {};
  uiText.type = 'ui-text';
  uiText.id = data.id;
  uiText.text = data.text;
  uiText.variant = data.variant;
  return uiText;
}

function parseUiSwitchView(data) {
  const uiSwitch = {};
  uiSwitch.type = 'ui-switch';
  uiSwitch.id = data.id;
  uiSwitch.label = data.label;
  uiSwitch.defaultValue = data.defaultValue;
  uiSwitch.action = data.action;
  uiSwitch.target = data.target;
  uiSwitch.currentValue = data.defaultValue;
  return uiSwitch;
}

function parseUiSliderView(data) {
  const uiSlider = {};
  uiSlider.type = 'ui-slider';
  uiSlider.id = data.id;
  uiSlider.label = data.label;
  uiSlider.min = data.min;
  uiSlider.max = data.max;
  uiSlider.defaultValue = data.defaultValue;
  uiSlider.action = data.action;
  uiSlider.target = data.target;
  uiSlider.currentValue = data.defaultValue;
  return uiSlider;
}

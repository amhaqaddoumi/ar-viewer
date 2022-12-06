import aframe from 'aframe';
import arAnchor from './ar-components/arjs-anchor-component';
import arSceneComponent from './ar-components/ar-scene-component';
import arCameraComponent from './ar-components/ar-camera-component';
import arViewerComponent from './ar-components/ar-viewer-component';
import arViewComponent from './ar-components/ar-view-component';
import arContainerComponent from './ar-components/ar-container-component';
import arModelComponent from './ar-components/ar-model-component';
import arLightComponent from './ar-components/ar-light-component';

aframe.registerComponent('arjs-anchor', arAnchor);
aframe.registerComponent('ar-scene', arSceneComponent);
aframe.registerComponent('ar-camera', arCameraComponent);
aframe.registerComponent('ar-viewer', arViewerComponent);
aframe.registerComponent('ar-view', arViewComponent);
aframe.registerComponent('ar-container', arContainerComponent);
aframe.registerComponent('ar-model', arModelComponent);
aframe.registerComponent('ar-light', arLightComponent);
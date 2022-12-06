import aframe from 'aframe';
import arSystem from "./arjs-system";
import './arjs-anchor-component';

const arSceneComponent = {
  schema: {
    mode: { type: 'string', default: 'ar'},
    qrSize: { type: 'number', default: 0.05 }
  },
  start: function() {
    const el = this.el;
    const data = this.data;
    if (data.mode == 'ar') {
      startAr()
    } else if (data.mode == '3d') {
      start3d();
    }

    function startAr() {
      aframe.registerSystem('arjs', arSystem);
      el.setAttribute('vr-mode-ui', { enabled: false })
      el.setAttribute('renderer', { logarithmicDepthBuffer: true, precision: 'medium' })
      el.setAttribute('embedded', '');
      el.setAttribute('arjs', ''); 
    }

    function start3d() {
      el.setAttribute('vr-mode-ui', 'enabled', false);

      const cameraEl = document.getElementById('ar-camera');
      cameraEl.setAttribute('position', '0 1 0')
      cameraEl.setAttribute('rotation', '-30 0 0')
    }
  }
}

export default arSceneComponent;
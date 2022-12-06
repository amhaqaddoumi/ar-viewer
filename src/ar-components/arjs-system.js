import { Profile, Session } from '@ar-js-org/ar.js/three.js/build/ar.js';

const arSystem = {
    schema: {
        trackingMethod: {
            type: 'string',
            default: 'best',
        },
        debugUIEnabled: {
            type: 'boolean',
            default: false,
        },
        areaLearningButton: {
            type: 'boolean',
            default: true,
        },
        performanceProfile: {
            type: 'string',
            default: 'default',
        },
        labelingMode: {
            type: 'string',
            default: '',
        },
        // new video texture mode (location based only)
        videoTexture: {
            type: 'boolean',
            default: false
        },
        // old parameters
        debug: {
            type: 'boolean',
            default: false
        },
        detectionMode: {
            type: 'string',
            default: '',
        },
        matrixCodeType: {
            type: 'string',
            default: '',
        },
        patternRatio: {
            type: 'number',
            default: -1,
        },
        cameraParametersUrl: {
            type: 'string',
            default: '',
        },
        maxDetectionRate: {
            type: 'number',
            default: -1
        },
        sourceType: {
            type: 'string',
            default: '',
        },
        sourceUrl: {
            type: 'string',
            default: '',
        },
        sourceWidth: {
            type: 'number',
            default: -1
        },
        sourceHeight: {
            type: 'number',
            default: -1
        },
        deviceId: {
            type: 'string',
            default: ''
        },
        displayWidth: {
            type: 'number',
            default: -1
        },
        displayHeight: {
            type: 'number',
            default: -1
        },
        canvasWidth: {
            type: 'number',
            default: -1
        },
        canvasHeight: {
            type: 'number',
            default: -1
        },
        errorPopup: {
            type: 'string',
            default: ''
        }
    },
    init: function () {
        var _this = this

        if (this.data.videoTexture === true && this.data.sourceType === 'webcam') {
            var webcamEntity = document.createElement("a-entity");
            webcamEntity.setAttribute("arjs-webcam-texture", true);
            this.el.sceneEl.appendChild(webcamEntity);
            return;
        }

        var arProfile = this._arProfile = new Profile()
            .trackingMethod(this.data.trackingMethod)
            .performance(this.data.performanceProfile)
            .defaultMarker()
        
        if (this.data.debug !== false) arProfile.contextParameters.debug = this.data.debug
        if (this.data.detectionMode !== '') arProfile.contextParameters.detectionMode = this.data.detectionMode
        if (this.data.matrixCodeType !== '') arProfile.contextParameters.matrixCodeType = this.data.matrixCodeType
        if (this.data.patternRatio !== -1) arProfile.contextParameters.patternRatio = this.data.patternRatio
        if (this.data.labelingMode !== '') arProfile.contextParameters.labelingMode = this.data.labelingMode
        if (this.data.cameraParametersUrl !== '') arProfile.contextParameters.cameraParametersUrl = this.data.cameraParametersUrl
        if (this.data.maxDetectionRate !== -1) arProfile.contextParameters.maxDetectionRate = this.data.maxDetectionRate
        if (this.data.canvasWidth !== -1) arProfile.contextParameters.canvasWidth = this.data.canvasWidth
        if (this.data.canvasHeight !== -1) arProfile.contextParameters.canvasHeight = this.data.canvasHeight

        if (this.data.sourceType !== '') arProfile.sourceParameters.sourceType = this.data.sourceType
        if (this.data.sourceUrl !== '') arProfile.sourceParameters.sourceUrl = this.data.sourceUrl
        if (this.data.sourceWidth !== -1) arProfile.sourceParameters.sourceWidth = this.data.sourceWidth
        if (this.data.sourceHeight !== -1) arProfile.sourceParameters.sourceHeight = this.data.sourceHeight
        if (this.data.deviceId !== '') arProfile.sourceParameters.deviceId = this.data.deviceId
        if (this.data.displayWidth !== -1) arProfile.sourceParameters.displayWidth = this.data.displayWidth
        if (this.data.displayHeight !== -1) arProfile.sourceParameters.displayHeight = this.data.displayHeight

        arProfile.checkIfValid()

        this._arSession = null

        _this.isReady = false
        _this.needsOverride = true

        //this.el.sceneEl.addEventListener('renderstart', function () {
            var scene = _this.el.sceneEl.object3D
            var camera = _this.el.sceneEl.camera
            var renderer = _this.el.sceneEl.renderer

            var arSession = _this._arSession = new Session({
                scene: scene,
                renderer: renderer,
                camera: camera,
                sourceParameters: arProfile.sourceParameters,
                contextParameters: arProfile.contextParameters
            })

            _this.isReady = true

            window.addEventListener('resize', onResize)
            function onResize() {
                var arSource = _this._arSession.arSource

                if (arProfile.contextParameters.trackingBackend !== 'tango') {
                    arSource.copyElementSizeTo(document.body)
                }

                var buttonElement = document.querySelector('.a-enter-vr')
                if (buttonElement) {
                    buttonElement.style.position = 'fixed'
                }
            }
        //})

        function setBackoff(func, millisDuration = Infinity, limit = 1000) {
            if(func == null || !(Object.prototype.toString.call(func) == '[object Function]')) {
                return;
            } 
            let backoff = 33.3
            let start = Date.now()
            let repeat = function() {
              return (millisDuration == Infinity || (Date.now() - start) < millisDuration)
            }
            let next = function() {
                backoff = (backoff * 2) < limit ? (backoff * 2) : limit
                setTimeout(function() {
                    func()
                    if(repeat()) {
                        next()
                    }
                }, backoff)
            };
            next()
        }

        setBackoff(() => {
            window.dispatchEvent(new Event('resize'))
        })
    },

    tick: function () {
        if (this.isReady === false || this.data.videoTexture === true) return
        this._arSession.update()
        this._arSession.onResize()
    },
}

export default arSystem;
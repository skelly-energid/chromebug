import {
    EventDispatcher,
    MOUSE,
    Vector2
} from 'three';

const _changeEvent = { type: 'change' };
const _startEvent = { type: 'start' };
const _endEvent = { type: 'end' };

class MyControls extends EventDispatcher {

    constructor( domElement ) {

        super();

        this.domElement = domElement;

        // Set to false to disable this control
        this.enabled = true;

        this.zoomSpeed = 1.0;

        // Mouse buttons
        this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

        const scope = this;

        const STATE = {
            NONE: - 1,
            ROTATE: 0,
        };

        let state = STATE.NONE;

        const EPS = 0.000001;

        const rotateStart = new Vector2();
        const rotateEnd = new Vector2();
        const rotateDelta = new Vector2();

        function getAutoRotationAngle() {

            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

        }

        function handleMouseDownRotate( event ) {

            rotateStart.set( event.clientX, event.clientY );

        }

        function handleMouseMoveRotate( event ) {

            rotateEnd.set( event.clientX, event.clientY );

            rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

            const element = scope.domElement;

            rotateStart.copy( rotateEnd );

        }

        function onMouseDown( event ) {

            // Prevent the browser from scrolling.
            event.preventDefault();

            // Manually set the focus since calling preventDefault above
            // prevents the browser from setting it automatically.

            scope.domElement.focus ? scope.domElement.focus() : window.focus();

            let mouseAction;

            switch ( event.button ) {

                case 0:

                    mouseAction = scope.mouseButtons.LEFT;
                    break;

                default:

                    mouseAction = - 1;

            }

            switch ( mouseAction ) {

                case MOUSE.ROTATE:

                        handleMouseDownRotate( event );

                        state = STATE.ROTATE;

                    break;


                default:

                    state = STATE.NONE;

            }

            if ( state !== STATE.NONE ) {
                scope.dispatchEvent( _startEvent );

            }

        }

        function onMouseMove( event ) {

            event.preventDefault();

            handleMouseMoveRotate( event );
        }

        function onMouseUp( event ) {
            scope.dispatchEvent( _endEvent );
            state = STATE.NONE;

        }

    }

}

export { MyControls };

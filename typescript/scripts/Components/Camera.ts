///<reference path="./Component.ts" />

module Hammurabi {
    
    export class Camera extends Component {

        private _cameraInstance: BABYLON.Camera;
    
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "Camera";
            this._cameraInstance = new BABYLON.Camera("_cameraInstance", BABYLON.Vector3.Zero(), gameObject.scene);
            this._cameraInstance.parent = this.gameObject;
        }
    }
}
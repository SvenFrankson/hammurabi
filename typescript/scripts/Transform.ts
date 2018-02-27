module Hammurabi {
    
    export class Transform extends Component {
    
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "Transform";
            this.gameObject.rotationQuaternion = BABYLON.Quaternion.Identity();
        }
    
        public get localPosition(): BABYLON.Vector3 {
            return this.gameObject.position;
        }
    
        public set localPosition(p: BABYLON.Vector3) {
            this.gameObject.position = p;
        }
    
        public get localRotation(): BABYLON.Quaternion {
            return this.gameObject.rotationQuaternion;
        }
    
        public set localRotation(r: BABYLON.Quaternion) {
            this.gameObject.rotationQuaternion = r;
        }
    
        public get localScale(): BABYLON.Vector3 {
            return this.gameObject.scaling;
        }
    
        public set localScale(s: BABYLON.Vector3) {
            this.gameObject.scaling = s;
        }
    }
}
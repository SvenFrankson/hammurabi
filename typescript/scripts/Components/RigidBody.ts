module Hammurabi {

    export class Rigidbody extends Component {

        private _bodyInstance: OIMO.Body;
        public mass: number = 1;
    
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "RigidBody";
            this._registerStart();
        }
    
        private _registerStart(): void {
            let observer = this.scene.onBeforeRenderObservable.add(
                () => {
                    let collider = this.GetComponent(BoxCollider);
                    if (collider) {
                        console.log(this.gameObject.transform.localPosition.toString());
                        console.log(this.gameObject.transform.localRotation.toString());
                        console.log(this.mass / (collider.size.x * collider.size.y * collider.size.z));
                        let bodyInstanceProperties: OIMO.IBodyProperties = {
                            type: "box",
                            size: collider.localSize.asArray(),
                            pos: this.gameObject.transform.localPosition.asArray(),
                            rot: this.gameObject.transform.localRotation.toEulerAngles().scaleInPlace(180 / Math.PI).asArray(),
                            move: true,
                            density: this.mass / (collider.localSize.x * collider.localSize.y * collider.localSize.z),
                            friction: 0.2,
                            restitution: 0.2,
                            belongsTo: 1,
                            collidesWith: 0xffffffff
                        }
                        this._bodyInstance = this.scene.physicWorld.add(bodyInstanceProperties);
                        console.log(this._bodyInstance.getPosition().toString());
                        console.log(this._bodyInstance.getQuaternion().toString());
                        this._registerUpdate();
                    }
                    this.scene.onBeforeRenderObservable.remove(observer);
                }
            );
        }
    
        private _registerUpdate(): void {
            let observer = this.scene.onBeforeRenderObservable.add(
                () => {
                    if (this._bodyInstance) {
                        let bodyInstancePosition = this._bodyInstance.getPosition();
                        let bodyInstanceRotation = this._bodyInstance.getQuaternion();
                        if (bodyInstancePosition && bodyInstanceRotation) {
                            this.gameObject.transform.localPosition.copyFromFloats(
                                bodyInstancePosition.x,
                                bodyInstancePosition.y,
                                bodyInstancePosition.z
                            );
                            this.gameObject.transform.localRotation = new BABYLON.Quaternion(
                                bodyInstanceRotation.x,
                                bodyInstanceRotation.y,
                                bodyInstanceRotation.z,
                                bodyInstanceRotation.w
                            );
                        }
                    }
                }
            );
        }
    }
}
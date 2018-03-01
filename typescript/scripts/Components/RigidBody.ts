module Hammurabi {

    export class RigidBody extends Component {

        private _bodyInstance: OIMO.Body;
        public weight: number = 1;
    
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
                        let bodyInstanceProperties: OIMO.IBodyProperties = {
                            type: "box",
                            size: collider.size.asArray(),
                            pos: this.gameObject.transform.localPosition.asArray(),
                            rot: this.gameObject.transform.localRotation.toEulerAngles().asArray(),
                            move: true,
                            density: this.weight / (collider.size.x * collider.size.y * collider.size.z),
                            friction: 0.2,
                            restitution: 0.2,
                            belongsTo: 1,
                            collidesWith: 0xffffffff
                        }
                        this._bodyInstance = this.scene.physicWorld.add(bodyInstanceProperties);
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
                            this.gameObject.transform.localRotation.copyFromFloats(
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
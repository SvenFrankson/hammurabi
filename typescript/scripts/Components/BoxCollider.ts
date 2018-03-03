///<reference path="./Collider.ts" />

module Hammurabi {

    export class BoxCollider extends Collider {
    
        public center: Vector3 = Vector3.Zero();
        public size: Vector3 = new Vector3(1, 1, 1);
        private _localSize: Vector3 = new Vector3(1, 1, 1);
        public get localSize(): Vector3 {
            this._localSize.copyFromFloats(
                this.size.x * this.transform.localScale.x,
                this.size.y * this.transform.localScale.y,
                this.size.z * this.transform.localScale.z
            );
            return this._localSize;
        }
        private _staticBodyInstance: OIMO.Body;
    
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "BoxCollider";
            this._registerStart();
        }
    
        private _registerStart(): void {
            let observer = this.scene.onBeforeRenderObservable.add(
                () => {
                    let rigidbody = this.GetComponent(Rigidbody);
                    if (!rigidbody) {
                        let bodyInstanceProperties: OIMO.IBodyProperties = {
                            type: "box",
                            size: this.localSize.asArray(),
                            pos: this.gameObject.transform.localPosition.asArray(),
                            rot: this.gameObject.transform.localRotation.toEulerAngles().asArray(),
                            move: false,
                            density: 1,
                            friction: 0.2,
                            restitution: 0.2,
                            belongsTo: 1,
                            collidesWith: 0xffffffff
                        }
                        this._staticBodyInstance = this.scene.physicWorld.add(bodyInstanceProperties);
                    }
                    this.scene.onBeforeRenderObservable.remove(observer);
                }
            );
        }
    
        public intersectsRay(ray: BABYLON.Ray): number {
            let matrix = this.gameObject.getWorldMatrix().clone();
            let thisMatrix = BABYLON.Matrix.Translation(
                this.center.x,
                this.center.y,
                this.center.z
            );
            let worldMatrix = thisMatrix.multiply(matrix);
            worldMatrix = worldMatrix.invert();
            ray = BABYLON.Ray.Transform(ray, worldMatrix);
    
            let dirfrac: BABYLON.Vector3 = BABYLON.Vector3.Zero();
            dirfrac.x = 1.0 / ray.direction.x;
            dirfrac.y = 1.0 / ray.direction.y;
            dirfrac.z = 1.0 / ray.direction.z;
            
            let t1 = (- this.localSize.x * 0.5 - ray.origin.x) * dirfrac.x;
            let t2 = (this.localSize.x * 0.5 - ray.origin.x) * dirfrac.x;
            let t3 = (- this.localSize.y * 0.5 - ray.origin.y) * dirfrac.y;
            let t4 = (this.localSize.y * 0.5 - ray.origin.y) * dirfrac.y;
            let t5 = (- this.localSize.z * 0.5 - ray.origin.z) * dirfrac.z;
            let t6 = (this.localSize.z * 0.5 - ray.origin.z) * dirfrac.z;
    
            let tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
            let tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));
    
            if (tmax < 0) {
                return -1;
            }
    
            if (tmin > tmax) {
                return -1;
            }
    
            return tmin;
        }
    
        public triggerMouseDown(): void {
            this.GetComponents(MonoBehaviour).forEach(
                (m: MonoBehaviour) => {
                    m.OnMouseDown();
                }
            )
        }
    
        public triggerMouseUp(): void {
            this.GetComponents(MonoBehaviour).forEach(
                (m: MonoBehaviour) => {
                    m.OnMouseUp();
                }
            )
        }
    }
}
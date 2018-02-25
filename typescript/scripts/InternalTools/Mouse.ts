module Hammurabi {

    export class Mouse {

        public canvas: BABYLON.Nullable<HTMLCanvasElement>;
        public scene: Scene;
    
        constructor(scene: Scene) {
            this.scene = scene;
            this.canvas = scene.getEngine().getRenderingCanvas();
            if (this.canvas) {
                this.canvas.addEventListener("pointerdown", this._pointerDown);
                this.canvas.addEventListener("pointerup", this._pointerUp);
            }
        }
    
        private _pickColliderWithRay(ray: BABYLON.Ray): BABYLON.Nullable<Collider> {
            let pickedCollider: BABYLON.Nullable<Collider> = null;
            let tMin = Infinity;
            this.scene.colliders.forEach(
                (c: Collider) => {
                    let t = c.intersectsRay(ray);
                    if (t > 0 && t < tMin) {
                        pickedCollider = c;
                    }
                }
            );
            return pickedCollider;
        }
    
        private _pointerDown = (event: PointerEvent) => {
            let ray = this.scene.createPickingRay(
                event.clientX,
                event.clientY,
                BABYLON.Matrix.IdentityReadOnly,
                this.scene.activeCamera
            );
            let pickedCollider = this._pickColliderWithRay(ray);
            if (pickedCollider) {
                pickedCollider.triggerMouseDown();
            }
        }
    
        private _pointerUp = (event: PointerEvent) => {
            let ray = this.scene.createPickingRay(
                event.clientX,
                event.clientY,
                BABYLON.Matrix.IdentityReadOnly,
                this.scene.activeCamera
            );
            let pickedCollider = this._pickColliderWithRay(ray);
            if (pickedCollider) {
                pickedCollider.triggerMouseUp();
            }
        }
    }
}
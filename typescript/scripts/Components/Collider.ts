///<reference path="./Component.ts" />

module Hammurabi {

    export abstract class Collider extends Component {

        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "Collider";
            this.scene.colliders.push(this);
        }
    
        public destroy(): void {
            let index = this.scene.colliders.indexOf(this);
            if (index !== -1) {
                this.scene.colliders.splice(index, 1);
            }
        }
    
        public abstract intersectsRay(ray: BABYLON.Ray): number;
        public abstract triggerMouseDown(): void;
        public abstract triggerMouseUp(): void;
    }
}
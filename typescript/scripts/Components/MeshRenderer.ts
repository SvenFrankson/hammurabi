module Hammurabi {

    export class MeshRenderer extends Component {

        public get material(): Material {
            return this.materials[0];
        }
        public set material(m: Material) {
            this._materials[0] = m;
            this._update();
        }
    
        private _materials: Material[] = [];
        public get materials(): Material[] {
            Runtime.NextFrame(
                () => {
                    this._update();
                }
            )
            return this._materials;
        }
    
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "MeshRenderer";
        }
    
        private _update(): void {
            if (this._materials.length === 1) {
                this.gameObject.material = this._materials[0];
            } else if (this._materials.length > 1) {
                if (!(this.gameObject.material instanceof BABYLON.MultiMaterial)) {
                    this.gameObject.material = new BABYLON.MultiMaterial("MultiMaterial", this.scene);
                }
                if (this.gameObject.material instanceof BABYLON.MultiMaterial) {
                    this.gameObject.material.subMaterials = this._materials;
                }
            }
        }
    }
}
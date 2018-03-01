module Hammurabi {

    export class MeshFilter extends Component {

        private _mesh: Mesh;
        public get mesh(): Mesh {
            return this._mesh;
        }
        public set mesh(m: Mesh) {
            this._mesh = m;
            m.applyToMesh(this.gameObject);
        }
        
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "MeshFilter";
        }
    }
}
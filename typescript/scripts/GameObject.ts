module Hammurabi {

    export class GameObject extends BABYLON.Mesh {

        public scene: Scene;
        public transform: Transform;
        private _components: Component[] = [];
    
        constructor(scene: Scene) {
            super("GameObject", scene);
            this.scene = scene;
            this.transform = this.AddComponent(Transform);
        }
    
        public AddComponent<T extends Component>(TConstructor: new (gameObject: GameObject) => T): T {
            let component = this.GetComponent(TConstructor);
            if (!component) {
                component = new TConstructor(this);
                this._components.push(component);
            }
            return component;
        }
    
        public GetComponent<T extends Component>(TConstructor: new (gameObject: GameObject) => T): BABYLON.Nullable<T> {
            for (let i = 0; i < this._components.length; i++) {
                let component = this._components[i];
                if (component instanceof TConstructor) {
                    return component;
                }
            }
            return null;
        }
        
        public GetComponents<T extends Component>(TConstructor: new (gameObject: GameObject) => T): T[] {
            let components: T[] = [];
            for (let i = 0; i < this._components.length; i++) {
                let component = this._components[i];
                if (component instanceof TConstructor) {
                    components.push(component);
                }
            }
            return components;
        }
    }
}
module Hammurabi {

    export class MonoBehaviour extends Component {

        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "MonoBehaviour";
            this._registerStart();
            this._registerUpdate();
        }
    
        private _registerStart(): void {
            let observer = this.scene.onBeforeRenderObservable.add(
                () => {
                    this.Start();
                    this.scene.onBeforeRenderObservable.remove(observer);
                }
            );
        }
    
        private _registerUpdate(): void {
            let observer = this.scene.onBeforeRenderObservable.add(
                () => {
                    this.Update();
                }
            );
        }
    
        public Start(): void {}
    
        public Update(): void {}
    
        public OnMouseDown(): void {}
    
        public OnMouseUp(): void {}
        
        private StartCoroutine(coroutine: Iterator<void>): void {
            let observer = this.scene.onBeforeRenderObservable.add(
                () => {
                    if (coroutine.next().done) {
                        this.scene.onBeforeRenderObservable.remove(observer);
                    }
                }
            );
        }
    }
}
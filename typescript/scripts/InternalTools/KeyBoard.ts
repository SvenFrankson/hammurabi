module Hammurabi {

    export class KeyBoard {

        public canvas: HTMLCanvasElement;
        public scene: Scene;
        
        public keyDowned: string[] = [];
        public keyPressed: string[] = [];
        public keyUped: string[] = [];
    
        constructor(scene: Scene) {
            this.scene = scene;
            this.canvas = scene.getEngine().getRenderingCanvas();
            this.canvas.addEventListener("keydown", this._keyDown);
            this.canvas.addEventListener("keyup", this._keyUp);
            this.scene.onAfterRenderObservable.add(this._clear);
        }
    
        private _keyDown = (event: KeyboardEvent) => {
            let index = this.keyPressed.indexOf(event.key);
            if (index === -1) {
                this.keyDowned.push(event.key);
                this.keyPressed.push(event.key);
            }
        }
    
        private _keyUp = (event: KeyboardEvent) => {
            this.keyUped.push(event.key);
            let index = this.keyPressed.indexOf(event.key);
            if (index !== -1) {
                this.keyPressed.splice(index, 1);
            }
        }
    
        private _clear = () => {
            this.keyDowned.length = 0;
            this.keyUped.length = 0;
        }
    }
}
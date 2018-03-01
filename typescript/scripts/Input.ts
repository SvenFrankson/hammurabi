module Hammurabi {
    
    export class Input {

        public static GetKey(name: string): boolean {
            return Scene.Instance.keyboard.keyPressed.indexOf(name) !== -1;
        }
    
        public static GetKeyDown(name: string): boolean {
            return Scene.Instance.keyboard.keyDowned.indexOf(name) !== -1;
        }
    
        public static GetKeyUp(name: string): boolean {
            return Scene.Instance.keyboard.keyUped.indexOf(name) !== -1;
        }
    }
}
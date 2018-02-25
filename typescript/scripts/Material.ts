module Hammurabi {

    export class Material extends BABYLON.StandardMaterial {

        public static references: Map<string, Material> = new Map<string, Material>();
    
        public scene: Scene;
        public get color(): IColor {
            let c = new BABYLON.Color4(this.diffuseColor.r, this.diffuseColor.g, this.diffuseColor.b, 1);
            c.a = this.alpha;
            return c;
        }
        public set color(c: IColor) {
            this.diffuseColor.copyFromFloats(
                c.r,
                c.g,
                c.b
            );
            this.alpha = c.a;
        }
    
        constructor(scene: Scene) {
            super("Unnamed", scene);
            this.scene = scene;
        }
    }
}
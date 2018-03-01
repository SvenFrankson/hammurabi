module Hammurabi {

    export class Scene extends BABYLON.Scene {
    
        public static Instance: Scene;
    
        public mouse: Mouse;
        public keyboard: KeyBoard;
        public colliders: Collider[] = [];
        public physicWorld: OIMO.World;
    
        constructor(engine: BABYLON.Engine) {
            super(engine);
            Scene.Instance = this;
            this.mouse = new Mouse(this);
            this.keyboard = new KeyBoard(this);
            this.physicWorld = new OIMO.World({
                timestep: 1 / 60,
                iterations: 8,
                broadphase: 1,
                worldscale: 1,
                random: true,
                info: false,
                gravity: [0, -9.8, 0]
            });
    
            this.registerBeforeRender(
                () => {
                    this.physicWorld.step();
                }
            )
        }
    }
}
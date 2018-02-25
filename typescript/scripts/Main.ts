class Main {

    public static ComponentConstructors: Map<string, new (gameObject: Hammurabi.GameObject) => Hammurabi.Component> = new Map<string, new (gameObject: Hammurabi.GameObject) => Hammurabi.Component>();
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;
    public scene: Hammurabi.Scene;
    public static scene: Hammurabi.Scene;
    public light: BABYLON.Light;
    public camera: BABYLON.Camera;

    constructor(canvasElement: string) {
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true, {stencil: true}, true);
        BABYLON.Engine.ShadersRepository = "./shaders/";
    }

    public async createScene() {
        Main.ComponentConstructors.set("Transform", Hammurabi.Transform);
        Main.ComponentConstructors.set("MeshFilter", Hammurabi.MeshFilter);
        Main.ComponentConstructors.set("MeshRenderer", Hammurabi.MeshRenderer);
        Main.ComponentConstructors.set("Camera", Hammurabi.Camera);
        Main.ComponentConstructors.set("Light", Hammurabi.Light);
        Main.ComponentConstructors.set("BoxCollider", Hammurabi.BoxCollider);
        Main.ComponentConstructors.set("TestMBH", TestMBH);
        Main.ComponentConstructors.set("TestMBH2", TestMBH2);
        this.scene = new Hammurabi.Scene(this.engine);
        this.scene.clearColor.copyFromFloats(0.9, 0.9, 0.9, 1);
        Main.scene = this.scene;
        this.resize();

        let mouse = new Hammurabi.Mouse(this.scene);

        await Hammurabi.Loader.LoadScene("test", this.scene);
        main.animate();
    }

    public animate(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener("resize", () => {
            this.resize();
        });
    }

    public resize(): void {
        this.engine.resize();
    }
}

var main: Main;
window.addEventListener("DOMContentLoaded", () => {
    main = new Main("render-canvas");
    main.createScene();
});

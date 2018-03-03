/// <reference path="../typescript/node_modules/@types/jquery/index.d.ts" />
/// <reference types="babylonjs" />
declare module Hammurabi {
    class GameObject extends BABYLON.Mesh {
        scene: Scene;
        transform: Transform;
        private _components;
        constructor(scene: Scene);
        AddComponent<T extends Component>(TConstructor: new (gameObject: GameObject) => T): T;
        GetComponent<T extends Component>(TConstructor: new (gameObject: GameObject) => T): BABYLON.Nullable<T>;
        GetComponents<T extends Component>(TConstructor: new (gameObject: GameObject) => T): T[];
    }
}
declare module Hammurabi {
    class Input {
        static GetKey(name: string): boolean;
        static GetKeyDown(name: string): boolean;
        static GetKeyUp(name: string): boolean;
    }
}
declare module Hammurabi {
    interface IVector3 {
        x: number;
        y: number;
        z: number;
    }
    interface IQuaternion {
        x: number;
        y: number;
        z: number;
        w: number;
    }
    interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    interface IScene {
        gameObjects: IGameObject[];
    }
    interface IGameObject {
        n: string;
        c: IComponent[];
    }
    interface IComponent {
        n: string;
        p?: IVector3;
        r?: IQuaternion;
        s?: IVector3;
        mesh?: string;
        materials?: string[];
        color?: IColor;
        intensity?: number;
        range?: number;
        type?: LightType;
        spotAngle?: number;
        center?: IVector3;
        size?: IVector3;
        mass?: number;
        properties?: ISerializedProperty[];
    }
    interface IMesh {
        name: string;
        v: number[];
        i: number[];
        n?: number[];
        u?: number[];
    }
    interface IMaterial {
        name: string;
        color: IColor;
    }
    enum SerializablePropertyType {
        Number = 0,
        String = 1,
        Mesh = 2,
        Material = 3,
    }
    interface ISerializedProperty {
        k: string;
        t: SerializablePropertyType;
        v: any;
    }
}
declare module Hammurabi {
    class Loader {
        static LoadScene(ref: string, scene: Scene): Promise<void>;
        private static _getScene(ref);
        private static _loadLinkedMeshes(data);
        private static _loadLinkedMaterials(data);
        private static _setScene(data, scene);
        private static _setGameObjectAt(data, target);
        private static _setComponentAt(data, target);
        private static _setTransformAt(data, target);
        private static _setMeshFilterAt(data, target);
        private static _setMeshRendererAt(data, target);
        private static _setCameraAt(data, target);
        private static _setLightAt(data, target);
        private static _setBoxColliderAt(data, target);
        private static _setRigidbodyAt(data, target);
        private static _setMonoBehaviourAt(data, target);
        private static _loadMesh(ref);
        private static _setMeshAt(data, target);
        private static _loadMaterial(ref);
        private static _setMaterialAt(data, target);
        private static _prefabCache;
        private static _getPrefab(ref);
    }
}
declare class Main {
    static ComponentConstructors: Map<string, new (gameObject: Hammurabi.GameObject) => Hammurabi.Component>;
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene: Hammurabi.Scene;
    static scene: Hammurabi.Scene;
    light: BABYLON.Light;
    camera: BABYLON.Camera;
    constructor(canvasElement: string);
    createScene(): Promise<void>;
    animate(): void;
    resize(): void;
}
declare var main: Main;
declare module Hammurabi {
    class Material extends BABYLON.StandardMaterial {
        static references: Map<string, Material>;
        scene: Scene;
        color: IColor;
        constructor(scene: Scene);
    }
}
declare module Hammurabi {
    class Mesh extends BABYLON.VertexData {
        static references: Map<string, Mesh>;
    }
}
declare module Hammurabi {
    class Quaternion extends BABYLON.Vector3 {
    }
}
declare module Hammurabi {
    class Scene extends BABYLON.Scene {
        static Instance: Scene;
        mouse: Mouse;
        keyboard: KeyBoard;
        colliders: Collider[];
        physicWorld: OIMO.World;
        constructor(engine: BABYLON.Engine);
    }
}
declare module Hammurabi {
    class Vector3 extends BABYLON.Vector3 {
    }
}
declare module Hammurabi {
    class Component {
        name: string;
        gameObject: GameObject;
        readonly scene: Scene;
        readonly transform: Transform;
        constructor(gameObject: GameObject);
        GetComponent<T extends Component>(TConstructor: new (gameObject: GameObject) => T): T;
        GetComponents<T extends Component>(TConstructor: new (gameObject: GameObject) => T): T[];
    }
}
declare module Hammurabi {
    abstract class Collider extends Component {
        constructor(gameObject: GameObject);
        destroy(): void;
        abstract intersectsRay(ray: BABYLON.Ray): number;
        abstract triggerMouseDown(): void;
        abstract triggerMouseUp(): void;
    }
}
declare module Hammurabi {
    class BoxCollider extends Collider {
        center: Vector3;
        size: Vector3;
        private _localSize;
        readonly localSize: Vector3;
        private _staticBodyInstance;
        constructor(gameObject: GameObject);
        private _registerStart();
        intersectsRay(ray: BABYLON.Ray): number;
        triggerMouseDown(): void;
        triggerMouseUp(): void;
    }
}
declare module Hammurabi {
    class Camera extends Component {
        private _cameraInstance;
        constructor(gameObject: GameObject);
    }
}
declare module Hammurabi {
    enum LightType {
        Spot = 0,
        Directional = 1,
        Point = 2,
        Area = 3,
        Undefined = 4,
    }
    class Light extends Component {
        color: IColor;
        intensity: number;
        range: number;
        type: LightType;
        private _spotAngle;
        spotAngle: number;
        private _lightInstance;
        constructor(gameObject: GameObject);
        private _useSpotLight();
        private _useDirectionalLight();
        private _usePointLight();
        private _syncLightTransform;
    }
}
declare module Hammurabi {
    class MeshFilter extends Component {
        private _mesh;
        mesh: Mesh;
        constructor(gameObject: GameObject);
    }
}
declare module Hammurabi {
    class MeshRenderer extends Component {
        material: Material;
        private _materials;
        readonly materials: Material[];
        constructor(gameObject: GameObject);
        private _update();
    }
}
declare module Hammurabi {
    class MonoBehaviour extends Component {
        constructor(gameObject: GameObject);
        private _registerStart();
        private _registerUpdate();
        Start(): void;
        Update(): void;
        OnMouseDown(): void;
        OnMouseUp(): void;
        private StartCoroutine(coroutine);
    }
}
declare module Hammurabi {
    class Rigidbody extends Component {
        private _bodyInstance;
        mass: number;
        constructor(gameObject: GameObject);
        private _registerStart();
        private _registerUpdate();
    }
}
declare module Hammurabi {
    class Transform extends Component {
        constructor(gameObject: GameObject);
        localPosition: BABYLON.Vector3;
        localRotation: BABYLON.Quaternion;
        localScale: BABYLON.Vector3;
    }
}
declare module Hammurabi {
    class ColorUtils {
        static Color3ToIColor(c: BABYLON.Color3): IColor;
        static IColorToColor3(c: IColor): BABYLON.Color3;
    }
}
declare module Hammurabi {
    class KeyBoard {
        canvas: HTMLCanvasElement;
        scene: Scene;
        keyDowned: string[];
        keyPressed: string[];
        keyUped: string[];
        constructor(scene: Scene);
        private _keyDown;
        private _keyUp;
        private _clear;
    }
}
declare module Hammurabi {
    class Mouse {
        canvas: BABYLON.Nullable<HTMLCanvasElement>;
        scene: Scene;
        constructor(scene: Scene);
        private _pickColliderWithRay(ray);
        private _pointerDown;
        private _pointerUp;
    }
}
declare module Hammurabi {
    class Runtime {
        static NextFrame(action: () => void): void;
    }
}
declare module Hammurabi {
    class Sanitizer {
        static Number(v: number): number;
        static Ratio(v: number): number;
        static Angle(v: number): number;
        static Position(p: IVector3): Vector3;
        static Size(s: IVector3): Vector3;
        static Color(c: IColor): IColor;
        static LightType(t: LightType): LightType;
    }
}

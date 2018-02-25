var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Hammurabi;
(function (Hammurabi) {
    class Component {
        constructor(gameObject) {
            this.gameObject = gameObject;
        }
        get scene() {
            return this.gameObject.scene;
        }
        get transform() {
            return this.gameObject.transform;
        }
        GetComponent(TConstructor) {
            return this.gameObject.GetComponent(TConstructor);
        }
        GetComponents(TConstructor) {
            return this.gameObject.GetComponents(TConstructor);
        }
    }
    Hammurabi.Component = Component;
})(Hammurabi || (Hammurabi = {}));
///<reference path="./Component.ts" />
var Hammurabi;
(function (Hammurabi) {
    class Collider extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this.name = "Collider";
            this.scene.colliders.push(this);
        }
        destroy() {
            let index = this.scene.colliders.indexOf(this);
            if (index !== -1) {
                this.scene.colliders.splice(index, 1);
            }
        }
    }
    Hammurabi.Collider = Collider;
})(Hammurabi || (Hammurabi = {}));
///<reference path="./Collider.ts" />
var Hammurabi;
(function (Hammurabi) {
    class BoxCollider extends Hammurabi.Collider {
        constructor(gameObject) {
            super(gameObject);
            this.center = BABYLON.Vector3.Zero();
            this.size = new BABYLON.Vector3(1, 1, 1);
            this.name = "BoxCollider";
        }
        intersectsRay(ray) {
            let matrix = this.gameObject.getWorldMatrix().clone();
            let thisMatrix = BABYLON.Matrix.Translation(this.center.x, this.center.y, this.center.z);
            let worldMatrix = thisMatrix.multiply(matrix);
            worldMatrix = worldMatrix.invert();
            ray = BABYLON.Ray.Transform(ray, worldMatrix);
            let dirfrac = BABYLON.Vector3.Zero();
            dirfrac.x = 1.0 / ray.direction.x;
            dirfrac.y = 1.0 / ray.direction.y;
            dirfrac.z = 1.0 / ray.direction.z;
            let t1 = (-this.size.x * 0.5 - ray.origin.x) * dirfrac.x;
            let t2 = (this.size.x * 0.5 - ray.origin.x) * dirfrac.x;
            let t3 = (-this.size.y * 0.5 - ray.origin.y) * dirfrac.y;
            let t4 = (this.size.y * 0.5 - ray.origin.y) * dirfrac.y;
            let t5 = (-this.size.z * 0.5 - ray.origin.z) * dirfrac.z;
            let t6 = (this.size.z * 0.5 - ray.origin.z) * dirfrac.z;
            let tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
            let tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));
            if (tmax < 0) {
                return -1;
            }
            if (tmin > tmax) {
                return -1;
            }
            return tmin;
        }
        triggerMouseDown() {
            this.GetComponents(Hammurabi.MonoBehaviour).forEach((m) => {
                m.OnMouseDown();
            });
        }
        triggerMouseUp() {
            this.GetComponents(Hammurabi.MonoBehaviour).forEach((m) => {
                m.OnMouseUp();
            });
        }
    }
    Hammurabi.BoxCollider = BoxCollider;
})(Hammurabi || (Hammurabi = {}));
///<reference path="./Component.ts" />
var Hammurabi;
(function (Hammurabi) {
    class Camera extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this.name = "Camera";
            this._cameraInstance = new BABYLON.Camera("_cameraInstance", BABYLON.Vector3.Zero(), gameObject.scene);
            this._cameraInstance.parent = this.gameObject;
        }
    }
    Hammurabi.Camera = Camera;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class GameObject extends BABYLON.Mesh {
        constructor(scene) {
            super("GameObject", scene);
            this._components = [];
            this.scene = scene;
            this.transform = this.AddComponent(Hammurabi.Transform);
        }
        AddComponent(TConstructor) {
            let component = this.GetComponent(TConstructor);
            if (!component) {
                component = new TConstructor(this);
                this._components.push(component);
            }
            return component;
        }
        GetComponent(TConstructor) {
            for (let i = 0; i < this._components.length; i++) {
                let component = this._components[i];
                if (component instanceof TConstructor) {
                    return component;
                }
            }
            return null;
        }
        GetComponents(TConstructor) {
            let components = [];
            for (let i = 0; i < this._components.length; i++) {
                let component = this._components[i];
                if (component instanceof TConstructor) {
                    components.push(component);
                }
            }
            return components;
        }
    }
    Hammurabi.GameObject = GameObject;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    let SerializablePropertyType;
    (function (SerializablePropertyType) {
        SerializablePropertyType[SerializablePropertyType["Number"] = 0] = "Number";
        SerializablePropertyType[SerializablePropertyType["String"] = 1] = "String";
        SerializablePropertyType[SerializablePropertyType["Mesh"] = 2] = "Mesh";
        SerializablePropertyType[SerializablePropertyType["Material"] = 3] = "Material";
    })(SerializablePropertyType = Hammurabi.SerializablePropertyType || (Hammurabi.SerializablePropertyType = {}));
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    let LightType;
    (function (LightType) {
        LightType[LightType["Spot"] = 0] = "Spot";
        LightType[LightType["Directional"] = 1] = "Directional";
        LightType[LightType["Point"] = 2] = "Point";
        LightType[LightType["Area"] = 3] = "Area";
        LightType[LightType["Undefined"] = 4] = "Undefined";
    })(LightType = Hammurabi.LightType || (Hammurabi.LightType = {}));
    class Light extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this._spotAngle = 90;
            this._syncLightTransform = () => {
                if (this._lightInstance instanceof BABYLON.DirectionalLight) {
                    this.gameObject.getDirectionToRef(BABYLON.Axis.Y, this._lightInstance.direction);
                }
            };
            this.name = "Light";
            this._lightInstance = this._useDirectionalLight();
            this._lightInstance.parent = gameObject;
            this.scene.onBeforeRenderObservable.add(this._syncLightTransform);
        }
        get color() {
            return Hammurabi.ColorUtils.Color3ToIColor(this._lightInstance.diffuse);
        }
        set color(c) {
            this._lightInstance.diffuse = Hammurabi.ColorUtils.IColorToColor3(c);
        }
        get intensity() {
            return this._lightInstance.intensity;
        }
        set intensity(v) {
            this._lightInstance.intensity = v;
        }
        get range() {
            return this._lightInstance.range;
        }
        set range(v) {
            this._lightInstance.range = v;
        }
        get type() {
            if (this._lightInstance instanceof BABYLON.SpotLight) {
                return LightType.Spot;
            }
            if (this._lightInstance instanceof BABYLON.DirectionalLight) {
                return LightType.Directional;
            }
            if (this._lightInstance instanceof BABYLON.PointLight) {
                return LightType.Point;
            }
            return LightType.Undefined;
        }
        set type(t) {
            if (t !== this.type) {
                let newLight;
                if (t === LightType.Spot) {
                    newLight = this._useSpotLight();
                }
                else if (t === LightType.Directional || t === LightType.Area) {
                    newLight = this._useDirectionalLight();
                }
                else if (t === LightType.Point) {
                    newLight = this._usePointLight();
                }
                else {
                    newLight = this._usePointLight();
                }
                newLight.parent = this.gameObject;
                newLight.diffuse = Hammurabi.ColorUtils.IColorToColor3(this.color);
                newLight.intensity = this.intensity;
                newLight.range = this.range;
                this._lightInstance.dispose();
                this._lightInstance = newLight;
            }
        }
        get spotAngle() {
            return this._spotAngle;
        }
        set spotAngle(v) {
            if (this._lightInstance instanceof BABYLON.SpotLight) {
                this._lightInstance.angle = v / 180 * Math.PI;
            }
        }
        _useSpotLight() {
            let spotLight = new BABYLON.SpotLight("light_instance", BABYLON.Vector3.Zero(), BABYLON.Vector3.Up(), this.spotAngle / 180 * Math.PI, 1, this.scene);
            return spotLight;
        }
        _useDirectionalLight() {
            let directionalLight = new BABYLON.DirectionalLight("light_instance", BABYLON.Vector3.Up(), this.scene);
            return directionalLight;
        }
        _usePointLight() {
            let pointLight = new BABYLON.PointLight("light_instance", BABYLON.Vector3.Up(), this.scene);
            return pointLight;
        }
    }
    Hammurabi.Light = Light;
})(Hammurabi || (Hammurabi = {}));
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
var Hammurabi;
(function (Hammurabi) {
    class Loader {
        static LoadScene(ref, scene) {
            return __awaiter(this, void 0, void 0, function* () {
                let data = yield Loader._getScene(ref);
                yield Loader._loadLinkedMeshes(data);
                yield Loader._loadLinkedMaterials(data);
                Loader._setScene(data, scene);
            });
        }
        static _getScene(ref) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: "./" + ref + ".scene.json",
                        success: (data) => {
                            resolve(data);
                        },
                        error: () => {
                            reject();
                        }
                    });
                });
            });
        }
        static _loadLinkedMeshes(data) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < data.gameObjects.length; i++) {
                    let gameObjectData = data.gameObjects[i];
                    for (let j = 0; j < gameObjectData.c.length; j++) {
                        let componentData = gameObjectData.c[j];
                        if (componentData.mesh) {
                            yield Loader._loadMesh(componentData.mesh);
                        }
                        if (componentData.properties) {
                            for (let k = 0; k < componentData.properties.length; k++) {
                                let property = componentData.properties[k];
                                if (property.t === Hammurabi.SerializablePropertyType.Mesh) {
                                    yield Loader._loadMesh(property.v);
                                }
                            }
                        }
                    }
                }
            });
        }
        static _loadLinkedMaterials(data) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < data.gameObjects.length; i++) {
                    let gameObjectData = data.gameObjects[i];
                    for (let j = 0; j < gameObjectData.c.length; j++) {
                        let componentData = gameObjectData.c[j];
                        if (componentData.materials) {
                            for (let k = 0; k < componentData.materials.length; k++) {
                                yield Loader._loadMaterial(componentData.materials[k]);
                            }
                        }
                        if (componentData.properties) {
                            for (let k = 0; k < componentData.properties.length; k++) {
                                let property = componentData.properties[k];
                                if (property.t === Hammurabi.SerializablePropertyType.Material) {
                                    yield Loader._loadMaterial(property.v);
                                }
                            }
                        }
                    }
                }
            });
        }
        static _setScene(data, scene) {
            data.gameObjects.forEach((gameObjectData) => {
                let gameObject = new Hammurabi.GameObject(scene);
                Loader._setGameObjectAt(gameObjectData, gameObject);
            });
        }
        static _setGameObjectAt(data, target) {
            target.name = data.n;
            for (let i = 0; i < data.c.length; i++) {
                let componantData = data.c[i];
                let componentConstructor = Main.ComponentConstructors.get(componantData.n);
                if (componentConstructor) {
                    let component = target.AddComponent(componentConstructor);
                    Loader._setComponentAt(componantData, component);
                }
            }
        }
        static _setComponentAt(data, target) {
            target.name = data.n;
            if (target instanceof Hammurabi.Transform) {
                Loader._setTransformAt(data, target);
            }
            if (target instanceof Hammurabi.MeshFilter) {
                Loader._setMeshFilterAt(data, target);
            }
            if (target instanceof Hammurabi.MeshRenderer) {
                Loader._setMeshRendererAt(data, target);
            }
            if (target instanceof Hammurabi.Camera) {
                Loader._setCameraAt(data, target);
            }
            if (target instanceof Hammurabi.Light) {
                Loader._setLightAt(data, target);
            }
            if (target instanceof Hammurabi.BoxCollider) {
                Loader._setBoxColliderAt(data, target);
            }
            if (target instanceof Hammurabi.MonoBehaviour) {
                Loader._setMonoBehaviourAt(data, target);
            }
        }
        static _setTransformAt(data, target) {
            target.localPosition.copyFromFloats(data.p.x, data.p.y, data.p.z);
            target.localRotation.copyFromFloats(data.r.x, data.r.y, data.r.z, data.r.w);
        }
        static _setMeshFilterAt(data, target) {
            target.mesh = Hammurabi.Mesh.references.get(data.mesh);
        }
        static _setMeshRendererAt(data, target) {
            for (let i = 0; i < data.materials.length; i++) {
                target.materials[i] = Hammurabi.Material.references.get(data.materials[i]);
            }
        }
        static _setCameraAt(data, target) {
        }
        static _setLightAt(data, target) {
            target.type = Hammurabi.Sanitizer.LightType(data.type);
            target.color = Hammurabi.Sanitizer.Color(data.color);
            target.intensity = Hammurabi.Sanitizer.Ratio(data.intensity);
            target.range = Hammurabi.Sanitizer.Number(data.range);
            target.spotAngle = Hammurabi.Sanitizer.Angle(data.spotAngle);
        }
        static _setBoxColliderAt(data, target) {
            target.center = Hammurabi.Sanitizer.Position(data.center);
            target.size = Hammurabi.Sanitizer.Size(data.size);
        }
        static _setMonoBehaviourAt(data, target) {
            if (data.properties) {
                for (let i = 0; i < data.properties.length; i++) {
                    let property = data.properties[i];
                    if (property.t === Hammurabi.SerializablePropertyType.Number ||
                        property.t === Hammurabi.SerializablePropertyType.String) {
                        target[property.k] = property.v;
                    }
                    if (property.t === Hammurabi.SerializablePropertyType.Mesh) {
                        target[property.k] = Hammurabi.Mesh.references.get(property.v);
                    }
                    if (property.t === Hammurabi.SerializablePropertyType.Material) {
                        target[property.k] = Hammurabi.Material.references.get(property.v);
                    }
                }
            }
        }
        static _loadMesh(ref) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let m = Hammurabi.Mesh.references.get(ref);
                    if (m) {
                        resolve(m);
                    }
                    else {
                        $.ajax({
                            url: "./assets/linked/" + ref + ".mesh.json",
                            success: (data) => {
                                let m = new Hammurabi.Mesh();
                                Loader._setMeshAt(data, m);
                                Hammurabi.Mesh.references.set(ref, m);
                                resolve(m);
                            },
                            error: () => {
                                reject();
                            }
                        });
                    }
                });
            });
        }
        static _setMeshAt(data, target) {
            target.positions = data.v;
            target.indices = data.i;
            if (data.n) {
                target.normals = data.n;
            }
            if (data.u) {
                target.uvs = data.u;
            }
        }
        static _loadMaterial(ref) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    let m = Hammurabi.Material.references.get(ref);
                    if (m) {
                        resolve(m);
                    }
                    else {
                        $.ajax({
                            url: "./assets/linked/" + ref + ".material.json",
                            success: (data) => {
                                let m = new Hammurabi.Material(Main.scene);
                                Loader._setMaterialAt(data, m);
                                Hammurabi.Material.references.set(ref, m);
                                resolve(m);
                            },
                            error: () => {
                                reject();
                            }
                        });
                    }
                });
            });
        }
        static _setMaterialAt(data, target) {
            target.name = data.name;
            target.color = Hammurabi.Sanitizer.Color(data.color);
        }
        static _getPrefab(ref) {
            return new Promise((resolve, reject) => {
                let p = Loader._prefabCache.get(ref);
                if (p) {
                    resolve(p);
                }
                else {
                    $.ajax({
                        url: "./assets/linked/" + ref + ".prefab.json",
                        success: (data) => {
                            resolve(data);
                        },
                        error: () => {
                            reject();
                        }
                    });
                }
            });
        }
    }
    Loader._prefabCache = new Map();
    Hammurabi.Loader = Loader;
})(Hammurabi || (Hammurabi = {}));
class Main {
    constructor(canvasElement) {
        this.canvas = document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true, { stencil: true }, true);
        BABYLON.Engine.ShadersRepository = "./shaders/";
    }
    createScene() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield Hammurabi.Loader.LoadScene("test", this.scene);
            main.animate();
        });
    }
    animate() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener("resize", () => {
            this.resize();
        });
    }
    resize() {
        this.engine.resize();
    }
}
Main.ComponentConstructors = new Map();
var main;
window.addEventListener("DOMContentLoaded", () => {
    main = new Main("render-canvas");
    main.createScene();
});
var Hammurabi;
(function (Hammurabi) {
    class Material extends BABYLON.StandardMaterial {
        constructor(scene) {
            super("Unnamed", scene);
            this.scene = scene;
        }
        get color() {
            let c = new BABYLON.Color4(this.diffuseColor.r, this.diffuseColor.g, this.diffuseColor.b, 1);
            c.a = this.alpha;
            return c;
        }
        set color(c) {
            this.diffuseColor.copyFromFloats(c.r, c.g, c.b);
            this.alpha = c.a;
        }
    }
    Material.references = new Map();
    Hammurabi.Material = Material;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class Mesh extends BABYLON.VertexData {
    }
    Mesh.references = new Map();
    Hammurabi.Mesh = Mesh;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class MeshFilter extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this.name = "MeshFilter";
        }
        get mesh() {
            return this._mesh;
        }
        set mesh(m) {
            this._mesh = m;
            m.applyToMesh(this.gameObject);
        }
    }
    Hammurabi.MeshFilter = MeshFilter;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class MeshRenderer extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this._materials = [];
            this.name = "MeshRenderer";
        }
        get material() {
            return this.materials[0];
        }
        set material(m) {
            this._materials[0] = m;
            this._update();
        }
        get materials() {
            Hammurabi.Runtime.NextFrame(() => {
                this._update();
            });
            return this._materials;
        }
        _update() {
            if (this._materials.length === 1) {
                this.gameObject.material = this._materials[0];
            }
            else if (this._materials.length > 1) {
                if (!(this.gameObject.material instanceof BABYLON.MultiMaterial)) {
                    this.gameObject.material = new BABYLON.MultiMaterial("MultiMaterial", this.scene);
                }
                if (this.gameObject.material instanceof BABYLON.MultiMaterial) {
                    this.gameObject.material.subMaterials = this._materials;
                }
            }
        }
    }
    Hammurabi.MeshRenderer = MeshRenderer;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class MonoBehaviour extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this.name = "MonoBehaviour";
            this._registerStart();
            this._registerUpdate();
        }
        _registerStart() {
            let observer = this.scene.onBeforeRenderObservable.add(() => {
                this.Start();
                this.scene.onBeforeRenderObservable.remove(observer);
            });
        }
        _registerUpdate() {
            let observer = this.scene.onBeforeRenderObservable.add(() => {
                this.Update();
            });
        }
        Start() { }
        Update() { }
        OnMouseDown() { }
        OnMouseUp() { }
        StartCoroutine(coroutine) {
            let observer = this.scene.onBeforeRenderObservable.add(() => {
                if (coroutine.next().done) {
                    this.scene.onBeforeRenderObservable.remove(observer);
                }
            });
        }
    }
    Hammurabi.MonoBehaviour = MonoBehaviour;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class Scene extends BABYLON.Scene {
        constructor() {
            super(...arguments);
            this.colliders = [];
        }
    }
    Hammurabi.Scene = Scene;
})(Hammurabi || (Hammurabi = {}));
class TestMBH extends Hammurabi.MonoBehaviour {
    constructor() {
        super(...arguments);
        this.speed = 0.01;
    }
    Update() {
        this.transform.localPosition = this.transform.localPosition.add(new BABYLON.Vector3(this.speed, 0, 0));
    }
    OnMouseDown() {
        console.log("v");
    }
    OnMouseUp() {
        console.log("^");
    }
}
class TestMBH2 extends Hammurabi.MonoBehaviour {
    Update() {
    }
    OnMouseDown() {
        this.GetComponent(Hammurabi.MeshRenderer).material = this.materialRed;
    }
    OnMouseUp() {
        this.GetComponent(Hammurabi.MeshRenderer).material = this.materialBlue;
    }
}
var Hammurabi;
(function (Hammurabi) {
    class Transform extends Hammurabi.Component {
        constructor(gameObject) {
            super(gameObject);
            this.name = "Transform";
            this.gameObject.rotationQuaternion = BABYLON.Quaternion.Identity();
        }
        get localPosition() {
            return this.gameObject.position;
        }
        set localPosition(p) {
            this.gameObject.position = p;
        }
        get localRotation() {
            return this.gameObject.rotationQuaternion;
        }
        set localRotation(r) {
            this.gameObject.rotationQuaternion = r;
        }
    }
    Hammurabi.Transform = Transform;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class ColorUtils {
        static Color3ToIColor(c) {
            return new BABYLON.Color4(c.r, c.g, c.b, 1);
        }
        static IColorToColor3(c) {
            return new BABYLON.Color3(c.r, c.g, c.b);
        }
    }
    Hammurabi.ColorUtils = ColorUtils;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class Mouse {
        constructor(scene) {
            this._pointerDown = (event) => {
                let ray = this.scene.createPickingRay(event.clientX, event.clientY, BABYLON.Matrix.IdentityReadOnly, this.scene.activeCamera);
                let pickedCollider = this._pickColliderWithRay(ray);
                if (pickedCollider) {
                    pickedCollider.triggerMouseDown();
                }
            };
            this._pointerUp = (event) => {
                let ray = this.scene.createPickingRay(event.clientX, event.clientY, BABYLON.Matrix.IdentityReadOnly, this.scene.activeCamera);
                let pickedCollider = this._pickColliderWithRay(ray);
                if (pickedCollider) {
                    pickedCollider.triggerMouseUp();
                }
            };
            this.scene = scene;
            this.canvas = scene.getEngine().getRenderingCanvas();
            if (this.canvas) {
                this.canvas.addEventListener("pointerdown", this._pointerDown);
                this.canvas.addEventListener("pointerup", this._pointerUp);
            }
        }
        _pickColliderWithRay(ray) {
            let pickedCollider = null;
            let tMin = Infinity;
            this.scene.colliders.forEach((c) => {
                let t = c.intersectsRay(ray);
                if (t > 0 && t < tMin) {
                    pickedCollider = c;
                }
            });
            return pickedCollider;
        }
    }
    Hammurabi.Mouse = Mouse;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class Runtime {
        static NextFrame(action) {
            let callback = () => {
                action();
                Main.scene.onAfterRenderObservable.removeCallback(callback);
            };
            Main.scene.onAfterRenderObservable.add(callback);
        }
    }
    Hammurabi.Runtime = Runtime;
})(Hammurabi || (Hammurabi = {}));
var Hammurabi;
(function (Hammurabi) {
    class Sanitizer {
        static Number(v) {
            if (isFinite(v)) {
                return v;
            }
            return 0;
        }
        static Ratio(v) {
            if (isFinite(v)) {
                return v;
            }
            return 0.5;
        }
        static Angle(v) {
            if (isFinite(v)) {
                return v;
            }
            return 60;
        }
        static Position(p) {
            if (p && isFinite(p.x + p.y + p.z)) {
                return p;
            }
            return new BABYLON.Vector3(0, 0, 0);
        }
        static Size(s) {
            if (s && isFinite(s.x + s.y + s.z)) {
                return s;
            }
            return new BABYLON.Vector3(1, 1, 1);
        }
        static Color(c) {
            if (c && isFinite(c.r + c.g + c.b + c.a)) {
                return c;
            }
            return new BABYLON.Color4(0.8, 0.8, 0.8, 1);
        }
        static LightType(t) {
            if (t in Hammurabi.LightType) {
                return t;
            }
            return Hammurabi.LightType.Directional;
        }
    }
    Hammurabi.Sanitizer = Sanitizer;
})(Hammurabi || (Hammurabi = {}));

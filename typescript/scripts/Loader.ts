/// <reference path="../node_modules/@types/jquery/index.d.ts"/>

module Hammurabi {

    export class Loader {

        public static async LoadScene(ref: string, scene: Scene): Promise<void> {
            let data = await Loader._getScene(ref);
            await Loader._loadLinkedMeshes(data);
            await Loader._loadLinkedMaterials(data);
            Loader._setScene(data, scene);
        }
    
        private static async _getScene(ref: string): Promise<IScene> {
            return new Promise<IScene>(
                (resolve, reject) => {
                    $.ajax(
                        {
                            url: "./" + ref + ".scene.json",
                            success: (data: IScene) => {
                                resolve(data);
                            },
                            error: () => {
                                reject("Scene " + ref + " not found");
                            }
                        }
                    );
                }
            );
        }
    
        private static async _loadLinkedMeshes(data: IScene): Promise<void> {
            for (let i = 0; i < data.gameObjects.length; i++) {
                let gameObjectData = data.gameObjects[i];
                for (let j = 0; j < gameObjectData.c.length; j++) {
                    let componentData = gameObjectData.c[j];
                    if (componentData.mesh) {
                        await Loader._loadMesh(componentData.mesh);
                    }
                    if (componentData.properties) {
                        for (let k = 0; k < componentData.properties.length; k++) {
                            let property = componentData.properties[k];
                            if (property.t === SerializablePropertyType.Mesh) {
                                await Loader._loadMesh(property.v);
                            }
                        }
                    }
                }
            }
        }
    
        private static async _loadLinkedMaterials(data: IScene): Promise<void> {
            for (let i = 0; i < data.gameObjects.length; i++) {
                let gameObjectData = data.gameObjects[i];
                for (let j = 0; j < gameObjectData.c.length; j++) {
                    let componentData = gameObjectData.c[j];
                    if (componentData.materials) {
                        for (let k = 0; k < componentData.materials.length; k++) {
                            await Loader._loadMaterial(componentData.materials[k]);
                        }
                    }
                    if (componentData.properties) {
                        for (let k = 0; k < componentData.properties.length; k++) {
                            let property = componentData.properties[k];
                            if (property.t === SerializablePropertyType.Material) {
                                await Loader._loadMaterial(property.v);
                            }
                        }
                    }
                }
            }
        }
    
        private static _setScene(data: IScene, scene: Scene): void {
            data.gameObjects.forEach(
                (gameObjectData) => {
                    let gameObject = new GameObject(scene);
                    Loader._setGameObjectAt(gameObjectData, gameObject);
                }
            )
        }
    
        private static _setGameObjectAt(data: IGameObject, target: GameObject): void {
            target.name = data.n;
            for (let i = 0; i < data.c.length; i++) {
                let componantData = data.c[i];
                let componentConstructor = Main.ComponentConstructors.get(componantData.n);
                if (componentConstructor) {
                    let component: Component = target.AddComponent(componentConstructor);
                    Loader._setComponentAt(componantData, component);
                }
            }
        }
    
        private static _setComponentAt(data: IComponent, target: Component): void {
            target.name = data.n;
            if (target instanceof Transform) {
                Loader._setTransformAt(data, target);
            }
            if (target instanceof MeshFilter) {
                Loader._setMeshFilterAt(data, target);
            }
            if (target instanceof MeshRenderer) {
                Loader._setMeshRendererAt(data, target);
            }
            if (target instanceof Camera) {
                Loader._setCameraAt(data, target);
            }
            if (target instanceof Light) {
                Loader._setLightAt(data, target);
            }
            if (target instanceof BoxCollider) {
                Loader._setBoxColliderAt(data, target);
            }
            if (target instanceof MonoBehaviour) {
                Loader._setMonoBehaviourAt(data, target);
            }
        }
    
        private static _setTransformAt(data: IComponent, target: Transform): void {
            target.localPosition.copyFromFloats(
                data.p.x,
                data.p.y,
                data.p.z
            );
            target.localRotation.copyFromFloats(
                data.r.x,
                data.r.y,
                data.r.z,
                data.r.w
            );
        }
    
        private static _setMeshFilterAt(data: IComponent, target: MeshFilter): void {
            target.mesh = Mesh.references.get(data.mesh);
        }
    
        private static _setMeshRendererAt(data: IComponent, target: MeshRenderer): void {
            for (let i = 0; i < data.materials.length; i++) {
                target.materials[i] = Material.references.get(data.materials[i]);
            }
        }
    
        private static _setCameraAt(data: IComponent, target: Camera): void {
    
        }
    
        private static _setLightAt(data: IComponent, target: Light): void {
            target.type = Sanitizer.LightType(data.type);
            target.color = Sanitizer.Color(data.color);
            target.intensity = Sanitizer.Ratio(data.intensity);
            target.range = Sanitizer.Number(data.range);
            target.spotAngle = Sanitizer.Angle(data.spotAngle);
        }
    
        private static _setBoxColliderAt(data: IComponent, target: BoxCollider): void {
            target.center = Sanitizer.Position(data.center);
            target.size = Sanitizer.Size(data.size);
        }
    
        private static _setMonoBehaviourAt(data: IComponent, target: MonoBehaviour): void {
            if (data.properties) {
                for (let i = 0; i < data.properties.length; i++) {
                    let property = data.properties[i];
                    if (
                        property.t === SerializablePropertyType.Number ||
                        property.t === SerializablePropertyType.String
                    ) {
                        target[property.k] = property.v;
                    }
                    if (
                        property.t === SerializablePropertyType.Mesh
                    ) {
                        target[property.k] = Mesh.references.get(property.v);
                    }
                    if (
                        property.t === SerializablePropertyType.Material
                    ) {
                        target[property.k] = Material.references.get(property.v);
                    }
                }
            }
        }
    
        private static async _loadMesh(ref: string): Promise<Mesh> {
            return new Promise<Mesh>(
                (resolve, reject) => {
                    let m = Mesh.references.get(ref);
                    if (m) {
                        resolve(m);
                    }
                    else {
                        $.ajax(
                            {
                                url: "./assets/linked/" + ref + ".mesh.json",
                                success: (data: IMesh) => {
                                    let m = new Mesh();
                                    Loader._setMeshAt(data, m);
                                    Mesh.references.set(ref, m);
                                    console.log("Mesh " + ref + " loaded");
                                    resolve(m);
                                },
                                error: () => {
                                    reject("Mesh " + ref + " not found");
                                }
                            }
                        );
                    }
                }
            );
        }
    
        private static _setMeshAt(data: IMesh, target: Mesh): void {
            target.positions = data.v;
            target.indices = data.i;
            if (data.n && data.n.length > 0) {
                target.normals = data.n;
            }
            if (data.u && data.u.length > 0) {
                target.uvs = data.u;
            }
        }
    
        private static async _loadMaterial(ref: string): Promise<Material> {
            return new Promise<Material>(
                (resolve, reject) => {
                    let m = Material.references.get(ref);
                    if (m) {
                        resolve(m);
                    }
                    else {
                        $.ajax(
                            {
                                url: "./assets/linked/" + ref + ".material.json",
                                success: (data: IMaterial) => {
                                    let m = new Material(Main.scene);
                                    Loader._setMaterialAt(data, m);
                                    Material.references.set(ref, m);
                                    resolve(m);
                                },
                                error: () => {
                                    reject("Material " + ref + " not found");
                                }
                            }
                        );
                    }
                }
            );
        }
    
        private static _setMaterialAt(data: IMaterial, target: Material): void {
            target.name = data.name;
            target.color = Sanitizer.Color(data.color);
        }
        
        private static _prefabCache: Map<string, IGameObject> = new Map<string, IGameObject>();
    
        private static _getPrefab(ref: string): Promise<IGameObject> {
            return new Promise<IGameObject>(
                (resolve, reject) => {
                    let p = Loader._prefabCache.get(ref);
                    if (p) {
                        resolve(p);
                    }
                    else {
                        $.ajax(
                            {
                                url: "./assets/linked/" + ref + ".prefab.json",
                                success: (data: IGameObject) => {
                                    resolve(data);
                                },
                                error: () => {
                                    reject();
                                }
                            }
                        );
                    }
                }
            );
        }
    }
}
module Hammurabi {

    export interface IVector3 {
        x: number;
        y: number;
        z: number;
    }
    
    export interface IQuaternion {
        x: number;
        y: number;
        z: number;
        w: number;
    }
    
    export interface IColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    
    export interface IScene {
        gameObjects: IGameObject[];
    }
    
    export interface IGameObject {
        n: string;
        c: IComponent[];
    }
    
    export interface IComponent {
        n: string;
        // Transform
        p?: IVector3;
        r?: IQuaternion;
        s?: IVector3;
        // MeshFilter
        mesh?: string;
        // MeshRenderer
        materials?: string[];
        // Light
        color?: IColor;
        intensity?: number;
        range?: number;
        type?: LightType;
        spotAngle?: number;
        // Colliders
        center?: IVector3;
        size?: IVector3;
        // Rigidbody
        weight?: number;
        // MonoBehaviour
        properties?: ISerializedProperty[];
    }
    
    export interface IMesh {
        name: string;
        v: number[];
        i: number[];
        n?: number[];
        u?: number[];
    }
    
    export interface IMaterial {
        name: string;
        color: IColor;
    }
    
    export enum SerializablePropertyType {
        Number = 0,
        String = 1,
        Mesh = 2,
        Material = 3
    }
    
    export interface ISerializedProperty {
        k: string;
        t: SerializablePropertyType;
        v: any;
    }
}
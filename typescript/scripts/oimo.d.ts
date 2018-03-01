declare module 'oimojs' { 
    export = OIMO; 
}

declare module OIMO {

    interface IWorldProperties {
        timestep: number;
        iterations: number; 
        broadphase: number;
        worldscale: number;
        random: boolean;
        info: boolean;
        gravity: number[];
    }

    interface IBodyProperties {
        type: string;
        size: number[];
        pos: number[];
        rot: number[];
        move: boolean;
        density: number;
        friction: number;
        restitution: number;
        belongsTo: number;
        collidesWith: number;
    }

    interface IJointProperties {
        type: string;
        body1: Body;
        body2: Body;
    }

    class Vec3 {
        x: number;
        y: number;
        z: number;
    }

    class Quat {
        x: number;
        y: number;
        z: number;
        w: number;
    }

    class World {
        constructor(properties: IWorldProperties);
        add(o: IBodyProperties): Body;
        step(): void;
    }

    class Body {
        getPosition(): Vec3;
        getQuaternion(): Quat;
    }
}
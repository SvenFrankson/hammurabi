module Hammurabi {

    export class Quaternion extends BABYLON.Quaternion {

        public static AngleAxis(angle: number, axis: Vector3): Quaternion {
            BABYLON.Quaternion.RotationAxisToRef(axis, angle / Math.PI * 180, BABYLON.Tmp.Quaternion[0]);
            return new Quaternion(
                BABYLON.Tmp.Quaternion[0].x,
                BABYLON.Tmp.Quaternion[0].y,
                BABYLON.Tmp.Quaternion[0].z,
                BABYLON.Tmp.Quaternion[0].w
            );
        }
    }
}
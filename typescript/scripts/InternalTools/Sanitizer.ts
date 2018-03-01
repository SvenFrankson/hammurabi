module Hammurabi {

    export class Sanitizer {

        public static Number(v: number): number {
            if (isFinite(v)) {
                return v;
            }
            return 0;
        }
    
        public static Ratio(v: number): number {
            if (isFinite(v)) {
                return v;
            }
            return 0.5;
        }
    
        public static Angle(v: number): number {
            if (isFinite(v)) {
                return v;
            }
            return 60;
        }
    
        public static Position(p: IVector3): Vector3 {
            if (p && isFinite(p.x + p.y + p.z)) {
                return new BABYLON.Vector3(p.x, p.y, p.z);
            }
            return new BABYLON.Vector3(0, 0, 0);
        }
    
        public static Size(s: IVector3): Vector3 {
            if (s && isFinite(s.x + s.y + s.z)) {
                return new BABYLON.Vector3(s.x, s.y, s.z);
            }
            return new BABYLON.Vector3(1, 1, 1);
        }
    
        public static Color(c: IColor): IColor {
            if (c && isFinite(c.r + c.g + c.b + c.a)) {
                return c;
            }
            return new BABYLON.Color4(0.8, 0.8, 0.8, 1);
        }
    
        public static LightType(t: LightType): LightType {
            if (t in LightType) {
                return t;
            }
            return LightType.Directional;
        }
    }
}
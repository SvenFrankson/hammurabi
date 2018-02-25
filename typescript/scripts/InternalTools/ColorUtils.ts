module Hammurabi {

    export class ColorUtils {

        public static Color3ToIColor(c: BABYLON.Color3): IColor {
            return new BABYLON.Color4(c.r, c.g, c.b, 1);
        }
    
        public static IColorToColor3(c: IColor): BABYLON.Color3 {
            return new BABYLON.Color3(c.r, c.g, c.b);
        }
    }
}
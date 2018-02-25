module Hammurabi {
    
    export enum LightType {
        Spot = 0,
        Directional = 1,
        Point = 2,
        Area = 3,
        Undefined = 4
    }
    
    export class Light extends Component {
    
        public get color(): IColor {
            return ColorUtils.Color3ToIColor(this._lightInstance.diffuse);
        }
        public set color(c: IColor) {
            this._lightInstance.diffuse = ColorUtils.IColorToColor3(c);
        }
    
        public get intensity(): number {
            return this._lightInstance.intensity;
        }
        public set intensity(v: number) {
            this._lightInstance.intensity = v;
        }
    
        public get range(): number {
            return this._lightInstance.range;
        }
        public set range(v: number) {
            this._lightInstance.range = v;
        }
    
        public get type(): LightType {
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

        public set type(t: LightType) {
            if (t !== this.type ) {
                let newLight: BABYLON.Light;
                if (t === LightType.Spot) {
                    newLight = this._useSpotLight();
                } else if (t === LightType.Directional || t === LightType.Area) {
                    newLight = this._useDirectionalLight();
                } else if (t === LightType.Point) {
                    newLight = this._usePointLight();
                } else {
                    newLight = this._usePointLight();
                }
                newLight.parent = this.gameObject;
                newLight.diffuse = ColorUtils.IColorToColor3(this.color);
                newLight.intensity = this.intensity;
                newLight.range = this.range;
                this._lightInstance.dispose();
                this._lightInstance = newLight;
            }
        }
    
        private _spotAngle: number = 90;
        public get spotAngle(): number {
            return this._spotAngle;
        }
        public set spotAngle(v: number) {
            this._spotAngle = v;
            if (this._lightInstance instanceof BABYLON.SpotLight) {
                this._lightInstance.angle = v / 180 * Math.PI;
            }
        }
    
        private _lightInstance: BABYLON.Light;
    
        constructor(gameObject: GameObject) {
            super(gameObject);
            this.name = "Light";
            this._lightInstance = this._useDirectionalLight();
            this._lightInstance.parent = gameObject;
            this.scene.onBeforeRenderObservable.add(this._syncLightTransform);
        }
    
        private _useSpotLight(): BABYLON.SpotLight {
            let spotLight: BABYLON.SpotLight = new BABYLON.SpotLight(
                "light_instance",
                BABYLON.Vector3.Zero(),
                BABYLON.Vector3.Up(),
                this.spotAngle / 180 * Math.PI,
                1,
                this.scene
            );
            return spotLight;
        }
    
        private _useDirectionalLight(): BABYLON.DirectionalLight {
            let directionalLight: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
                "light_instance",
                BABYLON.Vector3.Up(),
                this.scene
            );
            return directionalLight;
        }
    
        private _usePointLight(): BABYLON.PointLight {
            let pointLight: BABYLON.PointLight = new BABYLON.PointLight(
                "light_instance",
                BABYLON.Vector3.Zero(),
                this.scene
            );
            return pointLight;
        }
    
        private _syncLightTransform = () => {
            if (this._lightInstance instanceof BABYLON.DirectionalLight) {
                this.gameObject.getDirectionToRef(BABYLON.Axis.Y, this._lightInstance.direction);
            }
        }
    }
}
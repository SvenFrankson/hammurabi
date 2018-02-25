module Hammurabi {

    export class Runtime {

        public static NextFrame(action: () => void): void {
            let callback = () => {
                action();
                Main.scene.onAfterRenderObservable.removeCallback(callback);
            }
            Main.scene.onAfterRenderObservable.add(callback);
        }
    }
}
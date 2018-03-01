class TestMBH extends Hammurabi.MonoBehaviour {
    // Use this for initialization
    Start() {
    }
    // Update is called once per frame
    Update() {
        this.transform.localRotation = this.transform.localRotation.multiply(BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, this.speed));
    }
}
Main.ComponentConstructors.set("TestMBH", TestMBH);

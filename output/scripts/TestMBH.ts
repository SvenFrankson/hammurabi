class TestMBH extends Hammurabi.MonoBehaviour {

	public speed: number;

	// Use this for initialization
	public Start(): void {
		
	}
	
	// Update is called once per frame
	public Update(): void {
		this.transform.localRotation = this.transform.localRotation.multiply(BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y,this.speed));
	}
}

Main.ComponentConstructors.set("TestMBH", TestMBH);
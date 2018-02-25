class TestMBH extends Hammurabi.MonoBehaviour {

    public speed: number = 0.01;

    public Update(): void {
        this.transform.localPosition = this.transform.localPosition.add(
            new BABYLON.Vector3(this.speed, 0, 0)
        )
    }

    public OnMouseDown(): void {
        console.log("v");
    }

    public OnMouseUp(): void {
        console.log("^");
    }
}
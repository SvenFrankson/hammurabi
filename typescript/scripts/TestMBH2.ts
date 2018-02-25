class TestMBH2 extends Hammurabi.MonoBehaviour {

    public materialRed: Hammurabi.Material;
    public materialBlue: Hammurabi.Material;

    public Update(): void {
        
    }

    public OnMouseDown(): void {
        this.GetComponent(Hammurabi.MeshRenderer).material = this.materialRed;
    }

    public OnMouseUp(): void {
        this.GetComponent(Hammurabi.MeshRenderer).material = this.materialBlue;
    }
}
  class TestMBH extends MonoBehaviour {
    public int speed;
    private float test = 0.1f;
    public Start() : void {
    }
    public Update() : void {
      this.transform.localRotation *= Quaternion.AngleAxis(speed, Vector3.up);
    }
    public TestMethod(a : number) : void {
    }
    public TestMethod2(a : number, foo : number, bar : number) : void {
    }
  }

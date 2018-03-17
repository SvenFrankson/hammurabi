	class TestMBH extends Hammurabi.MonoBehaviour {
		public speed : number;
		private test : number = 0.1;
		public Start() : void {}
		public Update() : void {
			this.transform.localRotation *= Hammurabi.Quaternion.AngleAxis(this.speed, Hammurabi.Vector3.up);
		}
		public TestMethod(a : number) : void {}
		public TestMethod2(a : number, foo : number, bar : number) : void {}
	}

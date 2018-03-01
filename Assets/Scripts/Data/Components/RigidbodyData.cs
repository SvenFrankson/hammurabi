using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class RigidbodyData: ComponentData {

		public float mass;

		public static RigidbodyData RigidbodyDataFromSource(Rigidbody target) {
			Debug.Log("Serialize Rigidbody");
			RigidbodyData data = new RigidbodyData();
            data.n = "Rigidbody";
			data.mass = target.mass;
			return data;
		}

		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"Rigidbody\",";
			jsonData += "\"mass\":" + this.mass.ToString("0.000");
			jsonData += "}";
			return jsonData;
		}
    }
}

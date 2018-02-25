using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
	
    [System.Serializable]
	public class Vector3Data {
		public float x;
		public float y;
		public float z;

        public static Vector3Data Vector3DataFromSource(Vector3 target) {
			Vector3Data data = new Vector3Data();
            data.x = target.x;
            data.y = target.y;
            data.z = target.z;
			return data;
		}
		
		public string ToJson() {
			string jsonData = "{";
			jsonData += "\"x\":" + this.x.ToString("0.000") + ",";
			jsonData += "\"y\":" + this.y.ToString("0.000") + ",";
			jsonData += "\"z\":" + this.z.ToString("0.000");
			jsonData += "}";
			return jsonData;
		}
    }
}
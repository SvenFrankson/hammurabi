using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    
    [System.Serializable]
    public class QuaternionData {
		public float x;
		public float y;
		public float z;
		public float w;

        public static QuaternionData QuaternionDataFromSource(Quaternion target) {
			QuaternionData data = new QuaternionData();
            data.x = target.x;
            data.y = target.y;
            data.z = target.z;
            data.w = target.w;
			return data;
		}
		
		public string ToJson() {
			string jsonData = "{";
			jsonData += "\"x\":" + this.x.ToString("0.000") + ",";
			jsonData += "\"y\":" + this.y.ToString("0.000") + ",";
			jsonData += "\"z\":" + this.z.ToString("0.000") + ",";
			jsonData += "\"w\":" + this.w.ToString("0.000");
			jsonData += "}";
			return jsonData;
		}
    }
}
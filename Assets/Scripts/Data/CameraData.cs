using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class CameraData: ComponentData {

		public static CameraData CameraDataFromSource(Camera target) {
			Debug.Log("Serialize Camera");
			CameraData data = new CameraData();
            data.n = "Camera";
			return data;
		}
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"Camera\"";
			jsonData += "}";
			return jsonData;
		}
    }
}

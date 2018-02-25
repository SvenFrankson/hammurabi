using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class TransformData: ComponentData {
		
        public Vector3Data p;
        public QuaternionData r;

		public static TransformData TransformDataFromSource(Transform target) {
			Debug.Log("Serialize Transform");
			TransformData data = new TransformData();
            data.n = "Transform";
			data.p = Vector3Data.Vector3DataFromSource(target.localPosition);
			data.r = QuaternionData.QuaternionDataFromSource(target.localRotation);
			return data;
		}
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"Transform\",";
			jsonData += "\"p\":" + this.p.ToJson() + ",";
			jsonData += "\"r\":" + this.r.ToJson();
			jsonData += "}";
			return jsonData;
		}
    }
}

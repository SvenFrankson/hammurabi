using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class TransformData: ComponentData {
		
        public Vector3Data p;
        public QuaternionData r;
		public Vector3Data s;

		public static TransformData TransformDataFromSource(Transform target) {
			TransformData data = new TransformData();
            data.n = "Transform";
			data.p = Vector3Data.Vector3DataFromSource(target.localPosition);
			data.r = QuaternionData.QuaternionDataFromSource(target.localRotation);
			data.s = Vector3Data.Vector3DataFromSource(target.localScale);
			return data;
		}
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"Transform\",";
			jsonData += "\"p\":" + this.p.ToJson() + ",";
			jsonData += "\"r\":" + this.r.ToJson() + ",";
			jsonData += "\"s\":" + this.s.ToJson();
			jsonData += "}";
			return jsonData;
		}
    }
}

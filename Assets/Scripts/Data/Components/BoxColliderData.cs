using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class BoxColliderData: ComponentData {
		
        public Vector3Data center;
        public Vector3Data size;

		public static BoxColliderData BoxColliderDataFromSource(BoxCollider target) {
			Debug.Log("Serialize BoxCollider");
			BoxColliderData data = new BoxColliderData();
            data.n = "BoxCollider";
			data.center = Vector3Data.Vector3DataFromSource(target.center);
			data.size = Vector3Data.Vector3DataFromSource(target.size);
			return data;
		}
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"BoxCollider\",";
			jsonData += "\"center\":" + this.center.ToJson() + ",";
			jsonData += "\"size\":" + this.size.ToJson();
			jsonData += "}";
			return jsonData;
		}
    }
}

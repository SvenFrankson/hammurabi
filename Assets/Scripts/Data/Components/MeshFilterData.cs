using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class MeshFilterData: ComponentData {
		
        public string mesh;

		public static MeshFilterData MeshFilterDataFromSource(MeshFilter target) {
			Debug.Log("Serialize MeshFilter");
			MeshFilterData data = new MeshFilterData();
            data.n = "MeshFilter";
			data.mesh = target.sharedMesh.name;
			return data;
		}
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"MeshFilter\",";
			jsonData += "\"mesh\":\"" + this.mesh + "\"";
			jsonData += "}";
			return jsonData;
		}
    }
}

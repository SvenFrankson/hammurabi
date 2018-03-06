using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class MeshRendererData: ComponentData {
		
        public string[] materials;

		public static MeshRendererData MeshRendererDataFromSource(MeshRenderer target) {
			MeshRendererData data = new MeshRendererData();
            data.n = "MeshRenderer";
            List<string> materialsList = new List<string>();
            for (int i = 0; i < target.sharedMaterials.Length; i++) {
                materialsList.Add(target.sharedMaterials[i].name);
            }
			data.materials = materialsList.ToArray();
			return data;
		}
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"MeshRenderer\",";
			jsonData += "\"materials\":[";
            for (int i = 0; i < this.materials.Length; i++) {
                jsonData += "\"" + this.materials[i] + "\"";
                if (i < this.materials.Length - 1) {
                    jsonData += ",";
                }
            }
            jsonData += "]}";
			return jsonData;
		}
    }
}

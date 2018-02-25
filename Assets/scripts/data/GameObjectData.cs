using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi {

	[System.Serializable]
    public class GameObjectData {
        public string n;
        public ComponentData[] c;

		public static GameObjectData GameObjectDataFromSource(GameObject source) {
			Debug.Log("Serialize GameObject " + source.name);
			GameObjectData data = new GameObjectData();
			Component[] sourceComponents = source.GetComponents<Component>();
			data.n = source.name;
			data.c = new ComponentData[sourceComponents.Length];
			for (int i = 0; i < sourceComponents.Length; i++) {
				Component sourceComponent = sourceComponents[i];
				data.c[i] = ComponentData.ComponentDataFromSource(sourceComponent);
			}
			return data;
		}

		public string ToJson() {
			string jsonData = "{\"n\":\"" + this.n + "\",\"c\":[";
			bool first = true;
			for (int i = 0; i < this.c.Length; i++) {
				string componentJsonData = this.c[i].ToJson();
				if (componentJsonData != null) {
					if (!first) {
						jsonData += ",";
					}
					jsonData += componentJsonData;
					first = false;
				}
			}
			jsonData += "]}";
			return jsonData;
		}
    }
}

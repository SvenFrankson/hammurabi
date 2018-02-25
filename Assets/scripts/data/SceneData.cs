using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Hammurabi {  

	[System.Serializable]
    public class SceneData {
        public GameObjectData[] gameObjects;

		public static SceneData SceneDataFromSource(Scene source) {
			SceneData data = new SceneData();
            GameObject[] sourceGameObjects = source.GetRootGameObjects();
            data.gameObjects = new GameObjectData[sourceGameObjects.Length];
			for (int i = 0; i < sourceGameObjects.Length; i++) {
				GameObject sourceGameObject = sourceGameObjects[i];
				data.gameObjects[i] = GameObjectData.GameObjectDataFromSource(sourceGameObject);
			}
			return data;
		}

		public string ToJson() {
			string jsonData = "{\"gameObjects\":[";
			for (int i = 0; i < this.gameObjects.Length; i++) {
				jsonData += this.gameObjects[i].ToJson();
				if (i < this.gameObjects.Length - 1) {
					jsonData += ",";
				}
			}
			jsonData += "]}";
			return jsonData;
		}
    }
}
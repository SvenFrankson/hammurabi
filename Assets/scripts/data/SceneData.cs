using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Hammurabi {  
    public class SceneData {
        public List<GameObjectData> gameObjects;

		public static SceneData SceneDataFromSource(Scene source) {
			SceneData data = new SceneData();
            data.gameObjects = new List<GameObjectData>();
            GameObject[] sourceGameObjects = source.GetRootGameObjects();
			for (int i = 0; i < sourceGameObjects.Length; i++) {
				GameObject sourceGameObject = sourceGameObjects[i];
				data.gameObjects.Add(GameObjectData.GameObjectDataFromSource(sourceGameObject));
			}
			return data;
		}
    }
}
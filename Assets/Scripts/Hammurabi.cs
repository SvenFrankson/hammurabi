using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Hammurabi {  
    public class Hammurabi {
        public static SceneData ConvertCurrentScene() {
			Scene scene = SceneManager.GetActiveScene();
            SceneData data = SceneData.SceneDataFromSource(scene);
            return data;
		}
    }
}
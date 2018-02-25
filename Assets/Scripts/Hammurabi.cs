using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.IO;

namespace Hammurabi {  
    public class Hammurabi {
        public static void SaveCurrentScene() {
			Scene scene = SceneManager.GetActiveScene();
            SceneData data = SceneData.SceneDataFromSource(scene);
            string jsonData = data.ToJson();
            string path = Application.dataPath;
            path += "/../output/";
            Directory.CreateDirectory(path);
            path += "test.scene.json";
            if (File.Exists(path)) {
                File.Delete(path);
            }
            StreamWriter writer = new StreamWriter(path);
            writer.Write(jsonData);
            writer.Close();
		}

        public static void SaveLinkedMeshes() {
			MeshFilter[] meshFilters = MeshFilter.FindObjectsOfType<MeshFilter>();
            List<Mesh> meshes = new List<Mesh>();
            for (int i = 0; i < meshFilters.Length; i++) {
                Mesh mesh = meshFilters[i].sharedMesh;
                if (mesh != null) {
                    if (!meshes.Contains(mesh)) {
                        meshes.Add(mesh);
                    }
                }
            }
            for (int i = 0; i < meshes.Count; i++) {
                Mesh mesh = meshes[i];
                MeshData data = MeshData.MeshDataFromSource(mesh);
                string jsonData = data.ToJson();
                string path = Application.dataPath;
                path += "/../output/assets/linked/";
                Directory.CreateDirectory(path);
                path += mesh.name + ".mesh.json";
                if (File.Exists(path)) {
                    File.Delete(path);
                }
                StreamWriter writer = new StreamWriter(path);
                writer.Write(jsonData);
                writer.Close();
            }
        }
    }
}
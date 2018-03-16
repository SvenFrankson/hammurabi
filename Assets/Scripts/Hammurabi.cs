using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEditor;
using System.IO;

namespace Hammurabi {  
    public class Hammurabi {

        private List<MonoScript> _linkedScripts;

        public Hammurabi() {
            this._linkedScripts = new List<MonoScript>();
        }

        public void SaveCurrentScene() {
			Scene scene = SceneManager.GetActiveScene();
            SceneData data = SceneData.SceneDataFromSource(scene, this);
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

        public void SaveLinkedMeshes() {
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

        public void SaveLinkedMaterials() {
			Renderer[] renderers = Renderer.FindObjectsOfType<Renderer>();
            List<Material> materials = new List<Material>();
            for (int i = 0; i < renderers.Length; i++) {
                for (int j = 0; j < renderers[i].sharedMaterials.Length; j++) {
                Material material = renderers[i].sharedMaterials[j];
                if (material != null) {
                    if (!materials.Contains(material)) {
                        materials.Add(material);
                    }
                }
            }
            }
            for (int i = 0; i < materials.Count; i++) {
                Material material = materials[i];
                MaterialData data = MaterialData.MaterialDataFromSource(material);
                string jsonData = data.ToJson();
                string path = Application.dataPath;
                path += "/../output/assets/linked/";
                Directory.CreateDirectory(path);
                path += material.name + ".material.json";
                if (File.Exists(path)) {
                    File.Delete(path);
                }
                StreamWriter writer = new StreamWriter(path);
                writer.Write(jsonData);
                writer.Close();
            }
        }

        public void LinkScript(MonoScript script) {
            if (!this._linkedScripts.Contains(script)) {
                this._linkedScripts.Add(script);
            }
        }

        public void SaveLinkedScripts() {
            for (int i = 0; i < this._linkedScripts.Count; i++) {
                string path = Application.dataPath;
                path += "/../output/scripts/";
                Directory.CreateDirectory(path);
                path += this._linkedScripts[i].name + ".new.ts";
                if (File.Exists(path)) {
                    File.Delete(path);
                }

                CSParser parser = new CSParser();
                CSEntity entity = parser.Parse(this._linkedScripts[i].text);
                
                StreamWriter writer = new StreamWriter(path);
                // writer.Write(entity.recursivelyWriteAsDebug());
                writer.Write(entity.writeAsTypescript());
                writer.Close();
            }
        }
    }
}
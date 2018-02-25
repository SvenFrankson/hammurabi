using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class MeshData {

        public string name;
        public float[] v;
        public int[] i;
        public float[] n;
        public float[] u;

		public static MeshData MeshDataFromSource(Mesh target) {
			Debug.Log("Serialize Transform");
			MeshData data = new MeshData();
            data.name = target.name;
			data.v = new float[target.vertices.Length * 3];
			for (int i = 0; i < target.vertices.Length; i++) {
				data.v[3 * i] = target.vertices[i].x;
				data.v[3 * i + 1] = target.vertices[i].y;
				data.v[3 * i + 2] = target.vertices[i].z;
			}
			data.i = new int[target.triangles.Length];
			for (int i = 0; i < target.triangles.Length / 3; i++) {
				data.i[3 * i] = target.triangles[3 * i];
				data.i[3 * i + 1] = target.triangles[3 * i + 2];
				data.i[3 * i + 2] = target.triangles[3 * i + 1];
			}
			return data;
		}
		
		public string ToJson() {
			return JsonUtility.ToJson(this);
		}
    }
}

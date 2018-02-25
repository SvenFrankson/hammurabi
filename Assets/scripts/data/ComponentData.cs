using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
	public class ComponentData {
        public string n;
        // Transform
        public Vector3Data p;
        public QuaternionData r;
        // MeshFilter
        public string mesh;
        // MeshRenderer
        public string[] materials;
        // Light
        public Color color;
        public float intensity;
        public float range;
        public LightType lightType;
        public float spotAngle;
        // Colliders
        public Vector3Data center;
        public Vector3Data size;
        // MonoBehaviour
        public SerializedProperty[] properties;

		public static ComponentData ComponentDataFromSource(Component target) {
			ComponentData data = new ComponentData();
			if (target is Transform) {
				ComponentData.ComponentDataFromTransform(target as Transform, ref data);
			}
			return data;
		}

		private static void ComponentDataFromTransform(Transform target, ref ComponentData data) {
			data.p = Vector3Data.Vector3DataFromSource(target.localPosition);
			data.r = QuaternionData.QuaternionDataFromSource(target.localRotation);
		}
    }
}

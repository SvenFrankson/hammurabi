using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class ComponentData {
        public string n = "Component";
        public Vector3Data p;
        public QuaternionData r;

		public static ComponentData ComponentDataFromSource(Component target) {
			if (target is Transform) {
                return TransformData.TransformDataFromSource(target as Transform);
			}
			return new ComponentData();
		}
		virtual public string ToJson() {
			string jsonData = "{\"n\":\"Component\"}";
			return jsonData;
		}
    }
}

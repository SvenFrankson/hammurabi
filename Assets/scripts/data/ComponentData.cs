﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class ComponentData {
        public string n = "Component";

		public static ComponentData ComponentDataFromSource(Component target) {
			if (target is Transform) {
                return TransformData.TransformDataFromSource(target as Transform);
			}
			if (target is Camera) {
                return CameraData.CameraDataFromSource(target as Camera);
			}
			if (target is Light) {
                return LightData.LightDataFromSource(target as Light);
			}
			if (target is MeshFilter) {
                return MeshFilterData.MeshFilterDataFromSource(target as MeshFilter);
			}
			if (target is MonoBehaviour) {
                return MonoBehaviourData.MonoBehaviourDataFromSource(target as MonoBehaviour);
			}
			return new ComponentData();
		}
		
		virtual public string ToJson() {
			return null;
		}
    }
}

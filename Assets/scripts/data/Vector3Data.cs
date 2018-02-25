using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
	public class Vector3Data {
		public float x;
		public float y;
		public float z;

        public static Vector3Data Vector3DataFromSource(Vector3 target) {
			Vector3Data data = new Vector3Data();
            data.x = target.x;
            data.y = target.y;
            data.z = target.z;
			return data;
		}
    }
}
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    public class QuaternionData {
		public float x;
		public float y;
		public float z;
		public float w;

        public static QuaternionData QuaternionDataFromSource(Quaternion target) {
			QuaternionData data = new QuaternionData();
            data.x = target.x;
            data.y = target.y;
            data.z = target.z;
            data.w = target.w;
			return data;
		}
    }
}
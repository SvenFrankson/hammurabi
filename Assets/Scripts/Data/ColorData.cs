using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
	
    [System.Serializable]
	public class ColorData {
		public float r;
		public float g;
		public float b;
		public float a;

        public static ColorData ColorDataFromSource(Color target) {
			ColorData data = new ColorData();
            data.r = target.r;
            data.g = target.g;
            data.b = target.b;
            data.a = target.a;
			return data;
		}
		
		public string ToJson() {
			string jsonData = "{";
			jsonData += "\"r\":" + this.r.ToString("0.000") + ",";
			jsonData += "\"g\":" + this.g.ToString("0.000") + ",";
			jsonData += "\"b\":" + this.b.ToString("0.000") + ",";
			jsonData += "\"a\":" + this.a.ToString("0.000");
			jsonData += "}";
			return jsonData;
		}
    }
}
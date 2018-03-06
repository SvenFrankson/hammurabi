using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class LightData: ComponentData {

        public ColorData color;
        public float intensity;
        public float range;
        public LightType type;
        public float spotAngle;

		public static LightData LightDataFromSource(Light target) {
			LightData data = new LightData();
            data.n = "Light";
			data.color = ColorData.ColorDataFromSource(target.color);
			data.intensity = target.intensity;
			data.range = target.range;
			data.type = target.type;
			data.spotAngle = target.spotAngle;
			return data;
		}
		
		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"Light\",";
			jsonData += "\"color\":" + this.color.ToJson() + ",";
			jsonData += "\"intensity\":" + this.intensity.ToString("0.00") + ",";
			jsonData += "\"range\":" + this.range.ToString("0.00") + ",";
			jsonData += "\"type\":" + (int)this.type + ",";
			jsonData += "\"spotAngle\":" + this.spotAngle.ToString("0.00");
			jsonData += "}";
			return jsonData;
		}
    }
}

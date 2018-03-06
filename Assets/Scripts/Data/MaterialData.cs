using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi
{
    [System.Serializable]
	public class MaterialData {

        public string name;
        public ColorData color;

		public static MaterialData MaterialDataFromSource(Material target) {
			MaterialData data = new MaterialData();
            data.name = target.name;
			data.color = ColorData.ColorDataFromSource(target.color);
			return data;
		}
		
		public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"" + this.name + "\",";
			jsonData += "\"color\":" + this.color.ToJson();
			jsonData += "}";
			return jsonData;
		}
    }
}

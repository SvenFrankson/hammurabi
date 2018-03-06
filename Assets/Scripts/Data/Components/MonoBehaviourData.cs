using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

namespace Hammurabi
{
    public enum SerializablePropertyType {
        Number = 0,
        String = 1,
        Mesh = 2,
        Material = 3
    }

    public class SerializedProperty {
        public string k;
        public SerializablePropertyType t;
        public object v;

        public string ToJson() {
			string jsonData = "{";
			jsonData += "\"k\":\"" + this.k + "\",";
			jsonData += "\"t\":" + (int)this.t + ",";
			jsonData += "\"v\":" + this.v;
			jsonData += "}";
			return jsonData;
		}
    }

    [System.Serializable]
	public class MonoBehaviourData: ComponentData {

        public SerializedProperty[] properties;

		public static MonoBehaviourData MonoBehaviourDataFromSource(MonoBehaviour target, Hammurabi serializer) {
			MonoBehaviourData data = new MonoBehaviourData();
            data.n = "MonoBehaviour";
            SerializedObject serializableTarget = new SerializedObject(target);
            UnityEditor.SerializedProperty unityProperty = serializableTarget.GetIterator();
            List<SerializedProperty> propertiesList = new List<SerializedProperty>();
            while (unityProperty.NextVisible(true)) {
                if (unityProperty.type == "int") {
                    SerializedProperty property = new SerializedProperty();
                    property.k = unityProperty.name;
                    property.t = SerializablePropertyType.Number;
                    property.v = unityProperty.intValue;
                    propertiesList.Add(property);
                }
                else if (unityProperty.type == "PPtr<MonoScript>") {
                    MonoScript script = unityProperty.objectReferenceValue as MonoScript;
                    serializer.LinkScript(script);
                    data.n = script.name;
                }
            }
            data.properties = propertiesList.ToArray();
			return data;
		}

		override public string ToJson() {
			string jsonData = "{";
			jsonData += "\"n\":\"" + this.n + "\",";
            jsonData += "\"properties\":[";
            for (int i = 0; i < this.properties.Length; i++) {
                jsonData += this.properties[i].ToJson();
                if (i < this.properties.Length - 1) {
                    jsonData += ",";
                }
            }
			jsonData += "]}";
			return jsonData;
		}
    }
}

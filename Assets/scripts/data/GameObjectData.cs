using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Hammurabi {

    public class GameObjectData {
        public string n;
        public List<ComponentData> c;

		public static GameObjectData GameObjectDataFromSource(GameObject source) {
			GameObjectData data = new GameObjectData();
			data.n = source.name;
			data.c = new List<ComponentData>();
			Component[] sourceComponents = source.GetComponents<Component>();
			for (int i = 0; i < sourceComponents.Length; i++) {
				Component sourceComponent = sourceComponents[i];
				data.c.Add(ComponentData.ComponentDataFromSource(sourceComponent));
			}
			return data;
		}
    }
}

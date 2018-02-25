using System.Collections;
using System.Collections.Generic;

namespace Hammurabi
{
    public enum SerializablePropertyType {
        Number = 0,
        String = 1,
        Mesh = 2,
        Material = 3
    }

	public enum LightType {
        Spot = 0,
        Directional = 1,
        Point = 2,
        Area = 3,
        Undefined = 4
    }

	public class Vector3 {
		public float x;
		public float y;
		public float z;
    }
    
    public class Quaternion {
		public float x;
		public float y;
		public float z;
		public float w;
    }
    
    public class Color {
        public float r;
        public float g;
        public float b;
        public float a;
    }
    
    public class Scene {
        public GameObjectData[] gameObjects;
    }
    
    public class GameObjectData {
        public string n;
        public Component c;
    }
    
    public class Component {
        public string n;
        // Transform
        public Vector3 p;
        public Quaternion r;
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
        public Vector3 center;
        public Vector3 size;
        // MonoBehaviour
        public SerializedProperty[] properties;
    }
    
    public class Mesh {
        public string name;
        public float[] v;
        public int[] i;
        public float[] n;
        public float[] u;
    }
    
    public class Material {
        public string name;
        public Color color;
    }
    
    public class SerializedProperty {
        public string k;
        public SerializablePropertyType t;
        public object v;
    }
}	

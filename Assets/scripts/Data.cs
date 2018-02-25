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
    
    public class Color {
        public float r;
        public float g;
        public float b;
        public float a;
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

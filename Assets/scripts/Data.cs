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

    public class Material {
        public string name;
        public ColorData color;
    }
    
    public class SerializedProperty {
        public string k;
        public SerializablePropertyType t;
        public object v;
    }
}	

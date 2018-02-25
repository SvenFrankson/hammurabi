using UnityEngine;
using UnityEditor;
using System.IO;

namespace Hammurabi {
    public class HammurabiMenu : EditorWindow
    {
        // Add menu named "My Window" to the Window menu
        [MenuItem("Window/Hammurabi")]
        static void Init()
        {
            // Get existing open window or if none, make a new one:
            HammurabiMenu window = (HammurabiMenu)EditorWindow.GetWindow(typeof(HammurabiMenu));
            window.Show();
        }

        void OnGUI()
        {
            if (GUILayout.Button("Convert")) {
               Debug.Log(Hammurabi.ConvertCurrentScene().ToJson());
            }
        }
    }
}

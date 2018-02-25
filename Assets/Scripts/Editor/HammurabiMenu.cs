using UnityEngine;
using UnityEditor;
using System.IO;

namespace Hammurabi {
    public class HammurabiMenu : EditorWindow
    {
        [MenuItem("Window/Hammurabi")]
        static void Init()
        {
            HammurabiMenu window = (HammurabiMenu)EditorWindow.GetWindow(typeof(HammurabiMenu));
            window.Show();
        }

        void OnGUI()
        {
            if (GUILayout.Button("Convert")) {
                Hammurabi.SaveCurrentScene();
                Hammurabi.SaveLinkedMeshes();
            }
        }
    }
}

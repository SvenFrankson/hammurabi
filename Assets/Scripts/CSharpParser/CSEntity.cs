using UnityEngine;
using System.Collections.Generic;

class CSEntity {

    public string rawContent;
    public CSEntity parent;
    public List<CSEntity> children = new List<CSEntity>();

    public CSEntity() {
        Debug.Log("Create new CSEntity");
    }

    public void AppendChild(CSEntity entity) {
        this.children.Add(entity);
        entity.parent = this;
    }

    public string writeAsDebug() {
        Debug.Log("...");
        CSEntity parent = this.parent;
        string output = "";
        while (parent != null) {
            output += "--- ";
            parent = parent.parent;
        }
        output += this.rawContent + " #\n";
        return output;
    }

    public string recursivelyWriteAsDebug() {
        string output = this.writeAsDebug();
        this.children.ForEach(
            (child) => {
                output += child.recursivelyWriteAsDebug();
            }
        );
        return output;
    }
}
using UnityEngine;
using System.Collections.Generic;

public class CSEntity {

    public string rawContent;
    public CSEntity parent;
    public List<CSEntity> children = new List<CSEntity>();

    public CSEntity(string rawContent, CSEntity parent) {
        Debug.Log("Create new CSEntity");
        this.rawContent = rawContent;
        if (parent != null) {
            parent.AppendChild(this);
        }
    }

    public void AppendChild(CSEntity entity) {
        this.children.Add(entity);
        entity.parent = this;
    }

    virtual public string getPrefix() {
        return "[Entity]";
    }

    virtual public string writeAsDebug() {
        Debug.Log("...");
        CSEntity parent = this.parent;
        string output = this.getPrefix() + " ";
        while (parent != null && !(parent is CSRoot)) {
            output += "--- ";
            parent = parent.parent;
        }
        output += this.rawContent + " #\n";
        return output;
    }

    virtual public string recursivelyWriteAsDebug() {
        string output = this.writeAsDebug();
        this.children.ForEach(
            (child) => {
                output += child.recursivelyWriteAsDebug();
            }
        );
        return output;
    }
}
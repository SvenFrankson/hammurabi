using UnityEngine;
using System.Collections.Generic;
using System.Text.RegularExpressions;

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

    public string Indent() {
        if (this.parent == null) {
            return "";
        }
        return this.parent.Indent() + "\t";
    }

    public void AppendChild(CSEntity entity) {
        this.children.Add(entity);
        entity.parent = this;
    }

    virtual public string getPrefix() {
        return "[Entity]";
    }

    virtual public string writeAsDebug() {
        CSEntity parent = this.parent;
        string output = this.getPrefix() + " ";
        while (parent != null && !(parent is CSRoot)) {
            output += "--- ";
            parent = parent.parent;
        }
        output += this.rawContent + "\n";
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

    virtual public string writeAsTypescript() {
        string output = this.Indent();
        output += this.rawContent;
        output = output.Replace("Quaternion.", "Hammurabi.Quaternion.");
        output = output.Replace("Quaternion ", "Hammurabi.Quaternion");
        output = output.Replace("Vector3.", "Hammurabi.Vector3.");
        output = output.Replace("Vector3 ", "Hammurabi.Vector3");
        if (this.children.Count == 0) {
            output += "\n";
        }
        else {
            output += " {\n";
            this.children.ForEach(
                (c) => {
                    output += c.writeAsTypescript();
                }
            );
            output += this.Indent() + "}\n";
        }
        return output;
    }
}
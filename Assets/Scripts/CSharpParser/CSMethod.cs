using UnityEngine;
using System;
using System.Collections.Generic;

public class CSMethod: CSEntity {

    public string name;
    public string visibility;
    public string returnType;
    private List<CSParameter> parameters = new List<CSParameter>();

    public CSMethod(string rawContent, CSEntity parent): base(rawContent, parent) {
        string[] splitContent = rawContent.Split(' ');
        int hasVisibilityKey = 0;
        for (int i = 0; i < splitContent.Length; i++) {
            if (CSParsingTool.IsVisibilityKeyword(splitContent[i])) {
                hasVisibilityKey = 1;
                this.visibility = splitContent[i];
            }
        }
        if (hasVisibilityKey == 0) {
            this.visibility = "public";
        }
        this.returnType = splitContent[hasVisibilityKey];
        this.name = splitContent[hasVisibilityKey + 1].Replace("(", "");
        int startParametersIndex = rawContent.IndexOf('(');
        int endParametersIndex = rawContent.LastIndexOf(')');
        int lengthParameters = endParametersIndex - startParametersIndex + 1;
        string rawParameters = rawContent.Substring(startParametersIndex, lengthParameters);
        rawParameters = rawParameters.Replace("(", "");
        rawParameters = rawParameters.Replace(")", "");
        string[] splitParameters = rawParameters.Split(',');
        for (int i = 0; i < splitParameters.Length; i++) {
            splitParameters[i] = splitParameters[i].Trim();
            string[] splitParameter = splitParameters[i].Split(' ');
            if (splitParameter.Length >= 2) {
                this.parameters.Add(
                    new CSParameter(
                        splitParameter[0],
                        splitParameter[splitParameter.Length - 1]
                    )
                );
            }
        }
    }

    override public string getPrefix() {
        return "[Method]";
    }

    override public string writeAsDebug() {
        CSEntity parent = this.parent;
        string output = "# [Method " + this.name + "] [Visibility " + this.visibility + "] [Return " + this.returnType + "] [Params:] ";
        this.parameters.ForEach(
            (p) => {
                output += "[Type " + p.type + " Name " + p.name + "] ";
            }
        );
        output += "#\n";
        output += this.getPrefix() + " ";
        while (parent != null && !(parent is CSRoot)) {
            output += "--- ";
            parent = parent.parent;
        }
        output += this.rawContent + "\n";
        return output;
    }

    override public string writeAsTypescript() {
        string output = this.Indent();
        output += this.visibility + " " + this.name + "(";
        for (int i = 0; i < this.parameters.Count; i++) {
            output += this.parameters[i].name + " : " + CSParsingTool.TypescriptTypeFromCSharpType(this.parameters[i].type);
            if (i < this.parameters.Count - 1) {
                output += ", ";
            }
        }
        output += ") : " + this.returnType;
        output += " {\n";
        this.children.ForEach(
            (c) => {
                output += c.writeAsTypescript();
            }
        );
        output += this.Indent() + "}\n";
        return output;
    }
}
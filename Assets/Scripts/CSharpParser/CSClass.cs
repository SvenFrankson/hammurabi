public class CSClass: CSEntity {

    public string name;
    public string visibility;
    public string baseName;

    public CSClass(string rawContent, CSEntity parent): base(rawContent, parent) {
        string[] splitContent = rawContent.Split(' ');
        for (int i = 0; i < splitContent.Length; i++) {
            if (splitContent[i] == "class") {
                if (i + 1 < splitContent.Length) {
                    this.name = splitContent[i + 1];
                }
            }
            else if (CSParsingTool.IsVisibilityKeyword(splitContent[i])) {
                this.visibility = splitContent[i];
            }
            else if (splitContent[i] == ":") {
                if (i + 1 < splitContent.Length) {
                    this.baseName = splitContent[i + 1];
                }
            }
        }
    }

    override public string getPrefix() {
        return "[Class ]";
    }

    override public string writeAsDebug() {
        CSEntity parent = this.parent;
        string output = "# [Class " + this.name + "] [Visibility " + this.visibility + "] [Base " + this.baseName + "] #\n";
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
        output += "class " + this.name;
        if (this.baseName != null) {
            output += " extends " + CSParsingTool.TypescriptTypeFromCSharpType(this.baseName);
        }
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
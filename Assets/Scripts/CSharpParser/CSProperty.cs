public class CSProperty: CSEntity {

    public string name;
    public string visibility;
    public string type;
    public string initializer;

    public CSProperty(string rawContent, CSEntity parent): base(rawContent, parent) {
        string[] splitContent = rawContent.Split(' ', '=');
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
        this.type = splitContent[hasVisibilityKey];
        this.name = splitContent[hasVisibilityKey + 1].Replace("(", "");
        int equalIndex = rawContent.IndexOf('=');
        if (equalIndex != -1) {
            string rawInitializer = rawContent.Substring(equalIndex + 1);
            rawInitializer = rawInitializer.Replace(";", "");
            this.initializer = rawInitializer.Trim();
        }
    }

    override public string getPrefix() {
        return "[Prop  ]";
    }

    override public string writeAsDebug() {
        CSEntity parent = this.parent;
        string output = "# [Property '" + this.name + "'] [Visibility " + this.visibility + "] [Type " + this.type + "] [Initialize '" + this.initializer + "'] #\n";
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
        output += this.visibility + " " + this.name + " : " + CSParsingTool.TypescriptTypeFromCSharpType(this.type);
        if (this.initializer != null) {
            output += " = " + this.initializer;
        }
        output += ";\n";
        return output;
    }
}
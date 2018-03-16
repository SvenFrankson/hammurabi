class CSRoot: CSEntity {
    
    public CSRoot(): base("root", null) {
        
    }

    override public string recursivelyWriteAsDebug() {
        string output = "";
        this.children.ForEach(
            (child) => {
                output += child.recursivelyWriteAsDebug();
            }
        );
        return output;
    }

    override public string writeAsTypescript() {
        string output = "";
        this.children.ForEach(
            (c) => {
                output += c.writeAsTypescript();
            }
        );
        return output;
    }
}
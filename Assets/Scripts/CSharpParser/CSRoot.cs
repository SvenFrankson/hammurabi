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
}
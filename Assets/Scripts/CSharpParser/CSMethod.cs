public class CSMethod: CSEntity {

    public CSMethod(string rawContent, CSEntity parent): base(rawContent, parent) {
        
    }

    override public string getPrefix() {
        return "[Method]";
    }
}
public class CSClass: CSEntity {

    public CSClass(string rawContent, CSEntity parent): base(rawContent, parent) {
        
    }

    override public string getPrefix() {
        return "[Class ]";
    }
}
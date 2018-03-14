public class CSProperty: CSEntity {

    public CSProperty(string rawContent, CSEntity parent): base(rawContent, parent) {
        
    }

    override public string getPrefix() {
        return "[Prop  ]";
    }
}
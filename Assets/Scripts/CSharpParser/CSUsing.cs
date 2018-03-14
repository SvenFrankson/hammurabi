public class CSUsing: CSEntity {

    public CSUsing(string rawContent, CSEntity parent): base(rawContent, parent) {
        
    }

    override public string getPrefix() {
        return "[Using ]";
    }
}
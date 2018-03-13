class CSParser {

    private int index;
    private string buffer;
    private CSEntity current;

    public CSEntity Parse(string script) {
        CSEntity output = new CSEntity();
        this.current = output;
        this.Read(script);
        return output;
    }

    public void Read(string script) {
        if (this.index >= script.Length) {
            return;
        }
        char c = script[this.index++];
        if (c == ';') {
            CSEntity entity = new CSEntity();
            entity.rawContent = this.buffer;
            this.current.AppendChild(entity);
            this.buffer = "";
        } else if (c == '{') {
            CSEntity entity = new CSEntity();
            entity.rawContent = this.buffer;
            this.current.AppendChild(entity);
            this.current = entity;
            this.buffer = "";
        } else if (c == '}') {
            this.current = this.current.parent;
            this.buffer = "";
        } else {
            this.buffer += c;
            Read(script);
        }
    }
}
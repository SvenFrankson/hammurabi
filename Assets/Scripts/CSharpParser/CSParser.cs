using UnityEngine;

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

    public void ReadSlashComment(string script) {
        if (this.index >= script.Length) {
            return;
        }
        char c = script[this.index++];
        if ("\n\r".IndexOf(c) == -1) {
            this.ReadSlashComment(script);
            return;
        }
        Debug.LogWarning("Exit comment");
        this.Read(script);
        return;
    }

    public void Read(string script) {
        if (this.index >= script.Length) {
            return;
        }
        char c = script[this.index++];
        if (c == '/') {
            if (this.index < script.Length) {
                char next = script[this.index];
                if (next == '/') {
                    this.ReadSlashComment(script);
                    return;
                }
            }
        }
        if (c == ';') {
            Debug.Log(";");
            CSEntity entity = new CSEntity();
            entity.rawContent = this.buffer;
            this.current.AppendChild(entity);
            this.buffer = "";
            this.Read(script);
            return;
        } else if (c == '{') {
            Debug.Log("{");
            CSEntity entity = new CSEntity();
            entity.rawContent = this.buffer;
            this.current.AppendChild(entity);
            this.current = entity;
            this.buffer = "";
            this.Read(script);
            return;
        } else if (c == '}') {
            Debug.Log("}");
            this.current = this.current.parent;
            this.buffer = "";
            this.Read(script);
            return;
        } else {
            if ("\n\r\t".IndexOf(c) == -1) {
                this.buffer += c;
            }
            this.Read(script);
            return;
        }
    }
}
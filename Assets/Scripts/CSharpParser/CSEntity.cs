using System.Collections.Generic;

class CSEntity {

    public string rawContent;
    public CSEntity parent;
    public List<CSEntity> children = new List<CSEntity>();

    public void AppendChild(CSEntity entity) {
        this.children.Add(entity);
        entity.parent = this;
    }
}
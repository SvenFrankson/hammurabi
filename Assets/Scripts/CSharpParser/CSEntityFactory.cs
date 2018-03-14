class CSEntityFactory {

    private static char[] propertyChars = new char[]{'(', ')'};

    public static CSEntity CreateEntity(string rawContent, CSEntity parent) {
        if (rawContent.Contains("class ")) {
            return new CSClass(rawContent, parent);
        } else if (rawContent.Contains("using ")) {
            return new CSUsing(rawContent, parent);
        } else if (parent is CSClass) {
            if (rawContent.IndexOfAny(CSEntityFactory.propertyChars) == -1) {
                return new CSProperty(rawContent, parent);
            } else {
                return new CSMethod(rawContent, parent);
            }
        } else {
            return new CSEntity(rawContent, parent);
        }
    }
}
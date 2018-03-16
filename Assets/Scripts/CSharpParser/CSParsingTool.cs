class CSParsingTool {

    public static bool IsVisibilityKeyword(string word) {
        if (word == "public") {
            return true;
        }
        if (word == "protected") {
            return true;
        }
        if (word == "private") {
            return true;
        }
        return false;
    }

    public static string TypescriptTypeFromCSharpType(string csharpType) {
        if (
            csharpType == "int" ||
            csharpType == "float"
        ) {
            return "number";
        }
        return csharpType;
    }
}
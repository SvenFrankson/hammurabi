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
}
using System.Collections.Generic;
using System.Text.RegularExpressions;
using UnityEngine;

class CSParsingTool {

    private static Regex IsFloat = new Regex("^[0-9]*(\\.[0-9]*)?[0-9]f$");

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
        if (
            csharpType == "MonoBehaviour"
        ) {
            return "Hammurabi." + csharpType;
        }
        return csharpType;
    }

    // So far only a quick test, need some parsing structure.
    public static string CleanOperation(string rawOperation) {
        Debug.Log(rawOperation);
        List<string> splitOperation = CSParsingTool.ParseOperation(rawOperation);
        CSParsingTool.CleanOperationFloats(splitOperation);
        string output = "";
        splitOperation.ForEach(
            (e) => {
                output += e + " ";
            }
        );
        return output.Trim();
    }

    public static List<string> ParseOperation(string rawOperation) {
        List<string> splitOperation = new List<string>();
        string buffer = "";
        CSParsingTool.ReadOperation(splitOperation, rawOperation, buffer, 0);
        Debug.Log(splitOperation.Count);
        return splitOperation;
    }

    private static void ReadOperation(List<string> splitOperation, string rawOperation, string buffer, int index) {
        if (index >= rawOperation.Length) {
            return;
        }
        char read = rawOperation[index++];
        if (read == ' ' || read == '+' || read == ';') {
             if (!CSParsingTool.IsNullOrEmptyOrBlank(buffer)) {
                 splitOperation.Add(buffer.Trim());
                 buffer = "";
             }
        }
        buffer += read;
        CSParsingTool.ReadOperation(splitOperation, rawOperation, buffer, index);
    }

    private static void CleanOperationFloats(List<string> splitOperation) {
        for (int i = 0; i < splitOperation.Count; i++) {
            string e = splitOperation[i];
            if (CSParsingTool.IsFloat.Match(e).Success) {
                splitOperation[i] = e.Replace("f", "");
            }
        }
    }

    public static bool IsNullOrEmptyOrBlank(string s) {
        if (s == null) {
            return true;
        }
        for (int i = 0; i < s.Length; i++) {
            if (s[i] != ' ' && s[i] != '\t') {
                return false;
            }
        }
        return true;
    }
}
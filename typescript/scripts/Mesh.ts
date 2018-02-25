module Hammurabi {

    export class Mesh extends BABYLON.VertexData {

        public static references: Map<string, Mesh> = new Map<string, Mesh>();
    }
}
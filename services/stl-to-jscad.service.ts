import type { StlParseResult } from "@/interfaces/stl.interface";
import { toCompactTriangles } from "@/services/stl-parser.service";

const buildHeader = (fileName: string, triangleCount: number): string => {
  return [
    "// Auto-generated from STL upload (experimental)",
    `// Source file: ${fileName}`,
    `// Triangles: ${triangleCount.toLocaleString()}`,
    "// The mesh is represented as raw polygon data. Edit freely.",
    "",
  ].join("\n");
};

export const convertStlToJscadCode = (parseResult: StlParseResult): string => {
  const compactTriangles = toCompactTriangles(parseResult.triangles);
  const triangleData = JSON.stringify(compactTriangles.map((t) => t.coordinates));

  return `${buildHeader(parseResult.fileName, parseResult.triangleCount)}const { geometries } = require('@jscad/modeling');
const { geom3 } = geometries;

const TRIANGLE_DATA = ${triangleData};

const main = () => {
  const polygons = TRIANGLE_DATA.map((triangle) => ({
    vertices: [
      [triangle[0], triangle[1], triangle[2]],
      [triangle[3], triangle[4], triangle[5]],
      [triangle[6], triangle[7], triangle[8]],
    ],
  }));

  return geom3.create(polygons);
};

module.exports = { main };
`;
};

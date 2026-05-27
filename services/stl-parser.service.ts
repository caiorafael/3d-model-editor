import { STLLoader } from "three/addons/loaders/STLLoader.js";
import type {
  StlCompactTriangle,
  StlParseResult,
  StlTriangle,
  StlVertex,
} from "@/interfaces/stl.interface";

const MAX_TRIANGLE_COUNT = 15_000;
const COORDINATE_PRECISION = 4;

const roundCoordinate = (value: number): number =>
  Number(value.toFixed(COORDINATE_PRECISION));

const toVertex = (
  positions: Float32Array,
  index: number,
): StlVertex => [
  roundCoordinate(positions[index]),
  roundCoordinate(positions[index + 1]),
  roundCoordinate(positions[index + 2]),
];

const toCompactTriangle = (triangle: StlTriangle): StlCompactTriangle => ({
  coordinates: [
    triangle.vertices[0][0],
    triangle.vertices[0][1],
    triangle.vertices[0][2],
    triangle.vertices[1][0],
    triangle.vertices[1][1],
    triangle.vertices[1][2],
    triangle.vertices[2][0],
    triangle.vertices[2][1],
    triangle.vertices[2][2],
  ],
});

const parseTriangles = (positions: Float32Array): StlTriangle[] => {
  const triangles: StlTriangle[] = [];

  for (let index = 0; index < positions.length; index += 9) {
    triangles.push({
      vertices: [
        toVertex(positions, index),
        toVertex(positions, index + 3),
        toVertex(positions, index + 6),
      ],
    });
  }

  return triangles;
};

export const parseStlFile = (
  fileName: string,
  buffer: ArrayBuffer,
): StlParseResult => {
  if (!fileName.toLowerCase().endsWith(".stl")) {
    throw new Error("Only .stl files are supported.");
  }

  const loader = new STLLoader();
  const geometry = loader.parse(buffer);
  const positions = geometry.getAttribute("position");

  if (!positions || positions.count === 0) {
    throw new Error("The STL file does not contain any geometry.");
  }

  const triangleCount = positions.count / 3;

  if (!Number.isInteger(triangleCount)) {
    throw new Error("The STL file has invalid triangle data.");
  }

  if (triangleCount > MAX_TRIANGLE_COUNT) {
    throw new Error(
      `This STL has ${triangleCount.toLocaleString()} triangles. The experimental converter supports up to ${MAX_TRIANGLE_COUNT.toLocaleString()} triangles.`,
    );
  }

  const triangles = parseTriangles(positions.array as Float32Array);
  geometry.dispose();

  return {
    fileName,
    triangles,
    triangleCount,
  };
};

export const toCompactTriangles = (
  triangles: StlTriangle[],
): StlCompactTriangle[] => triangles.map(toCompactTriangle);

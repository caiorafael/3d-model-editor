import { geometries, measurements } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type {
  ColoredMeshData,
  MeshData,
  ModelStats,
} from "@/interfaces/editor.interface";
import type { StyledPart } from "@/interfaces/model-style.interface";
import { DEFAULT_MODEL_COLOR_HEX } from "@/utils/color";
import { extractVertex, isValidMeshData } from "@/utils/mesh-validation";

type Vec3 = [number, number, number];

const computeNormal = (a: Vec3, b: Vec3, c: Vec3): Vec3 => {
  const ux = b[0] - a[0];
  const uy = b[1] - a[1];
  const uz = b[2] - a[2];
  const vx = c[0] - a[0];
  const vy = c[1] - a[1];
  const vz = c[2] - a[2];

  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;
  const length = Math.hypot(nx, ny, nz);

  if (!Number.isFinite(length) || length === 0) {
    return [0, 0, 1];
  }

  return [nx / length, ny / length, nz / length];
};

const geom3ToMeshData = (geometry: Geom3): MeshData | null => {
  const polygons = geometries.geom3.toPolygons(geometry);
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  for (const polygon of polygons) {
    const rawVertices = polygon.vertices
      .map((vertex) => extractVertex(vertex))
      .filter((vertex): vertex is Vec3 => vertex !== null);

    if (rawVertices.length < 3) {
      continue;
    }

    const normal = computeNormal(
      rawVertices[0],
      rawVertices[1],
      rawVertices[2],
    );
    const baseIndex = positions.length / 3;

    for (const coords of rawVertices) {
      positions.push(coords[0], coords[1], coords[2]);
      normals.push(normal[0], normal[1], normal[2]);
    }

    for (let index = 1; index < rawVertices.length - 1; index += 1) {
      indices.push(baseIndex, baseIndex + index, baseIndex + index + 1);
    }
  }

  const meshData = { positions, normals, indices };

  return isValidMeshData(meshData) ? meshData : null;
};

export const convertStyledPartsToMeshes = (
  parts: StyledPart[],
): ColoredMeshData[] => {
  return parts
    .map((part) => {
      const meshData = geom3ToMeshData(part.geometry);

      if (!meshData) {
        return null;
      }

      return {
        ...meshData,
        color: part.colorHex || DEFAULT_MODEL_COLOR_HEX,
      };
    })
    .filter((mesh): mesh is ColoredMeshData => mesh !== null);
};

export const convertGeometriesToMesh = (
  geometryList: Geom3[],
): ColoredMeshData[] => {
  return geometryList
    .map((geometry) => {
      const meshData = geom3ToMeshData(geometry);

      if (!meshData) {
        return null;
      }

      return {
        ...meshData,
        color: DEFAULT_MODEL_COLOR_HEX,
      };
    })
    .filter((mesh): mesh is ColoredMeshData => mesh !== null);
};

export const getModelStats = (geometryList: Geom3[]): ModelStats => {
  const boundingBox = measurements.measureAggregateBoundingBox(...geometryList);
  const [minPoint, maxPoint] = boundingBox;

  return {
    width: maxPoint[0] - minPoint[0],
    depth: maxPoint[1] - minPoint[1],
    height: maxPoint[2] - minPoint[2],
    geometryCount: geometryList.length,
  };
};

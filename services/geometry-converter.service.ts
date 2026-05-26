import { geometries, measurements } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type { MeshData, ModelStats } from "@/interfaces/editor.interface";

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
  const length = Math.hypot(nx, ny, nz) || 1;

  return [nx / length, ny / length, nz / length];
};

const geom3ToMeshData = (geometry: Geom3): MeshData => {
  const polygons = geometries.geom3.toPolygons(geometry);
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  for (const polygon of polygons) {
    const vertices = polygon.vertices;

    if (vertices.length < 3) {
      continue;
    }

    const normal = computeNormal(vertices[0], vertices[1], vertices[2]);
    const baseIndex = positions.length / 3;

    for (const vertex of vertices) {
      positions.push(vertex[0], vertex[1], vertex[2]);
      normals.push(normal[0], normal[1], normal[2]);
    }

    for (let index = 1; index < vertices.length - 1; index += 1) {
      indices.push(baseIndex, baseIndex + index, baseIndex + index + 1);
    }
  }

  return { positions, normals, indices };
};

export const convertGeometriesToMesh = (geometryList: Geom3[]): MeshData => {
  const merged: MeshData = {
    positions: [],
    normals: [],
    indices: [],
  };

  for (const geometry of geometryList) {
    const mesh = geom3ToMeshData(geometry);
    const vertexOffset = merged.positions.length / 3;

    merged.positions.push(...mesh.positions);
    merged.normals.push(...mesh.normals);

    for (const index of mesh.indices) {
      merged.indices.push(index + vertexOffset);
    }
  }

  return merged;
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

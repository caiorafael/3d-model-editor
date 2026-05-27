import type { MeshData } from "@/interfaces/editor.interface";

type Vec3 = [number, number, number];

export const extractVertex = (vertex: unknown): Vec3 | null => {
  if (Array.isArray(vertex) && vertex.length >= 3) {
    const [x, y, z] = vertex;

    if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
      return [x, y, z];
    }

    return null;
  }

  if (
    vertex !== null &&
    typeof vertex === "object" &&
    "pos" in vertex &&
    Array.isArray((vertex as { pos: unknown }).pos)
  ) {
    return extractVertex((vertex as { pos: unknown }).pos);
  }

  return null;
};

export const isValidMeshData = (meshData: MeshData): boolean => {
  const { positions, indices } = meshData;
  const vertexCount = positions.length / 3;

  if (vertexCount < 3 || positions.length % 3 !== 0) {
    return false;
  }

  if (indices.length < 3) {
    return false;
  }

  for (const value of positions) {
    if (!Number.isFinite(value)) {
      return false;
    }
  }

  for (const index of indices) {
    if (!Number.isInteger(index) || index < 0 || index >= vertexCount) {
      return false;
    }
  }

  return true;
};

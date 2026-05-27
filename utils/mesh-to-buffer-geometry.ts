import {
  BufferGeometry,
  Float32BufferAttribute,
} from "three";
import type { MeshData } from "@/interfaces/editor.interface";
import { isValidMeshData } from "@/utils/mesh-validation";

export const meshDataToBufferGeometry = (
  meshData: MeshData,
): BufferGeometry | null => {
  if (!isValidMeshData(meshData)) {
    return null;
  }

  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(meshData.positions, 3),
  );
  bufferGeometry.setAttribute(
    "normal",
    new Float32BufferAttribute(meshData.normals, 3),
  );
  bufferGeometry.setIndex(meshData.indices);
  bufferGeometry.computeBoundingSphere();

  return bufferGeometry;
};

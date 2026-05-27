"use client";

import { useMemo } from "react";
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
} from "three";
import type { MeshData } from "@/interfaces/editor.interface";
import { isValidMeshData } from "@/utils/mesh-validation";

interface ModelMeshProps {
  meshData: MeshData;
  color: string;
  wireframe: boolean;
}

export const ModelMesh = ({ meshData, color, wireframe }: ModelMeshProps) => {
  const geometry = useMemo(() => {
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

    if (bufferGeometry.getAttribute("position").count > 0) {
      bufferGeometry.computeBoundingSphere();
    }

    return bufferGeometry;
  }, [meshData]);

  if (!geometry) {
    return null;
  }

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.45}
        wireframe={wireframe}
        side={DoubleSide}
      />
    </mesh>
  );
};

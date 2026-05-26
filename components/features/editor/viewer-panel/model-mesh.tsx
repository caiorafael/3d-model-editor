"use client";

import { useMemo } from "react";
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
} from "three";
import type { MeshData } from "@/interfaces/editor.interface";

interface ModelMeshProps {
  meshData: MeshData;
  wireframe: boolean;
}

export const ModelMesh = ({ meshData, wireframe }: ModelMeshProps) => {
  const geometry = useMemo(() => {
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
  }, [meshData]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#22d3ee"
        metalness={0.1}
        roughness={0.45}
        wireframe={wireframe}
        side={DoubleSide}
      />
    </mesh>
  );
};

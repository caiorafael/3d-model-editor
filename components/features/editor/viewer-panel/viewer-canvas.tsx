"use client";

import { OrbitControls, Grid } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Box3, Vector3 } from "three";
import type { ColoredMeshData } from "@/interfaces/editor.interface";
import { isValidMeshData } from "@/utils/mesh-validation";
import { ModelMesh } from "./model-mesh";

interface ViewerSceneProps {
  meshParts: ColoredMeshData[];
  showGrid: boolean;
  wireframe: boolean;
}

const getBoundingBox = (meshParts: ColoredMeshData[]) => {
  const box = new Box3();

  for (const mesh of meshParts) {
    if (!isValidMeshData(mesh)) {
      continue;
    }

    for (let index = 0; index < mesh.positions.length; index += 3) {
      const x = mesh.positions[index];
      const y = mesh.positions[index + 1];
      const z = mesh.positions[index + 2];

      if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
        continue;
      }

      box.expandByPoint(new Vector3(x, y, z));
    }
  }

  return box;
};

const SceneContent = ({ meshParts, showGrid, wireframe }: ViewerSceneProps) => {
  const cameraTarget = useMemo(() => {
    if (meshParts.length === 0) {
      return {
        position: [60, 60, 60] as [number, number, number],
        target: [0, 0, 0] as [number, number, number],
      };
    }

    const box = getBoundingBox(meshParts);

    if (box.isEmpty()) {
      return {
        position: [60, 60, 60] as [number, number, number],
        target: [0, 0, 0] as [number, number, number],
      };
    }

    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 1);
    const distance = maxDim * 2.2;

    return {
      position: [
        center.x + distance,
        center.y + distance,
        center.z + distance,
      ] as [number, number, number],
      target: [center.x, center.y, center.z] as [number, number, number],
    };
  }, [meshParts]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[20, 30, 20]} intensity={1.1} castShadow />
      <directionalLight position={[-15, 10, -10]} intensity={0.35} />

      {showGrid && (
        <Grid
          infiniteGrid
          cellSize={5}
          sectionSize={25}
          fadeDistance={200}
          cellColor="#6b7280"
          sectionColor="#9ca3af"
        />
      )}

      {meshParts.map((meshPart, index) =>
        isValidMeshData(meshPart) ? (
          <ModelMesh
            key={`${meshPart.color}-${index}`}
            meshData={meshPart}
            color={meshPart.color}
            wireframe={wireframe}
          />
        ) : null,
      )}

      <OrbitControls makeDefault target={cameraTarget.target} />
    </>
  );
};

export const ViewerCanvas = ({
  meshParts,
  showGrid,
  wireframe,
}: ViewerSceneProps) => {
  return (
    <Canvas
      shadows
      camera={{ position: [60, 60, 60], fov: 45, near: 0.1, far: 2000 }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <SceneContent
          meshParts={meshParts}
          showGrid={showGrid}
          wireframe={wireframe}
        />
      </Suspense>
    </Canvas>
  );
};

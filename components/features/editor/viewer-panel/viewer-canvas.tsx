"use client";

import { OrbitControls, Grid } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Box3, Vector3 } from "three";
import type { MeshData } from "@/interfaces/editor.interface";
import { ModelMesh } from "./model-mesh";

interface ViewerSceneProps {
  meshData: MeshData | null;
  showGrid: boolean;
  wireframe: boolean;
}

const SceneContent = ({ meshData, showGrid, wireframe }: ViewerSceneProps) => {
  const cameraTarget = useMemo(() => {
    if (!meshData || meshData.positions.length === 0) {
      return { position: [60, 60, 60] as [number, number, number], target: [0, 0, 0] as [number, number, number] };
    }

    const box = new Box3();

    for (let index = 0; index < meshData.positions.length; index += 3) {
      box.expandByPoint(
        new Vector3(
          meshData.positions[index],
          meshData.positions[index + 1],
          meshData.positions[index + 2],
        ),
      );
    }

    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 1);
    const distance = maxDim * 2.2;

    return {
      position: [center.x + distance, center.y + distance, center.z + distance] as [number, number, number],
      target: [center.x, center.y, center.z] as [number, number, number],
    };
  }, [meshData]);

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

      {meshData && meshData.indices.length > 0 && (
        <ModelMesh meshData={meshData} wireframe={wireframe} />
      )}

      <OrbitControls makeDefault target={cameraTarget.target} />
    </>
  );
};

export const ViewerCanvas = ({
  meshData,
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
          meshData={meshData}
          showGrid={showGrid}
          wireframe={wireframe}
        />
      </Suspense>
    </Canvas>
  );
};

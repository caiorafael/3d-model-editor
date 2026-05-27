import { Group, Mesh } from "three";
import { STLExporter } from "three/addons/exporters/STLExporter.js";
import type { ColoredMeshData, ModelStats } from "@/interfaces/editor.interface";
import type {
  StlExportOptions,
  StlExportPreview,
} from "@/interfaces/stl-export.interface";
import { meshDataToBufferGeometry } from "@/utils/mesh-to-buffer-geometry";

const DEFAULT_FILE_NAME = "model";

const sanitizeFileName = (fileName: string): string => {
  const trimmed = fileName.trim() || DEFAULT_FILE_NAME;
  return trimmed.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-");
};

export const countMeshTriangles = (meshParts: ColoredMeshData[]): number =>
  meshParts.reduce((total, part) => total + part.indices.length / 3, 0);

const meshPartsToGroup = (meshParts: ColoredMeshData[]): Group => {
  const group = new Group();

  for (const part of meshParts) {
    const geometry = meshDataToBufferGeometry(part);

    if (!geometry) {
      continue;
    }

    group.add(new Mesh(geometry));
  }

  if (group.children.length === 0) {
    throw new Error("No valid geometry available for export.");
  }

  return group;
};

export const buildExportPreview = (
  meshParts: ColoredMeshData[],
  modelStats: ModelStats | null,
  fileName: string,
): StlExportPreview => ({
  fileName: sanitizeFileName(fileName),
  triangleCount: countMeshTriangles(meshParts),
  partCount: meshParts.length,
  dimensions: modelStats
    ? {
        width: modelStats.width,
        height: modelStats.height,
        depth: modelStats.depth,
      }
    : null,
});

export const exportMeshPartsToStl = (
  meshParts: ColoredMeshData[],
  options: StlExportOptions,
): Blob => {
  const group = meshPartsToGroup(meshParts);
  const exporter = new STLExporter();
  const isBinary = options.format === "binary";

  try {
    const output = exporter.parse(group, { binary: isBinary });

    if (isBinary) {
      if (!(output instanceof DataView)) {
        throw new Error("Failed to generate binary STL data.");
      }

      return new Blob([output.buffer], {
        type: "application/octet-stream",
      });
    }

    if (typeof output !== "string") {
      throw new Error("Failed to generate ASCII STL data.");
    }

    return new Blob([output], { type: "text/plain" });
  } finally {
    group.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();
      }
    });
  }
};

export const resolveExportFileName = (
  fileName: string,
  format: StlExportOptions["format"],
): string => {
  const safeName = sanitizeFileName(fileName);
  return `${safeName}.stl`;
};

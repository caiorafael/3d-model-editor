"use client";

import { IconButton } from "@/components/ui/icon-button";
import { useEditorStore } from "@/store/editor.store";
import { GridIcon, ResetViewIcon, WireframeIcon } from "../editor-icons";
import { ViewerCanvas } from "./viewer-canvas";

const panelClasses = "flex h-full min-w-0 flex-1 flex-col bg-neutral-100 dark:bg-neutral-950";

const headerClasses =
  "flex h-10 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900";

const titleClasses = "text-xs font-medium text-neutral-600 dark:text-neutral-400";

const controlsClasses = "flex items-center gap-1";

const viewportClasses = "relative flex-1 overflow-hidden";

const emptyStateClasses =
  "pointer-events-none absolute inset-0 flex items-center justify-center";

const emptyTextClasses = "text-sm text-neutral-400 dark:text-neutral-500";

const footerClasses =
  "flex h-9 shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900";

const statClasses = "font-mono text-xs text-neutral-400 dark:text-neutral-500";

const formatStat = (value: number) => value.toFixed(1);

export const ViewerPanel = () => {
  const meshData = useEditorStore((state) => state.meshData);
  const modelStats = useEditorStore((state) => state.modelStats);
  const status = useEditorStore((state) => state.status);
  const showGrid = useEditorStore((state) => state.showGrid);
  const wireframe = useEditorStore((state) => state.wireframe);
  const toggleGrid = useEditorStore((state) => state.toggleGrid);
  const toggleWireframe = useEditorStore((state) => state.toggleWireframe);

  const dimensionsLabel = modelStats
    ? `${formatStat(modelStats.width)} × ${formatStat(modelStats.depth)} × ${formatStat(modelStats.height)} mm`
    : "—";

  const geometryLabel = modelStats
    ? `${modelStats.geometryCount} ${modelStats.geometryCount === 1 ? "geometry" : "geometries"}`
    : "—";

  return (
    <section className={panelClasses} aria-label="3D viewer">
      <div className={headerClasses}>
        <span className={titleClasses}>Preview</span>
        <div className={controlsClasses}>
          <IconButton label="Reset view">
            <ResetViewIcon />
          </IconButton>
          <IconButton label="Toggle grid" active={showGrid} onClick={toggleGrid}>
            <GridIcon />
          </IconButton>
          <IconButton
            label="Toggle wireframe"
            active={wireframe}
            onClick={toggleWireframe}
          >
            <WireframeIcon />
          </IconButton>
        </div>
      </div>

      <div className={viewportClasses}>
        <ViewerCanvas
          meshData={meshData}
          showGrid={showGrid}
          wireframe={wireframe}
        />

        {status === "running" && (
          <div className={emptyStateClasses}>
            <span className={emptyTextClasses}>Updating preview…</span>
          </div>
        )}

        {!meshData && status !== "running" && (
          <div className={emptyStateClasses}>
            <span className={emptyTextClasses}>Write code to generate a model</span>
          </div>
        )}
      </div>

      <div className={footerClasses}>
        <span className={statClasses}>{dimensionsLabel}</span>
        <span className={statClasses}>{geometryLabel}</span>
      </div>
    </section>
  );
};

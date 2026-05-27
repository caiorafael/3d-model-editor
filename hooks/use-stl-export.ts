"use client";

import { useCallback, useMemo, useState } from "react";
import type { StlExportFormat } from "@/interfaces/stl-export.interface";
import {
  buildExportPreview,
  exportMeshPartsToStl,
  resolveExportFileName,
} from "@/services/stl-exporter.service";
import { useEditorStore } from "@/store/editor.store";
import { downloadBlob } from "@/utils/download-file";

const DEFAULT_FILE_NAME = "model";

export const useStlExport = () => {
  const meshParts = useEditorStore((state) => state.meshParts);
  const modelStats = useEditorStore((state) => state.modelStats);
  const status = useEditorStore((state) => state.status);

  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState(DEFAULT_FILE_NAME);
  const [format, setFormat] = useState<StlExportFormat>("binary");
  const [exportError, setExportError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const canExport = Boolean(meshParts?.length) && status === "ready";

  const preview = useMemo(() => {
    if (!meshParts?.length) {
      return null;
    }

    return buildExportPreview(meshParts, modelStats, fileName);
  }, [fileName, meshParts, modelStats]);

  const openDialog = useCallback(() => {
    setExportError(null);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    if (isExporting) {
      return;
    }

    setIsOpen(false);
    setExportError(null);
  }, [isExporting]);

  const handleExport = useCallback(async () => {
    if (!meshParts?.length) {
      setExportError("Run your code first to generate a model.");
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      const blob = exportMeshPartsToStl(meshParts, { fileName, format });
      const resolvedName = resolveExportFileName(fileName, format);
      downloadBlob(blob, resolvedName);
      setIsOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to export STL file.";
      setExportError(message);
    } finally {
      setIsExporting(false);
    }
  }, [fileName, format, meshParts]);

  return {
    isOpen,
    fileName,
    format,
    exportError,
    isExporting,
    canExport,
    preview,
    openDialog,
    closeDialog,
    setFileName,
    setFormat,
    handleExport,
  };
};

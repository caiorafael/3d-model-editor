"use client";

import { useCallback, useEffect, useMemo } from "react";
import { executeJscadCode } from "@/services/jscad-engine.service";
import {
  convertGeometriesToMesh,
  getModelStats,
} from "@/services/geometry-converter.service";
import { useEditorStore } from "@/store/editor.store";
import { debounce } from "@/utils/debounce";

const AUTO_RUN_DELAY_MS = 400;

export const useJscadRunner = () => {
  const code = useEditorStore((state) => state.code);
  const runTrigger = useEditorStore((state) => state.runTrigger);
  const setStatus = useEditorStore((state) => state.setStatus);
  const setExecutionResult = useEditorStore((state) => state.setExecutionResult);
  const setExecutionError = useEditorStore((state) => state.setExecutionError);

  const runCode = useCallback(() => {
    setStatus("running");

    try {
      const geometries = executeJscadCode(code);
      const meshData = convertGeometriesToMesh(geometries);
      const modelStats = getModelStats(geometries);
      setExecutionResult(meshData, modelStats);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to execute code.";
      setExecutionError(message);
    }
  }, [code, setExecutionError, setExecutionResult, setStatus]);

  const debouncedRun = useMemo(
    () => debounce(runCode, AUTO_RUN_DELAY_MS),
    [runCode],
  );

  useEffect(() => {
    debouncedRun();
    return () => debouncedRun.cancel();
  }, [code, debouncedRun]);

  useEffect(() => {
    if (runTrigger > 0) {
      debouncedRun.cancel();
      runCode();
    }
  }, [runTrigger, debouncedRun, runCode]);
};

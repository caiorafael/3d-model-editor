"use client";

import { ChangeEvent, useCallback, useRef } from "react";
import { parseStlFile } from "@/services/stl-parser.service";
import { convertStlToJscadCode } from "@/services/stl-to-jscad.service";
import { useEditorStore } from "@/store/editor.store";

export const useStlUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setCode = useEditorStore((state) => state.setCode);
  const setStatus = useEditorStore((state) => state.setStatus);
  const setExecutionError = useEditorStore((state) => state.setExecutionError);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      setStatus("running");

      try {
        const buffer = await file.arrayBuffer();
        const parseResult = parseStlFile(file.name, buffer);
        const generatedCode = convertStlToJscadCode(parseResult);
        setCode(generatedCode);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to import STL file.";
        setExecutionError(message);
      } finally {
        event.target.value = "";
      }
    },
    [setCode, setExecutionError, setStatus],
  );

  return {
    fileInputRef,
    openFilePicker,
    handleFileChange,
  };
};

import { create } from "zustand";
import { EXAMPLE_JSCAD_CODE } from "@/utils/example-jscad-code";
import type { EditorState } from "@/interfaces/editor.interface";

export const useEditorStore = create<EditorState>((set) => ({
  code: EXAMPLE_JSCAD_CODE,
  meshData: null,
  modelStats: null,
  status: "idle",
  error: null,
  showGrid: true,
  wireframe: false,
  cursorPosition: { line: 1, column: 1 },
  runTrigger: 0,

  setCode: (code) => set({ code }),
  setCursorPosition: (cursorPosition) => set({ cursorPosition }),
  setExecutionResult: (meshData, modelStats) =>
    set({ meshData, modelStats, status: "ready", error: null }),
  setExecutionError: (error) =>
    set({ status: "error", error, meshData: null, modelStats: null }),
  setStatus: (status) => set({ status }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),
  requestRun: () => set((state) => ({ runTrigger: state.runTrigger + 1 })),
}));

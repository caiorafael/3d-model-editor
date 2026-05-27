export type EditorStatus = "idle" | "running" | "ready" | "error";

export interface MeshData {
  positions: number[];
  normals: number[];
  indices: number[];
}

export interface ColoredMeshData extends MeshData {
  color: string;
}

export interface ModelStats {
  width: number;
  height: number;
  depth: number;
  geometryCount: number;
}

export interface CursorPosition {
  line: number;
  column: number;
}

export interface EditorState {
  code: string;
  meshParts: ColoredMeshData[] | null;
  modelStats: ModelStats | null;
  status: EditorStatus;
  error: string | null;
  showGrid: boolean;
  wireframe: boolean;
  cursorPosition: CursorPosition;
  runTrigger: number;
  setCode: (code: string) => void;
  setCursorPosition: (position: CursorPosition) => void;
  setExecutionResult: (
    meshParts: ColoredMeshData[],
    stats: ModelStats,
  ) => void;
  setExecutionError: (error: string) => void;
  setStatus: (status: EditorStatus) => void;
  toggleGrid: () => void;
  toggleWireframe: () => void;
  requestRun: () => void;
}

export type CutFace = "top" | "bottom" | "center";

export type CutAlignX = "left" | "center" | "right";

export type CutAlignY = "front" | "center" | "back";

export type CutReference = "center" | "top-surface" | "bottom-surface";

export interface ResolvedCutPlacement {
  face: CutFace;
  alignX: CutAlignX;
  alignY: CutAlignY;
  offset: [number, number, number];
  absolutePosition?: [number, number, number];
  rotation?: [number, number, number];
}

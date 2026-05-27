export type ColorInput =
  | string
  | [number, number, number]
  | [number, number, number, number]
  | { r: number; g: number; b: number; a?: number };

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ModelTransform {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export interface TextFormat {
  font?: string;
  size?: number;
  depth?: number;
  stroke?: number;
}

export interface ResolvedModelStyle {
  color: RgbaColor;
  colorHex: string;
  transform: ModelTransform;
  textFormat: TextFormat;
}

import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";

export interface StyledPart {
  geometry: Geom3;
  colorHex: string;
}

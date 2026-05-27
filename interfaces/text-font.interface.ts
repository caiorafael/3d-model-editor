export interface HersheyFont {
  height: number;
  [charCode: number]: number[] | number | undefined;
}

export type TextFontName = "simplex" | "cnc" | "helvetica";

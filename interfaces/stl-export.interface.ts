export type StlExportFormat = "binary" | "ascii";

export interface StlExportOptions {
  fileName: string;
  format: StlExportFormat;
}

export interface StlExportPreview {
  fileName: string;
  triangleCount: number;
  partCount: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  } | null;
}

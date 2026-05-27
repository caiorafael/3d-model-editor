export type StlVertex = [number, number, number];

export interface StlTriangle {
  vertices: [StlVertex, StlVertex, StlVertex];
}

export interface StlParseResult {
  fileName: string;
  triangles: StlTriangle[];
  triangleCount: number;
}

export interface StlCompactTriangle {
  coordinates: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
}

import { booleans, expansions, geometries, extrusions, text } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type { TextFormat } from "@/interfaces/model-style.interface";
import { resolveTextFont } from "@/lib/jscad-fonts/text-fonts.registry";

const DEFAULT_TEXT_SIZE = 8;
const DEFAULT_TEXT_DEPTH = 1.5;
const DEFAULT_TEXT_STROKE = 0.4;

const pathsToSolid3d = (
  paths: ReturnType<typeof geometries.path2.fromPoints>[],
  delta: number,
  depth: number,
): Geom3 => {
  const solids = paths.map((path) => {
    const shape = expansions.expand({ delta, corners: "round" }, path);

    if (!geometries.geom2.isA(shape)) {
      throw new Error("Text paths could not be expanded into a valid shape.");
    }

    return extrusions.extrudeLinear({ height: depth }, shape);
  });

  return solids.length === 1 ? solids[0] : booleans.union(...solids);
};

export const createTextSolid = (
  content: string,
  format: TextFormat = {},
): Geom3 => {
  const font = resolveTextFont(format.font);
  const size = format.size ?? DEFAULT_TEXT_SIZE;
  const depth = format.depth ?? DEFAULT_TEXT_DEPTH;

  const segments = text.vectorText(
    {
      height: size,
      align: "center",
      font,
    } as Parameters<typeof text.vectorText>[0],
    content,
  );

  const paths = segments.map((segment) =>
    geometries.path2.fromPoints({}, segment),
  );

  const stroke = format.stroke ?? DEFAULT_TEXT_STROKE;

  return pathsToSolid3d(paths, stroke, depth);
};

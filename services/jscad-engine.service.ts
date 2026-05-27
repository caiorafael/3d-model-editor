import * as modeling from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type { StyledPart } from "@/interfaces/model-style.interface";
import { TextFonts } from "@/lib/jscad-fonts/text-fonts.registry";
import {
  CutPlacement,
  ModelBuilder,
  ModelBuildResult,
  ModelStyle,
  TextStyle,
} from "@/services/model-builder.service";
import { DEFAULT_MODEL_COLOR_HEX } from "@/utils/color";

interface JscadModule {
  main?: () => unknown;
}

const createJscadRequire = () => {
  return (moduleName: string) => {
    if (moduleName !== "@jscad/modeling") {
      throw new Error(`Module not found: ${moduleName}`);
    }

    return {
      ...modeling.primitives,
      ...modeling.booleans,
      ...modeling.transforms,
      ...modeling.extrusions,
      ...modeling.hulls,
      ...modeling.expansions,
      ...modeling.text,
      ModelBuilder,
      ModelStyle,
      TextStyle,
      CutPlacement,
      TextFonts,
      primitives: modeling.primitives,
      booleans: modeling.booleans,
      transforms: modeling.transforms,
      extrusions: modeling.extrusions,
      hulls: modeling.hulls,
      expansions: modeling.expansions,
      measurements: modeling.measurements,
      colors: modeling.colors,
      geometries: modeling.geometries,
      text: modeling.text,
    };
  };
};

const wrapGeometry = (geometry: Geom3): StyledPart => ({
  geometry,
  colorHex: DEFAULT_MODEL_COLOR_HEX,
});

const resolveStyledParts = (result: unknown): StyledPart[] => {
  if (ModelBuildResult.isA(result)) {
    return result.getParts();
  }

  if (ModelBuilder.isA(result)) {
    return result.build().getParts();
  }

  if (modeling.geometries.geom3.isA(result)) {
    return [wrapGeometry(result)];
  }

  if (Array.isArray(result)) {
    const geometries = result.filter((item) =>
      modeling.geometries.geom3.isA(item),
    );

    if (geometries.length > 0) {
      return geometries.map((geometry) => wrapGeometry(geometry));
    }
  }

  throw new Error(
    "main() must return a ModelBuildResult, ModelBuilder, geometry, or an array of geometries.",
  );
};

export const executeJscadCode = (code: string): StyledPart[] => {
  const requireFn = createJscadRequire();
  const moduleRef: JscadModule = {};

  const runner = new Function(
    "require",
    "module",
    "exports",
    `"use strict";\n${code}\n;return module.exports;`,
  ) as (
    requireFn: (moduleName: string) => unknown,
    module: { exports: JscadModule },
    exports: JscadModule,
  ) => JscadModule;

  const exports = runner(requireFn, { exports: moduleRef }, moduleRef);
  const mainFn = exports.main ?? moduleRef.main;

  if (typeof mainFn !== "function") {
    throw new Error("Your code must export a main() function.");
  }

  return resolveStyledParts(mainFn());
};

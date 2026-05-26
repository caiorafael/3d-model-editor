import * as modeling from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";

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
      primitives: modeling.primitives,
      booleans: modeling.booleans,
      transforms: modeling.transforms,
      extrusions: modeling.extrusions,
      hulls: modeling.hulls,
      measurements: modeling.measurements,
      colors: modeling.colors,
    };
  };
};

const collectGeometries = (result: unknown): Geom3[] => {
  if (modeling.geometries.geom3.isA(result)) {
    return [result];
  }

  if (Array.isArray(result)) {
    const geometries = result.filter((item) =>
      modeling.geometries.geom3.isA(item),
    );

    if (geometries.length > 0) {
      return geometries;
    }
  }

  throw new Error("main() must return a geometry or an array of geometries.");
};

export const executeJscadCode = (code: string): Geom3[] => {
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

  return collectGeometries(mainFn());
};

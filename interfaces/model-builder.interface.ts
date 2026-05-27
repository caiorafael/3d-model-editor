import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";

export interface IModelBuilder {
  add: (geometry: Geom3, style?: object) => IModelBuilder;
  addText: (content: string, style?: object) => IModelBuilder;
  subtract: (geometry: Geom3, placement?: object) => IModelBuilder;
  subtractText: (
    content: string,
    style?: object,
    placement?: object,
  ) => IModelBuilder;
  build: () => { getParts: () => unknown[]; toGeometry: () => Geom3 };
}

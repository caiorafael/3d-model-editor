import { booleans } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type { ResolvedModelStyle, StyledPart } from "@/interfaces/model-style.interface";
import {
  applyModelStyle,
  createStyledPart,
  ModelStyle,
  TextStyle,
} from "@/services/model-style.service";
import {
  applyCutPlacement,
  CutPlacement,
  DEFAULT_SOLID_CUT_PLACEMENT,
  DEFAULT_TEXT_CUT_PLACEMENT,
} from "@/services/placement.service";
import {
  applyTextTransform,
  buildTextSolid,
} from "@/services/text-geometry.service";
import {
  DEFAULT_MODEL_COLOR,
  DEFAULT_MODEL_COLOR_HEX,
  parseHexColor,
} from "@/utils/color";

const defaultTextStyle = (): ResolvedModelStyle => ({
  color: DEFAULT_MODEL_COLOR,
  colorHex: DEFAULT_MODEL_COLOR_HEX,
  transform: {},
  textFormat: {},
});

export class ModelBuildResult {
  constructor(private readonly parts: StyledPart[]) {}

  getParts(): StyledPart[] {
    return this.parts;
  }

  toGeometry(): Geom3 {
    if (this.parts.length === 0) {
      throw new Error("ModelBuildResult must contain at least one part.");
    }

    if (this.parts.length === 1) {
      return this.parts[0].geometry;
    }

    return booleans.union(...this.parts.map((part) => part.geometry));
  }

  static isA(value: unknown): value is ModelBuildResult {
    return value instanceof ModelBuildResult;
  }
}

export class ModelBuilder {
  private readonly parts: StyledPart[] = [];

  add(geometry: Geom3, style?: ModelStyle): ModelBuilder {
    this.parts.push(applyModelStyle(geometry, style));
    return this;
  }

  addText(content: string, style?: TextStyle): ModelBuilder {
    const trimmedContent = content.trim();

    if (trimmedContent === "") {
      throw new Error("Text content cannot be empty.");
    }

    const resolved = style?.resolve() ?? defaultTextStyle();
    const textSolid = buildTextSolid(trimmedContent, resolved.textFormat);
    const referenceGeometry = this.parts[this.parts.length - 1]?.geometry;
    const targetGeometry = referenceGeometry ?? textSolid;

    this.parts.push(
      createStyledPart(
        applyTextTransform(
          textSolid,
          resolved.transform,
          targetGeometry,
          "bottom-surface",
          DEFAULT_TEXT_CUT_PLACEMENT,
        ),
        resolved.color,
      ),
    );

    return this;
  }

  subtract(geometry: Geom3, placement?: CutPlacement): ModelBuilder {
    if (this.parts.length === 0) {
      throw new Error("Add a base geometry before subtract().");
    }

    const targetIndex = this.parts.length - 1;
    const targetPart = this.parts[targetIndex];
    const resolvedPlacement = placement?.resolve() ?? DEFAULT_SOLID_CUT_PLACEMENT;
    const cutTool = applyCutPlacement(
      geometry,
      targetPart.geometry,
      resolvedPlacement,
      "center",
    );
    const result = booleans.subtract(targetPart.geometry, cutTool);

    this.parts[targetIndex] = createStyledPart(
      result,
      parseHexColor(targetPart.colorHex),
    );

    return this;
  }

  subtractText(
    content: string,
    style?: TextStyle,
    placement?: CutPlacement,
  ): ModelBuilder {
    if (this.parts.length === 0) {
      throw new Error("Add a base geometry before subtractText().");
    }

    const trimmedContent = content.trim();

    if (trimmedContent === "") {
      throw new Error("Text content cannot be empty.");
    }

    const targetIndex = this.parts.length - 1;
    const targetPart = this.parts[targetIndex];
    const resolved = style?.resolve() ?? defaultTextStyle();
    const resolvedPlacement = placement?.resolve() ?? DEFAULT_TEXT_CUT_PLACEMENT;
    const textSolid = buildTextSolid(trimmedContent, resolved.textFormat);
    const cutTool = applyTextTransform(
      textSolid,
      resolved.transform,
      targetPart.geometry,
      "top-surface",
      resolvedPlacement,
    );
    const result = booleans.subtract(targetPart.geometry, cutTool);

    this.parts[targetIndex] = createStyledPart(
      result,
      parseHexColor(targetPart.colorHex),
    );

    return this;
  }

  build(): ModelBuildResult {
    if (this.parts.length === 0) {
      throw new Error("ModelBuilder must contain at least one geometry.");
    }

    return new ModelBuildResult(this.parts);
  }

  static isA(value: unknown): value is ModelBuilder {
    return value instanceof ModelBuilder;
  }
}

export { CutPlacement, ModelStyle, TextStyle };

import { colors, transforms } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type {
  ColorInput,
  ModelTransform,
  ResolvedModelStyle,
  RgbaColor,
  StyledPart,
} from "@/interfaces/model-style.interface";
import {
  DEFAULT_MODEL_COLOR,
  DEFAULT_MODEL_COLOR_HEX,
  parseColor,
  rgbaToHex,
} from "@/utils/color";

type Vec3 = [number, number, number];

export class ModelStyle {
  private colorValue?: RgbaColor;
  private positionValue?: Vec3;
  private rotationValue?: Vec3;
  private scaleValue?: Vec3;

  color(input: ColorInput): ModelStyle {
    this.colorValue = parseColor(input);
    return this;
  }

  position(x: number, y: number, z: number): ModelStyle {
    this.positionValue = [x, y, z];
    return this;
  }

  rotation(x: number, y: number, z: number): ModelStyle {
    this.rotationValue = [x, y, z];
    return this;
  }

  scale(x: number, y?: number, z?: number): ModelStyle {
    this.scaleValue = [x, y ?? x, z ?? y ?? x];
    return this;
  }

  resolve(): ResolvedModelStyle {
    return {
      color: this.colorValue ?? DEFAULT_MODEL_COLOR,
      colorHex: rgbaToHex(this.colorValue ?? DEFAULT_MODEL_COLOR),
      transform: {
        position: this.positionValue,
        rotation: this.rotationValue,
        scale: this.scaleValue,
      },
      textFormat: {},
    };
  }
}

export class TextStyle extends ModelStyle {
  private fontValue?: string;
  private sizeValue?: number;
  private depthValue?: number;
  private strokeValue?: number;

  font(name: string): TextStyle {
    this.fontValue = name;
    return this;
  }

  size(value: number): TextStyle {
    this.sizeValue = value;
    return this;
  }

  depth(value: number): TextStyle {
    this.depthValue = value;
    return this;
  }

  stroke(value: number): TextStyle {
    this.strokeValue = value;
    return this;
  }

  resolve(): ResolvedModelStyle {
    return {
      ...super.resolve(),
      textFormat: {
        font: this.fontValue,
        size: this.sizeValue,
        depth: this.depthValue,
        stroke: this.strokeValue,
      },
    };
  }
}

const applyTransform = (geometry: Geom3, transform: ModelTransform): Geom3 => {
  let result = geometry;

  if (transform.scale) {
    result = transforms.scale(transform.scale, result);
  }

  if (transform.rotation) {
    const [rotateX, rotateY, rotateZ] = transform.rotation;
    result = transforms.rotateX(rotateX, result);
    result = transforms.rotateY(rotateY, result);
    result = transforms.rotateZ(rotateZ, result);
  }

  if (transform.position) {
    result = transforms.translate(transform.position, result);
  }

  return result;
};

const colorizeGeometry = (geometry: Geom3, color: RgbaColor): Geom3 =>
  colors.colorize([color.r, color.g, color.b, color.a], geometry);

export const createStyledPart = (
  geometry: Geom3,
  color: RgbaColor,
  transform: ModelTransform = {},
): StyledPart => {
  const transformed = applyTransform(geometry, transform);
  const colored = colorizeGeometry(transformed, color);

  return {
    geometry: colored,
    colorHex: rgbaToHex(color),
  };
};

export const applyModelStyle = (
  geometry: Geom3,
  style?: ModelStyle,
): StyledPart => {
  const resolved = style?.resolve() ?? {
    color: DEFAULT_MODEL_COLOR,
    colorHex: DEFAULT_MODEL_COLOR_HEX,
    transform: {},
    textFormat: {},
  };

  return createStyledPart(geometry, resolved.color, resolved.transform);
};

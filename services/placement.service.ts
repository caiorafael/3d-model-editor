import { measurements, transforms } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type {
  CutAlignX,
  CutAlignY,
  CutFace,
  CutReference,
  ResolvedCutPlacement,
} from "@/interfaces/placement.interface";

const CUT_OVERLAP = 0.01;

type Vec3 = [number, number, number];
type BoundingBox = [Vec3, Vec3];

export const DEFAULT_TEXT_CUT_PLACEMENT: ResolvedCutPlacement = {
  face: "top",
  alignX: "center",
  alignY: "center",
  offset: [0, 0, 0],
};

export const DEFAULT_SOLID_CUT_PLACEMENT: ResolvedCutPlacement = {
  face: "center",
  alignX: "center",
  alignY: "center",
  offset: [0, 0, 0],
};

export class CutPlacement {
  private faceValue: CutFace = "top";
  private alignXValue: CutAlignX = "center";
  private alignYValue: CutAlignY = "center";
  private offsetValue: Vec3 = [0, 0, 0];
  private absolutePositionValue?: Vec3;
  private rotationValue?: Vec3;

  top(): CutPlacement {
    this.faceValue = "top";
    return this;
  }

  bottom(): CutPlacement {
    this.faceValue = "bottom";
    return this;
  }

  center(): CutPlacement {
    this.faceValue = "center";
    return this;
  }

  left(): CutPlacement {
    this.alignXValue = "left";
    return this;
  }

  right(): CutPlacement {
    this.alignXValue = "right";
    return this;
  }

  front(): CutPlacement {
    this.alignYValue = "front";
    return this;
  }

  back(): CutPlacement {
    this.alignYValue = "back";
    return this;
  }

  offset(x: number, y: number, z: number): CutPlacement {
    this.offsetValue = [x, y, z];
    return this;
  }

  at(x: number, y: number, z: number): CutPlacement {
    this.absolutePositionValue = [x, y, z];
    return this;
  }

  rotation(x: number, y: number, z: number): CutPlacement {
    this.rotationValue = [x, y, z];
    return this;
  }

  resolve(): ResolvedCutPlacement {
    return {
      face: this.faceValue,
      alignX: this.alignXValue,
      alignY: this.alignYValue,
      offset: this.offsetValue,
      absolutePosition: this.absolutePositionValue,
      rotation: this.rotationValue,
    };
  }
}

const getAnchorPoint = (
  boundingBox: BoundingBox,
  placement: ResolvedCutPlacement,
): Vec3 => {
  const [min, max] = boundingBox;
  const centerX = (min[0] + max[0]) / 2;
  const centerY = (min[1] + max[1]) / 2;
  const centerZ = (min[2] + max[2]) / 2;

  if (placement.face === "center") {
    return [
      centerX + placement.offset[0],
      centerY + placement.offset[1],
      centerZ + placement.offset[2],
    ];
  }

  const z = placement.face === "top" ? max[2] : min[2];

  let x = centerX;
  if (placement.alignX === "left") {
    x = min[0];
  } else if (placement.alignX === "right") {
    x = max[0];
  }

  let y = centerY;
  if (placement.alignY === "front") {
    y = min[1];
  } else if (placement.alignY === "back") {
    y = max[1];
  }

  return [
    x + placement.offset[0],
    y + placement.offset[1],
    z + placement.offset[2],
  ];
};

const applyRotation = (
  geometry: Geom3,
  rotation?: Vec3,
): Geom3 => {
  if (!rotation) {
    return geometry;
  }

  const [rotateX, rotateY, rotateZ] = rotation;
  let result = transforms.rotateX(rotateX, geometry);
  result = transforms.rotateY(rotateY, result);
  return transforms.rotateZ(rotateZ, result);
};

export const applyCutPlacement = (
  tool: Geom3,
  target: Geom3,
  placement: ResolvedCutPlacement,
  reference: CutReference,
): Geom3 => {
  if (placement.absolutePosition) {
    const toolCenter = measurements.measureCenter(tool);
    const [x, y, z] = placement.absolutePosition;

    const positioned = transforms.translate(
      [x - toolCenter[0], y - toolCenter[1], z - toolCenter[2]],
      tool,
    );

    return applyRotation(positioned, placement.rotation);
  }

  const anchor = getAnchorPoint(
    measurements.measureBoundingBox(target),
    placement,
  );
  const toolBoundingBox = measurements.measureBoundingBox(tool);
  const toolCenter = measurements.measureCenter(tool);

  let dz = anchor[2] - toolCenter[2];

  if (reference === "top-surface") {
    dz = anchor[2] - toolBoundingBox[1][2] + CUT_OVERLAP;
  } else if (reference === "bottom-surface") {
    dz = anchor[2] - toolBoundingBox[0][2] - CUT_OVERLAP;
  }

  const positioned = transforms.translate(
    [anchor[0] - toolCenter[0], anchor[1] - toolCenter[1], dz],
    tool,
  );

  return applyRotation(positioned, placement.rotation);
};

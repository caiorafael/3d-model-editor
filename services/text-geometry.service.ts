import { transforms } from "@jscad/modeling";
import type Geom3 from "@jscad/modeling/src/geometries/geom3/type";
import type { ModelTransform, TextFormat } from "@/interfaces/model-style.interface";
import type { CutReference, ResolvedCutPlacement } from "@/interfaces/placement.interface";
import { applyCutPlacement } from "@/services/placement.service";
import { createTextSolid } from "@/services/text-paths.service";

export const buildTextSolid = (
  content: string,
  format: TextFormat = {},
): Geom3 => createTextSolid(content, format);

export const applyTextTransform = (
  textGeometry: Geom3,
  transform: ModelTransform,
  targetGeometry: Geom3,
  reference: CutReference,
  placement: ResolvedCutPlacement,
): Geom3 => {
  let result = applyCutPlacement(
    textGeometry,
    targetGeometry,
    placement,
    reference,
  );

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

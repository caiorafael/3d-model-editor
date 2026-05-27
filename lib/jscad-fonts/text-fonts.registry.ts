import type { HersheyFont } from "@/interfaces/text-font.interface";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const simplexFont = require("@jscad/modeling/src/text/fonts/single-line/hershey/simplex.js") as HersheyFont;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cncVectorFont = require("@/lib/jscad-fonts/cnc-vector.js") as HersheyFont;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const helveticaLineFont = require("@/lib/jscad-fonts/helvetica-line.js") as HersheyFont;

const FONT_REGISTRY: Record<string, HersheyFont> = {
  simplex: simplexFont,
  cnc: cncVectorFont,
  helvetica: helveticaLineFont,
};

export class TextFonts {
  static readonly SIMPLEX = "simplex";
  static readonly CNC = "cnc";
  static readonly HELVETICA = "helvetica";

  static list(): string[] {
    return Object.keys(FONT_REGISTRY);
  }

  static get(name: string): HersheyFont {
    const font = FONT_REGISTRY[name.toLowerCase()];

    if (!font) {
      throw new Error(
        `Unknown font "${name}". Available fonts: ${TextFonts.list().join(", ")}`,
      );
    }

    return font;
  }

  static register(name: string, font: HersheyFont): void {
    FONT_REGISTRY[name.toLowerCase()] = font;
  }
}

export const resolveTextFont = (fontName?: string): HersheyFont => {
  if (!fontName) {
    return TextFonts.get(TextFonts.SIMPLEX);
  }

  return TextFonts.get(fontName);
};

export type { TextFontName } from "@/interfaces/text-font.interface";

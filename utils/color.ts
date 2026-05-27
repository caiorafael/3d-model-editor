import type { ColorInput, RgbaColor } from "@/interfaces/model-style.interface";

const NAMED_COLORS: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  red: "#ef4444",
  green: "#10b981",
  amber: "#f59e0b",
  purple: "#a855f7",
  white: "#f5f5f5",
  black: "#171717",
};

const clampChannel = (value: number) => Math.min(1, Math.max(0, value));

export const parseHexColor = (hex: string): RgbaColor => {
  const normalized = hex.replace("#", "");

  if (normalized.length === 3) {
    const r = parseInt(normalized[0] + normalized[0], 16) / 255;
    const g = parseInt(normalized[1] + normalized[1], 16) / 255;
    const b = parseInt(normalized[2] + normalized[2], 16) / 255;
    return { r, g, b, a: 1 };
  }

  if (normalized.length === 6) {
    const r = parseInt(normalized.slice(0, 2), 16) / 255;
    const g = parseInt(normalized.slice(2, 4), 16) / 255;
    const b = parseInt(normalized.slice(4, 6), 16) / 255;
    return { r, g, b, a: 1 };
  }

  throw new Error(`Invalid hex color: ${hex}`);
};

export const rgbaToHex = (color: RgbaColor): string => {
  const toHex = (channel: number) =>
    Math.round(clampChannel(channel) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
};

export const parseColor = (input: ColorInput): RgbaColor => {
  if (typeof input === "string") {
    const named = NAMED_COLORS[input.toLowerCase()];

    if (named) {
      return parseHexColor(named);
    }

    if (input.startsWith("#")) {
      return parseHexColor(input);
    }

    throw new Error(`Unsupported color string: ${input}`);
  }

  if (Array.isArray(input)) {
    if (input.length === 3) {
      return {
        r: clampChannel(input[0]),
        g: clampChannel(input[1]),
        b: clampChannel(input[2]),
        a: 1,
      };
    }

    if (input.length === 4) {
      return {
        r: clampChannel(input[0]),
        g: clampChannel(input[1]),
        b: clampChannel(input[2]),
        a: clampChannel(input[3]),
      };
    }
  }

  if ("r" in input && "g" in input && "b" in input) {
    return {
      r: clampChannel(input.r),
      g: clampChannel(input.g),
      b: clampChannel(input.b),
      a: input.a === undefined ? 1 : clampChannel(input.a),
    };
  }

  throw new Error("Invalid color input.");
};

export const DEFAULT_MODEL_COLOR = parseColor("#22d3ee");

export const DEFAULT_MODEL_COLOR_HEX = rgbaToHex(DEFAULT_MODEL_COLOR);

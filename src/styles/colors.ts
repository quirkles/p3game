export type HexString = `#${string}`;

export const colors = {
  red: "#E63946",
  blue: "#457B9D",
  green: "#A1C181",
  orange: "#FAA916",
  yellow: "#FCCA46",
  purple: "#564256",
  black: "#242423",
  white: "#FEFFFE",
} as const;

export type Color = keyof typeof colors;

export const greys = {
  grey5: "#6a6a6a",
  grey4: "#8a8a8a",
  grey3: "#bababa",
  grey2: "#cbcbcb",
  grey1: "#f0f0f0",
} as const;

export type Grey = keyof typeof greys;

export function isColor(color: string): color is Color {
  return color in colors;
}

export function isGrey(color: string): color is Grey {
  return color in greys;
}

// Export aliases for commonly used color contexts
export const colorAliases = {
  primary: colors.purple,
  danger: colors.red,
  success: colors.green,
  warning: colors.orange,
  info: colors.blue,
} as const;

export type ColorAlias = keyof typeof colorAliases;

export function isColorAlias(color: string): color is ColorAlias {
  return color in colorAliases;
}

export type ColorName = Color | ColorAlias | Grey;
export type ColorCode<T extends ColorName> = T extends Color
  ? (typeof colors)[T]
  : T extends ColorAlias
    ? (typeof colorAliases)[T]
    : T extends Grey
      ? (typeof greys)[T]
      : never;

export function getColor<T extends ColorName>(colorName: T): ColorCode<T> {
  if (isColor(colorName)) {
    return colors[colorName] as ColorCode<T>;
  }
  if (isColorAlias(colorName)) {
    return colorAliases[colorName] as ColorCode<T>;
  }
  if (isGrey(colorName)) {
    return greys[colorName] as ColorCode<T>;
  }
  throw new Error(`Invalid color name: ${colorName}`);
}

export function getFontColor<T extends ColorName>(colorName: T): HexString {
  switch (colorName) {
    case "red":
    case "green":
    case "orange":
    case "white":
    case "success":
    case "info":
    case "danger":
    case "black":
    case "blue":
    case "primary":
    case "purple":
      return colors.white;
    case "yellow":
    case "warning":
      return colors.black;
    default:
      return colors.black;
  }
}

const darkenMemo = new Map<HexString, HexString>();
export const darkenColor = (hex: HexString, amount: number): HexString => {
  if (darkenMemo.has(hex)) {
    return darkenMemo.get(hex)!;
  }
  const hexTail = hex.replace("#", "");
  const r = Math.max(0, parseInt(hexTail.slice(0, 2), 16) - amount)
    .toString(16)
    .padStart(2, "0");
  const g = Math.max(0, parseInt(hexTail.slice(2, 4), 16) - amount)
    .toString(16)
    .padStart(2, "0");
  const b = Math.max(0, parseInt(hexTail.slice(4, 6), 16) - amount)
    .toString(16)
    .padStart(2, "0");

  const darkenedColor: HexString = `#${r}${g}${b}`;
  darkenMemo.set(hex, darkenedColor);

  return darkenedColor;
};

const lightenMemo = new Map<HexString, HexString>();
export const lightenColor = (hex: HexString, amount: number): HexString => {
  if (lightenMemo.has(hex)) {
    return lightenMemo.get(hex)!;
  }
  const hexTail = hex.replace("#", "");
  const r = Math.min(255, parseInt(hexTail.slice(0, 2), 16) + amount)
    .toString(16)
    .padStart(2, "0");
  const g = Math.min(255, parseInt(hexTail.slice(2, 4), 16) + amount)
    .toString(16)
    .padStart(2, "0");
  const b = Math.min(255, parseInt(hexTail.slice(4, 6), 16) + amount)
    .toString(16)
    .padStart(2, "0");

  const lightenedColor: HexString = `#${r}${g}${b}`;

  lightenMemo.set(hex, lightenedColor);

  return lightenedColor;
};

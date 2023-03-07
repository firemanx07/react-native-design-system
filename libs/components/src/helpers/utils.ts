export const clamp = (val: number, min: number = 0, max: number = 1): number =>
  Math.max(min, Math.min(max, val));

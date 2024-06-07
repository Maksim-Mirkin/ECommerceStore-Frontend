export function arrayMin(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  return Math.min(...arr);
}

export function arrayMax(arr: number[]): number {
  if (arr.length === 0) {
    return 999999;
  }
  return Math.max(...arr);
}

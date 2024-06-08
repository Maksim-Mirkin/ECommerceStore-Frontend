/**
 * Calculates the minimum value in an array of numbers.
 * If the array is empty, returns 0 as a default value.
 * 
 * @param arr The array of numbers from which to find the minimum value.
 * @returns number The minimum value in the array, or 0 if the array is empty.
 */
export function arrayMin(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  return Math.min(...arr);
}

/**
 * Calculates the maximum value in an array of numbers.
 * If the array is empty, returns 999999 as a default value.
 * 
 * @param arr The array of numbers from which to find the maximum value.
 * @returns number The maximum value in the array, or 999999 if the array is empty.
 */
export function arrayMax(arr: number[]): number {
  if (arr.length === 0) {
    return 999999;
  }
  return Math.max(...arr);
}

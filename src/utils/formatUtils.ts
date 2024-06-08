/**
 * Capitalizes the first letter of a given string.
 *
 * @param str The string whose first letter will be capitalized.
 * @returns string The modified string with the first letter in uppercase.
 */
export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Decapitalizes the first letter of a given string.
 *
 * @param str The string whose first letter will be decapitalized.
 * @returns string The modified string with the first letter in lowercase.
 */
export function decapitalizeFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Splits a camelCase string into a space-separated string.
 *
 * @param input The camelCase string to be split.
 * @returns string The space-separated version of the input string.
 */
export function splitCamelCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/**
 * Splits a sorting criteria string into its parts based on an underscore.
 * Throws an error if the string does not contain exactly one underscore.
 *
 * @param str The sorting criteria string to split.
 * @returns Array<string | undefined> An array of two strings, or two undefined values if the input is empty.
 */
export function splitSortingCriteria(str: string): Array<string | undefined> {
  if (str.length === 0) {
    return [undefined, undefined];
  }
  const parts = str.split("_");
  if (parts.length !== 2) {
    throw new Error("Input string must contain exactly one underscore.");
  }
  return parts;
}

/**
 * Extracts the date part from a string formatted as an ISO string.
 *
 * @param str The ISO string from which to extract the date.
 * @returns string The date in "DD/MM/YYYY" format.
 */
export function extractDate(str: string): string {
  return formatDate(str.split("T")[0]);
}

/**
 * Formats a string representing a date into "DD/MM/YYYY" format.
 *
 * @param str The date string to format.
 * @returns string The formatted date string.
 */
function formatDate(str: string): string {
  const date = new Date(str);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

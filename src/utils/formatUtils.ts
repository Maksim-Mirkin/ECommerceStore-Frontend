export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function decapitalizeFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function splitCamelCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function splitSortingCriteria(str: string) {
  if(str.length === 0) {
    return [undefined, undefined];
  }
  const parts = str.split("_");
  if (parts.length !== 2) {
    throw new Error("Input string must contain exactly one underscore.");
  }
  return parts;
}

export function extractDate(str: string) {
  return formatDate(str.split("T")[0]);
}
function formatDate(str: string): string {
  const date = new Date(str);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
/**
 * Checks if a given URL ends with an image file extension.
 * This function uses a regular expression to match the URL against common image file extensions.
 *
 * @param url The URL string to be tested.
 * @returns boolean True if the URL ends with a known image extension, false otherwise.
 */
export const isImageURL = (url: string): boolean => {
  const imagePattern = /\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff?)$/i;
  return imagePattern.test(url);
};

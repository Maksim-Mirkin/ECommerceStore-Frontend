export const isImageURL = (url: string): boolean => {
    const imagePattern = /\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff?)$/i;
    return imagePattern.test(url);
  };
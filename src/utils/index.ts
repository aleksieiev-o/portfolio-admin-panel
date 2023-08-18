export const getFileExtension = (file?: File): string => {
  if (file) {
    return file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2);
  }
  return '';
};

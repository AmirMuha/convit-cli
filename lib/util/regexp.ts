export const getFilename = /(([^\/])+\.(\w+))/g;

export const getExtension = (format: string) => {
  return new RegExp(`\.(${format})$`,"ig")
}


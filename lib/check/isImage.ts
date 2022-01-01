export const filenameRegEx = /\.(png|jpeg|webp|svg|gif|tiff|avif|jpg)$/i;
export default (inputPath: string) => {
  const filename = inputPath.match(filenameRegEx)
  if(filename){
    return filename[1]
  }
}

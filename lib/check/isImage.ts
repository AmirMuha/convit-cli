export const filenameRegEx = /\.(png|jpeg|webp|svg|gif|tiff|avif|jpg)$/i;
export default (input: string) => {
  const filename = filenameRegEx.test(input)
  if(filename){
    return true
  }
  return false
}

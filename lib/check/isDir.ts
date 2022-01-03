import fs from "fs"
export default (inputPath: string):boolean => {
  let isDir = false;
  const isExist = fs.existsSync(inputPath);
  if (isExist) {
    const stats = fs.statSync(inputPath);
    if (stats.isDirectory()) {
      isDir = true;
    }
  }
  return isDir;
}

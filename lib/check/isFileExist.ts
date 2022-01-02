import fs from "fs"
import getResolvedPath from "../util/getResolvedPath"


export default (inputPath: string): boolean => {
  return !!fs.existsSync(getResolvedPath(inputPath))
}

import fs from "fs"
import path from "path"

export default (inputPath: string): boolean => {
  return !!fs.existsSync(path.resolve(__dirname, inputPath))
}

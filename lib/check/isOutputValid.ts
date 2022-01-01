import {
  debugIsOutputValid as debug
} from "../util/debug"
import {green, red} from "../util/chalk"
import fs from "fs"
import { allFilenamesRegExp, lastFilenameRegExp } from "../util/regexp";

// ------------------ CHECKING IF OUTPUT PATH IS CORRECT (IF EXIST)

/**
 * @description check if the output directory or file exist
 *
 * @param output: string
 *
 * @example
 * ```js
 * checkOutput({
 *    output: "/directory/output.png" // or /directory/outputDir
 * })
 * ```
*/
const isOutputValid = (options:{
  output:string
}) => {
  const {
    output
  } = options;
  const isOutputPathExist = fs.existsSync(output);
  if(isOutputPathExist) {
    debug(green(`Output dir exist.`));
  } else if(!isOutputPathExist && lastFilenameRegExp.test(output)) {
    debug(
      `Output directory doesn't exist. Want to create a new directory named ${red(
        output.match(allFilenamesRegExp)?.pop()
      )} ?`
    );
    // Implement asking the client if wants to make a directory
  }
}

export default isOutputValid

import {
  debugIsOutputValid as debug
} from "../util/debug"
import {green, red,gray,orange} from "../util/chalk"
import fs from "fs"
import inquirer from "inquirer"
import getResolvedPath from "../util/getResolvedPath"

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
export default async(options:{
  output:string
}) => {
  let {
    output,
  } = options;
  const isOutputPathExist = fs.existsSync(output);
  if(isOutputPathExist) {
    debug(green(`Output is valid.`));
  } else {
    const answer = await inquirer.prompt([
      {
        name: "mkdir",
        type:"confirm",
        prefix: "*",
        default: "No",
        message: red(
          `Output directory doesn't exist. Want to create a new directory named ${gray(
            output
          )} ?${orange("(default -> false)")}`
        ),
      },
    ]);
    if(answer && answer.mkdir) {
      fs.mkdirSync(getResolvedPath(output));
    } else {
      process.exit(1)
    }
  }
}

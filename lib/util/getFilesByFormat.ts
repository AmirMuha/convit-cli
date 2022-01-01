import fs from "fs"
import {orange,green,red,yellow,gray} from "./chalk"
import {
  debugGetFilesByFormat as debug
} from "./debug"
import isDir from "../check/isDir";
import {AllFileTypes} from "../types";

/**
 * @description use this function to find all files corresponding to a specific format.
 *
 * @param options
 * ```js
 * options {
 *    directory: string,
 *    format: AllFileTypes // the target format not the current format
 * }
 * ```
 *
 * @returns an array of found matched files.
 *
 * @example
 * ```js
 * getFilesByFormat({
 *    directory: "/path/to/file.jpg",
 *    format: "png"
 * })
 * ```
 *
 *
*/
const getFilesByFormat =(options: {
  directory: string;
  format: AllFileTypes;
}): string[]=> {
  if(!options.directory || !options.format) {
    debug(red("Error: "),gray(`Directory and Format both are required.`))
    return []
  }
  const formatRegExp = new RegExp(`\.${options.format}$`, "i");
  const matchedFiles: string[] = [];
  const files = fs.readdirSync(options.directory);
  debug(
    orange(
      `Searching for all .${options.format.toUpperCase()} files in ${
        options.directory
      }`
    )
  );
  debug(yellow(`All files in ${options.directory}}:`),files);
  if (isDir(options.directory)) {
    files.forEach((f) => {
      if (formatRegExp.test(f)) {
        matchedFiles.push(`${options.directory}/${f}`);
        return;
      }
    });
  }
  debug(green(`Found ${matchedFiles.length} .${(options.format).toUpperCase()}`));
  return matchedFiles;
}

export default getFilesByFormat

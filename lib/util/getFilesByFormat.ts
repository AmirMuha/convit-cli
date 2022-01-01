import fs from "fs"
import {orange,green,red,yellow,gray} from "./chalk"
import {
  debugGetFilesByFormat as debug
} from "./debug"
import isDir from "../check/isDir";
import {AllFileTypes} from "../types";
import isImage from "../check/isImage";
import isFileExist from "../check/isFileExist";


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
export const getFilesByFormatInOneDir = (options: {
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

/**
 * @description gather all files with simillar format in several directories.
 *
 * @param options 
 * ```js
 * options {
 *    inputs: string[]
 *    format: AllFileTypes
 * }
 * ```
 *
 * @example 
 * ```js
 * getFilesByFormatInSeveralDirs({
 *    inputs: [
 *      "/files/image-1.jpg",
 *      "/files/image-2.jpg",
 *      "/files/image-3.jpg",
 *      "/files/icons", // directory (or /files/icons/)
 *    ],
 *    format: "png"
 * })
 * ```
*/
export const getFilesByFormatInSeveralDirs = (options:{
  inputs:string[]
  format: AllFileTypes
}):string[] => {
  const {
    inputs,
    format
  } = options;
  const files:string[] = [];
  inputs.forEach((i) => {
    if(isImage(i)) {
      if(isFileExist(i)) {
        files.push(i)
      } else {
        console.error(red(`${i} file doesn't exist. Perhaps deleted before being converted.`))
      }
    } else if(isDir(i)) {
      files.concat(
        getFilesByFormatInOneDir({
          directory: i,
          format,
        })
      );
    } else {
      console.error(red(`Input must be either a file or directory.`))
      return
    }
  });
  return files
}


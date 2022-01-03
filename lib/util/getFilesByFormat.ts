import fs from "fs"
import {green,red,yellow,gray} from "./chalk"
import {
  debugGetFilesByFormat as debug
} from "./debug"
import isDir from "../check/isDir";
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
  format: "image"|"video"|"audio";
}): string[]=> {
  let {directory, format} = options;
  console.log(directory)
  if(!directory || !format) {
    debug(red("Error: "),gray(`Directory and Format both are required.`))
    return []
  }
  const getCorrespondingModule =
    format === "image"
      ? require("../check/isImage").default
      : format === "video"
      ? require("../check/isVideo").default
      : format === "audio"
      ? require("../check/isAudio").default
      : null;
  if(!getCorrespondingModule) {
    throw new Error("Something went wrong with getting the corresponding module.")
  } 
  const matchedFiles: string[] = [];
  const files = fs.readdirSync(directory);
  debug(yellow(`All files in ${directory}:`), files);
  files.forEach((f) => {
    if (getCorrespondingModule(f)) {
      matchedFiles.push(`${directory}/${f}`);
      return;
    }
  });
  debug(green(`Found ${matchedFiles.length}`), matchedFiles);
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
  format: "image"|"video"|"audio"
}):string[] => {
  const {
    inputs,
    format
  } = options;
  try{
  const files:string[] = [];
  const getCorrespondingModule =
    format === "image"
      ? require("../check/isImage").default
      : format === "video"
      ? require("../check/isVideo").default
      : format === "audio"
      ? require("../check/isAudio").default
      : null;
  if(!getCorrespondingModule) {
    throw new Error("Something went wrong with getting the corresponding module.")
  } 
  inputs.forEach((i) => {
    if(getCorrespondingModule(i)) {
      if(isFileExist(i)) {
        files.push(i)
      } else {
        console.error(red(`${i} file doesn't exist. Perhaps deleted before being converted.`))
      }
    } else if (isDir(i)) {
      files.push(
        ...getFilesByFormatInOneDir({
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
  } catch(e) {
    console.log(red("Error: "),e.message)
    process.exit(1)
  }
}


import sharp from "sharp"
import fs from "fs"
import { red, gray, green } from "../util/chalk";
import errorHandler from "../util/errorHandler";
import path from "path"
import {SupportedImageOutput} from "../types"
import isOutputValid from "../check/isOutputValid"
import {
  getFilesByFormatInSeveralDirs,
} from "../util/getFilesByFormat";
import { debugConvertImage as debug } from "../util/debug";

export const supportedInputImages = ["svg","png","jpeg","webp","tiff","jpg","avif","gif"]
export const supportedOutputImages = ["png","jpeg","webp","tiff","jpg","avif"]

// ------------------ CONVERT IMAGES WITH SHARP
const convert = (options:{
  input:string
  output:string
  format: SupportedImageOutput
  width?:number
  height?:number
  quality?:number
  progressive?:boolean
  compressionLevel?: number
}) => {
  const {
    input,
    output,
    format,
    width,
    height,
    quality,
    compressionLevel,
    progressive,
  } = options;
  const writeStream = fs.createWriteStream(path.resolve(process.cwd(), output));
  sharp(input)
    .toFormat(format, { quality, progressive, compressionLevel })
    .resize(width, height)
    .toFile(output)
    .then((info) => {
      debug(green("Successful! "), gray(`Output: ${output}`));
    })
    .catch((e) => {
      console.error(red("Error: "), gray(e.message));
    });
};

/**
 * @description 
 * @param options
 * ```js
 * options {
 *    inputPath: string[]
 *    outputPath: string
 *    format: SupportedImageOutput
 * }
 * ```
 *
 * @example 
*/

const  convertImage = (options:{
  inputPath: string[],
  format: SupportedImageOutput,
  quality?: number,
  width?: number,
  height?: number,
  outputPath: string
}) => {
  const {
    width,
    height,
    quality,
    inputPath,
    outputPath,
    format
  } = options;
  errorHandler(() => {
  const files: string[] = [];
  //-----------------GATHERING FILES
  getFilesByFormatInSeveralDirs({
    inputs: inputPath,
    format
  })
  //-----------------CHECKING THE OUTPUT PATH IS CORRECT
  isOutputValid({
    output: outputPath
  })
  //-----------------CONVERTING THE IMAGE
    files.forEach(i => {
      convert({
        input: i,
        output: outputPath,
        width,
        height,
        quality,
        format,
      });
    })
  });
};

export default convertImage

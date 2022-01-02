import sharp from "sharp";
import { red, gray, green } from "../util/chalk";
import errorHandler from "../util/errorHandler";
import { SupportedImageOutput } from "../types";
import isOutputValid from "../check/isOutputValid";
import { getFilesByFormatInSeveralDirs } from "../util/getFilesByFormat";
import { debugConvertImage as debug } from "../util/debug";
import { supportedInputImages } from "../util/supportedFormats";

// ------------------ CONVERT IMAGES WITH SHARP
const convert = (options: {
  input: string;
  output: string;
  format: SupportedImageOutput;
  width?: number;
  height?: number;
  quality?: number;
  progressive?: boolean;
  compressionLevel?: number;
  filename?: string;
}) => {
  let {
    input,
    output,
    format,
    width,
    height,
    quality,
    compressionLevel,
    progressive,
    filename,
  } = options;
  sharp(input)
    .toFormat(format, { quality, progressive, compressionLevel })
    .resize(width, height)
    .toFile(output)
    .then((info) => {
      console.log(info);
      debug(green("Successful! "), gray(`Output: ${output}\n`));
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

const convertImage = (options: {
  inputPath: string[];
  format: SupportedImageOutput;
  quality?: number;
  width?: number;
  height?: number;
  outputPath: string;
}) => {
  const { width, height, quality, inputPath, outputPath, format } = options;
  errorHandler(() => {
    const files: string[] = [];
    //-----------------CHECKING IF FORMAT IS CORRECT
    if (supportedInputImages.includes(format)) {
      debug(
        red("Error: "),
        gray(`${format} is not acceptable as a output format.`)
      );
      return;
    }
    //-----------------GATHERING FILES
    getFilesByFormatInSeveralDirs({
      inputs: inputPath,
      format,
    });
    //-----------------CHECKING THE OUTPUT PATH IS CORRECT
    isOutputValid({
      output: outputPath,
    });
    //-----------------CONVERTING THE IMAGE
    files.forEach((i) => {
      convert({
        input: i,
        output: outputPath,
        width,
        height,
        quality,
        format,
      });
    });
    debug(green("Files: "), files);
  });
};

export default convertImage;

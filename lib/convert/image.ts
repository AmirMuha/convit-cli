import sharp from "sharp";
import { red, gray, green } from "../util/chalk";
import errorHandler from "../util/errorHandler";
import { SupportedImageOutput } from "../types";
import isOutputValid from "../check/isOutputValid";
import { getFilesByFormatInSeveralDirs } from "../util/getFilesByFormat";
import { debugConvertImage as debug } from "../util/debug";
import { supportedInputImages } from "../util/supportedFormats";
import { lastFilenameRegExp } from "../util/regexp"
import fs from "fs"
import getRandomName from "../util/getRandomName";
import getResolvedPath from "../util/getResolvedPath";

// ------------------ CONVERT IMAGES WITH SHARP
const convert = (options: {
  input: string;
  output?: string;
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
    const isFilenameExist = fs.existsSync(input.replace(/(\.[a-zA-Z0-9-_]+)$/i, "." + format));
  if (!!output) {
    if (isFilenameExist) {
      output =
        output +
        "/" +
        getRandomName({
          format,
          prefix: "image",
        });
    } else {
      output =
        output +
        "/" +
        input.match(lastFilenameRegExp)![0].replace(/(\.\w+)$/i, "." + format);
    }
  } else {
    if (isFilenameExist) {
      output = getResolvedPath(getRandomName({ format, prefix: "image" }));
    } else {
      output = getResolvedPath(
        input.match(lastFilenameRegExp)![0].split(".")[0] + "." + format
      );
    }
  }
  debug(red("Final output: ")+ gray(output))
  sharp(input)
    .toFormat(format, { quality, progressive, compressionLevel })
    .resize(width, height)
    .toFile(output!)
    .then((info) => {
      console.log(green("Successful! "), gray(`Output: ${output}\n`));
    })
    .catch((e) => {
      console.log(red("Error: "), gray(e.message));
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
  outputPath?: string;
}) => {
  const { width, height, quality, inputPath, outputPath, format } = options;
  errorHandler(async() => {
    //-----------------CHECKING IF FORMAT IS CORRECT
    if (!supportedInputImages.includes(format)) {
      debug(
        red("Error: "),
        gray(`${format} is not acceptable as a output format.`)
      );
      return;
    }
    //-----------------GATHERING FILES
    const files: string[] = getFilesByFormatInSeveralDirs({
      inputs: inputPath,
      format: "image",
    });
    //-----------------CHECKING THE OUTPUT PATH IS CORRECT
    if (outputPath) {
      await isOutputValid({
        output: outputPath,
      });
    }
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

import yargs from "yargs";
import { green, orange } from "./chalk";
import { debugArgsHandler as debug } from "./debug";
import getResolvedPath from "./getResolvedPath";
import { supportedOutputImages } from "./supportedFormats";
//------------ENUM - GROUPS
export enum GroupOfOptions {
  IMAGE = "Image Manipulation",
  VIDEO = "Video Manipulation",
  MUSIC = "Music Manipulation",
}
//------------PARSING ARGUMENTS
export default () => {
  const argvs = yargs(process.argv.slice(2))
    .command(
      ["interactive","i"],
      "Use this command to use the interactive mode in order to manipulate your files. Example: convit <interactive | i>",
    )
    .option("files", {
      describe: "Selecting files to convert,optimize,or resize.",
      type: "string",
      alias: ["f"],
      array: true,
      group: GroupOfOptions.IMAGE,
      example:
        "$0 -f [files] -t [format] :ex. convit -f ./image1.png ./dir/image-2.jpeg  -t avif",
      coerce(files: string[]) {
        if (files) {
          const resolvedFiles = files.map((f) => getResolvedPath(f));
          debug(green("Files: "), resolvedFiles);
          return resolvedFiles;
        }
      },
    })
    .option("convert-to", {
      describe: "Select the format you want to convert your file to.",
      type: "string",
      alias: ["t", "to"],
      choices: supportedOutputImages,
      group: GroupOfOptions.IMAGE,
      coerce(format: string) {
        if (format) {
          debug(green(`Format: ${orange(format)}`));
          return format;
        }
      },
    })
    .option("output", {
      describe: "Enter the output path or the output filename (optional).",
      type: "string",
      alias: ["o"],
      example:
        "$0 -f [files] -t [format] <--output, -o> [output_path|output_filename]",
      group: GroupOfOptions.IMAGE,
      coerce(output: string) {
        if (output) {
          return output.trim();
        }
      },
    })
    .option("size", {
      describe: "Specify the size of the images your want to manipulate.",
      type: "string",
      alias: ["s"],
      example: "$0 -f [files] -t [format] <--size, -s> [widthxheight]",
      group: GroupOfOptions.IMAGE,
      coerce(size: string) {
        if (size) {
          const regex = /(\d+)x?(\d*)?/i;
          const parsedSize = size.match(regex);
          const sizeObj: { width?: number; height?: number } = {};
          if (parsedSize) {
            sizeObj.width = parsedSize[1] ? +parsedSize[1] : undefined;
            sizeObj.height = parsedSize[2] ? +parsedSize[2] : undefined;
            debug(green(`Size:  `), sizeObj);
            return sizeObj;
          }
        }
      },
    })
    .option("width", {
      describe: "Specify the output image width.",
      alias: ["w"],
      type: "number",
      example: "$0 -f [files] -t [format] <--width, -w> [width]",
      group: GroupOfOptions.IMAGE,
      coerce(width: number) {
        if (width) {
          return width;
        }
      },
    })
    .option("height", {
      describe: "Specify the output image height.",
      alias: ["h"],
      type: "number",
      example: "$0 -f [files] -t [format] <--height, -h> [height]",
      group: GroupOfOptions.IMAGE,
      coerce(height: number) {
        if (height) {
          return height;
        }
      },
    })
    .option("quality", {
      describe:
        "Specify the quality of the output image. valid range -> 0 to 100",
      type: "number",
      alias: ["q"],
      example: "$0 -f [files] -t [format] <--quality, -q> [quality value]",
      group: GroupOfOptions.IMAGE,
      coerce(quality: number) {
        if (quality) {
          return quality;
        }
      },
    })
    .help("help")
    .parseSync();
    debug(green("Passed arguments: "), argvs);
    return argvs;
};



"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupOfOptions = void 0;
const yargs_1 = __importDefault(require("yargs"));
const chalk_1 = require("./chalk");
const debug_1 = require("./debug");
const getResolvedPath_1 = __importDefault(require("./getResolvedPath"));
const regexp_1 = require("./regexp");
const supportedFormats_1 = require("./supportedFormats");
var GroupOfOptions;
(function (GroupOfOptions) {
    GroupOfOptions["IMAGE"] = "Image Manipulation";
    GroupOfOptions["VIDEO"] = "Video Manipulation";
    GroupOfOptions["MUSIC"] = "Music Manipulation";
})(GroupOfOptions = exports.GroupOfOptions || (exports.GroupOfOptions = {}));
exports.default = () => {
    const argvs = (0, yargs_1.default)(process.argv.slice(2))
        .command(["interactive", "i"], "Use this command to use the interactive mode in order to manipulate your files. Example: convit <interactive | i>")
        .option("files", {
        describe: "Selecting files to convert,optimize,or resize.",
        type: "string",
        alias: ["f"],
        array: true,
        group: GroupOfOptions.IMAGE,
        example: "$0 -f [files] -t [format] :ex. convit -f ./image1.png ./dir/image-2.jpeg  -t avif",
        coerce(files) {
            if (files) {
                const resolvedFiles = files.map((f) => (0, getResolvedPath_1.default)(f));
                (0, debug_1.debugArgsHandler)((0, chalk_1.green)("Files: "), resolvedFiles);
                return resolvedFiles;
            }
        },
    })
        .option("convert-to", {
        describe: "Select the format you want to convert your file to.",
        type: "string",
        alias: ["t", "to"],
        choices: supportedFormats_1.supportedOutputImages,
        group: GroupOfOptions.IMAGE,
        coerce(format) {
            if (format) {
                (0, debug_1.debugArgsHandler)((0, chalk_1.green)(`Format: ${(0, chalk_1.orange)(format)}`));
                return format;
            }
        },
    })
        .option("output", {
        describe: "Enter the output path or the output filename (optional).",
        type: "string",
        alias: ["o"],
        nargs: 1,
        example: "$0 -f [files] -t [format] <--output, -o> [output_path|output_filename]",
        group: GroupOfOptions.IMAGE,
        coerce(output) {
            if (output && !regexp_1.lastDirRegExp.test(output)) {
                throw new Error("Please consider passing a directory instead of a file as an output.");
            }
            if (output) {
                return (0, getResolvedPath_1.default)(output);
            }
        },
    })
        .option("size", {
        describe: "Specify the size of the images your want to manipulate.",
        type: "string",
        alias: ["s"],
        example: "$0 -f [files] -t [format] <--size, -s> [widthxheight]",
        group: GroupOfOptions.IMAGE,
        coerce(size) {
            if (size) {
                const regex = /(\d+)x?(\d*)?/i;
                const parsedSize = size.match(regex);
                const sizeObj = {};
                if (parsedSize) {
                    sizeObj.width = parsedSize[1] ? +parsedSize[1] : undefined;
                    sizeObj.height = parsedSize[2] ? +parsedSize[2] : undefined;
                    (0, debug_1.debugArgsHandler)((0, chalk_1.green)(`Size:  `), sizeObj);
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
        coerce(width) {
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
        coerce(height) {
            if (height) {
                return height;
            }
        },
    })
        .option("quality", {
        describe: "Specify the quality of the output image. valid range -> 0 to 100",
        type: "number",
        alias: ["q"],
        example: "$0 -f [files] -t [format] <--quality, -q> [quality value]",
        group: GroupOfOptions.IMAGE,
        coerce(quality) {
            if (quality) {
                return quality;
            }
        },
    })
        .help("help")
        .parseSync();
    (0, debug_1.debugArgsHandler)((0, chalk_1.green)("Passed arguments: "), argvs);
    return argvs;
};
//# sourceMappingURL=argsHandler.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const chalk_1 = require("../util/chalk");
const errorHandler_1 = __importDefault(require("../util/errorHandler"));
const isOutputValid_1 = __importDefault(require("../check/isOutputValid"));
const getFilesByFormat_1 = require("../util/getFilesByFormat");
const debug_1 = require("../util/debug");
const supportedFormats_1 = require("../util/supportedFormats");
const regexp_1 = require("../util/regexp");
const fs_1 = __importDefault(require("fs"));
const getRandomName_1 = __importDefault(require("../util/getRandomName"));
const getResolvedPath_1 = __importDefault(require("../util/getResolvedPath"));
const convert = (options) => {
    let { input, output, format, width, height, quality, compressionLevel, progressive, filename, } = options;
    const isFilenameExist = fs_1.default.existsSync(input.replace(/(\.[a-zA-Z0-9-_]+)$/i, "." + format));
    if (!!output) {
        if (isFilenameExist) {
            output =
                output +
                    "/" +
                    (0, getRandomName_1.default)({
                        format,
                        prefix: "image",
                    });
        }
        else {
            output =
                output +
                    "/" +
                    input.match(regexp_1.lastFilenameRegExp)[0].replace(/(\.\w+)$/i, "." + format);
        }
    }
    else {
        if (isFilenameExist) {
            output = (0, getResolvedPath_1.default)((0, getRandomName_1.default)({ format, prefix: "image" }));
        }
        else {
            output = (0, getResolvedPath_1.default)(input.match(regexp_1.lastFilenameRegExp)[0].split(".")[0] + "." + format);
        }
    }
    (0, debug_1.debugConvertImage)((0, chalk_1.red)("Final output: ") + (0, chalk_1.gray)(output));
    (0, sharp_1.default)(input)
        .toFormat(format, { quality, progressive, compressionLevel })
        .resize(width, height)
        .toFile(output)
        .then((info) => {
        console.log((0, chalk_1.green)("Successful! "), (0, chalk_1.gray)(`Output: ${output}\n`));
    })
        .catch((e) => {
        console.log((0, chalk_1.red)("Error: "), (0, chalk_1.gray)(e.message));
    });
};
const convertImage = (options) => {
    const { width, height, quality, inputPath, outputPath, format } = options;
    (0, errorHandler_1.default)(async () => {
        if (!supportedFormats_1.supportedInputImages.includes(format)) {
            (0, debug_1.debugConvertImage)((0, chalk_1.red)("Error: "), (0, chalk_1.gray)(`${format} is not acceptable as a output format.`));
            return;
        }
        const files = (0, getFilesByFormat_1.getFilesByFormatInSeveralDirs)({
            inputs: inputPath,
            format: "image",
        });
        if (outputPath) {
            await (0, isOutputValid_1.default)({
                output: outputPath,
            });
        }
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
        (0, debug_1.debugConvertImage)((0, chalk_1.green)("Files: "), files);
    });
};
exports.default = convertImage;
//# sourceMappingURL=image.js.map
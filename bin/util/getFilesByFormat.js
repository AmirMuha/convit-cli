"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesByFormatInSeveralDirs = exports.getFilesByFormatInOneDir = void 0;
const fs_1 = __importDefault(require("fs"));
const chalk_1 = require("./chalk");
const debug_1 = require("./debug");
const isDir_1 = __importDefault(require("../check/isDir"));
const isFileExist_1 = __importDefault(require("../check/isFileExist"));
const getFilesByFormatInOneDir = (options) => {
    let { directory, format } = options;
    console.log(directory);
    if (!directory || !format) {
        (0, debug_1.debugGetFilesByFormat)((0, chalk_1.red)("Error: "), (0, chalk_1.gray)(`Directory and Format both are required.`));
        return [];
    }
    const getCorrespondingModule = format === "image"
        ? require("../check/isImage").default
        : format === "video"
            ? require("../check/isVideo").default
            : format === "audio"
                ? require("../check/isAudio").default
                : null;
    if (!getCorrespondingModule) {
        throw new Error("Something went wrong with getting the corresponding module.");
    }
    const matchedFiles = [];
    const files = fs_1.default.readdirSync(directory);
    (0, debug_1.debugGetFilesByFormat)((0, chalk_1.yellow)(`All files in ${directory}:`), files);
    files.forEach((f) => {
        if (getCorrespondingModule(f)) {
            matchedFiles.push(`${directory}/${f}`);
            return;
        }
    });
    (0, debug_1.debugGetFilesByFormat)((0, chalk_1.green)(`Found ${matchedFiles.length}`), matchedFiles);
    return matchedFiles;
};
exports.getFilesByFormatInOneDir = getFilesByFormatInOneDir;
const getFilesByFormatInSeveralDirs = (options) => {
    const { inputs, format } = options;
    try {
        const files = [];
        const getCorrespondingModule = format === "image"
            ? require("../check/isImage").default
            : format === "video"
                ? require("../check/isVideo").default
                : format === "audio"
                    ? require("../check/isAudio").default
                    : null;
        if (!getCorrespondingModule) {
            throw new Error("Something went wrong with getting the corresponding module.");
        }
        inputs.forEach((i) => {
            if (getCorrespondingModule(i)) {
                if ((0, isFileExist_1.default)(i)) {
                    files.push(i);
                }
                else {
                    console.error((0, chalk_1.red)(`${i} file doesn't exist. Perhaps deleted before being converted.`));
                }
            }
            else if ((0, isDir_1.default)(i)) {
                files.push(...(0, exports.getFilesByFormatInOneDir)({
                    directory: i,
                    format,
                }));
            }
            else {
                console.error((0, chalk_1.red)(`Input must be either a file or directory.`));
                return;
            }
        });
        return files;
    }
    catch (e) {
        console.log((0, chalk_1.red)("Error: "), e.message);
        process.exit(1);
    }
};
exports.getFilesByFormatInSeveralDirs = getFilesByFormatInSeveralDirs;
//# sourceMappingURL=getFilesByFormat.js.map
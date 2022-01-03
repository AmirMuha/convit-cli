"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
const chalk_1 = require("./chalk");
const fs_1 = __importDefault(require("fs"));
const supportedFormats_1 = require("./supportedFormats");
const getResolvedPath_1 = __importDefault(require("./getResolvedPath"));
const inquirer_1 = __importDefault(require("inquirer"));
const inquirer_fuzzy_path_1 = __importDefault(require("inquirer-fuzzy-path"));
inquirer_1.default.registerPrompt('fuzzypath', inquirer_fuzzy_path_1.default);
exports.questions = [
    {
        name: "files",
        type: "input",
        prefix: "*",
        message: `${(0, chalk_1.red)(`Enter the files you want to manipulate ${(0, chalk_1.orange)("(required, seperate files with comma)")} \n example -> ./file.ext, ./dir: `)}`,
        filter(input) {
            const files = input.split(",");
            const resolvedFiles = [];
            if (!files[0]) {
                throw new Error("No files or directories specified.");
            }
            files.forEach((f) => {
                if (fs_1.default.existsSync((0, getResolvedPath_1.default)(f))) {
                    resolvedFiles.push((0, getResolvedPath_1.default)(f.trim()));
                }
                else {
                    throw new Error(`file "${f}" doesn't exist.`);
                }
            });
            return resolvedFiles;
        },
    },
    {
        name: "convertTo",
        type: "list",
        prefix: "*",
        message: `${(0, chalk_1.red)(`Select the format you want to convert your files into ? ${(0, chalk_1.orange)("(required)")} `)}`,
        choices: supportedFormats_1.supportedOutputImages,
    },
    {
        name: "output",
        type: "string",
        prefix: "*",
        message: `${(0, chalk_1.red)(`Enter the output path where you want to save converted file there ${(0, chalk_1.orange)("(optional, default -> current directory with the input filename)")}\n example -> ./output.ext or ./outputDir:`)} `,
        filter(input) {
            if (input && /(\.\w+|\.\w+\/*)$/i.test(input)) {
                throw new Error("Please consider passing a directory instead of a file as an output.");
            }
            if (input) {
                input = (0, getResolvedPath_1.default)(input.trim());
                return input;
            }
        },
    },
    {
        name: "width",
        type: "number",
        prefix: "*",
        message: `${(0, chalk_1.red)(`Enter the width of the output file in pixel ${(0, chalk_1.orange)("(optional)")}\nexample -> 1200:`)} `,
        filter(input) {
            return input;
        },
    },
    {
        name: "height",
        type: "number",
        prefix: "*",
        message: `${(0, chalk_1.red)(`Enter the height of the output file in pixel ${(0, chalk_1.orange)("(optional)")}\nexample -> 1200: `)}`,
        filter(input) {
            return input;
        },
    },
    {
        name: "quality",
        type: "number",
        prefix: "*",
        message: `${(0, chalk_1.red)(`Enter the quality of the output file ${(0, chalk_1.orange)("(optional, valid range -> 0 to 100)")}\nexample -> 60: `)}`,
        filter(input) {
            return input;
        },
    },
];
exports.default = async () => {
    const answers = await inquirer_1.default.prompt(exports.questions);
    return answers;
};
//# sourceMappingURL=interactiveHandler.js.map
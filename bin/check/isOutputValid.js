"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../util/debug");
const chalk_1 = require("../util/chalk");
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const getResolvedPath_1 = __importDefault(require("../util/getResolvedPath"));
exports.default = async (options) => {
    let { output, } = options;
    const isOutputPathExist = fs_1.default.existsSync(output);
    if (isOutputPathExist) {
        (0, debug_1.debugIsOutputValid)((0, chalk_1.green)(`Output is valid.`));
    }
    else {
        const answer = await inquirer_1.default.prompt([
            {
                name: "mkdir",
                type: "confirm",
                prefix: "*",
                default: "No",
                message: (0, chalk_1.red)(`Output directory doesn't exist. Want to create a new directory named ${(0, chalk_1.gray)(output)} ?${(0, chalk_1.orange)("(default -> false)")}`),
            },
        ]);
        if (answer && answer.mkdir) {
            fs_1.default.mkdirSync((0, getResolvedPath_1.default)(output));
        }
        else {
            process.exit(1);
        }
    }
};
//# sourceMappingURL=isOutputValid.js.map
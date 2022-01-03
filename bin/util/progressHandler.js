"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_progress_1 = __importDefault(require("cli-progress"));
const chalk_1 = require("./chalk");
exports.default = (total = 100) => {
    const bar = new cli_progress_1.default.MultiBar({
        align: "left",
        clearOnComplete: true,
        barsize: 30,
        stopOnComplete: true,
        format: (0, chalk_1.red)("Converting: ") +
            (0, chalk_1.red)("{bar}") +
            (0, chalk_1.red)(" {percentage}% ") +
            (0, chalk_1.red)("| {eta}s"),
    }, cli_progress_1.default.Presets.shades_classic);
    return bar;
};
//# sourceMappingURL=progressHandler.js.map
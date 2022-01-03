"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = (inputPath) => {
    let isDir = false;
    const isExist = fs_1.default.existsSync(inputPath);
    if (isExist) {
        const stats = fs_1.default.statSync(inputPath);
        if (stats.isDirectory()) {
            isDir = true;
        }
    }
    return isDir;
};
//# sourceMappingURL=isDir.js.map
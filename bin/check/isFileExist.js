"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getResolvedPath_1 = __importDefault(require("../util/getResolvedPath"));
exports.default = (inputPath) => {
    return !!fs_1.default.existsSync((0, getResolvedPath_1.default)(inputPath));
};
//# sourceMappingURL=isFileExist.js.map
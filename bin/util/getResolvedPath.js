"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = (input) => {
    return path_1.default.resolve(process.cwd(), input);
};
//# sourceMappingURL=getResolvedPath.js.map
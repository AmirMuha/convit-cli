"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugIsOutputValid = exports.debugIsImage = exports.debugIsFileExist = exports.debugIsDir = exports.debugConvertImage = exports.debugErrorHandler = exports.debugArgsHandler = exports.debugGetFilesByFormat = exports.debugIndex = void 0;
const debug_1 = __importDefault(require("debug"));
exports.debugIndex = (0, debug_1.default)("convit:index");
exports.debugGetFilesByFormat = (0, debug_1.default)("convit:util:getFilesByFormat");
exports.debugArgsHandler = (0, debug_1.default)("convit:util:argsHandler");
exports.debugErrorHandler = (0, debug_1.default)("convit:util:errorHandler");
exports.debugConvertImage = (0, debug_1.default)("convit:convert:image");
exports.debugIsDir = (0, debug_1.default)("convit:check:isDir");
exports.debugIsFileExist = (0, debug_1.default)("convit:check:isFileExist");
exports.debugIsImage = (0, debug_1.default)("convit:check:isImage");
exports.debugIsOutputValid = (0, debug_1.default)("convit:check:isOutputValid");
//# sourceMappingURL=debug.js.map
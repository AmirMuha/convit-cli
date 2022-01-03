"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionRegExp = exports.lastDirRegExp = exports.lastFilenameRegExp = exports.allFilenamesRegExp = void 0;
exports.allFilenamesRegExp = /(([^\/])+\.(\w+))/gi;
exports.lastFilenameRegExp = /(([^\/])+\.(\w+))$/gi;
exports.lastDirRegExp = /[^\/][a-zA-Z0-9_-]+[\/]?$/gi;
const extensionRegExp = (format) => {
    return new RegExp(`\.(${format})$`, "ig");
};
exports.extensionRegExp = extensionRegExp;
//# sourceMappingURL=regexp.js.map
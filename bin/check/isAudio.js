"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filenameRegEx = void 0;
exports.filenameRegEx = /\.(png|jpeg|webp|svg|gif|tiff|avif|jpg)$/i;
exports.default = (input) => {
    const filename = exports.filenameRegEx.test(input);
    if (filename) {
        return true;
    }
    return false;
};
//# sourceMappingURL=isAudio.js.map
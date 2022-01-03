"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filenameRegEx = void 0;
exports.filenameRegEx = /\.(mp4)$/i;
exports.default = (input) => {
    const filename = exports.filenameRegEx.test(input);
    if (filename) {
        return true;
    }
    return false;
};
//# sourceMappingURL=isVideo.js.map
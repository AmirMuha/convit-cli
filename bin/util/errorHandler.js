"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("./chalk");
const debug_1 = require("./debug");
exports.default = (fn) => {
    try {
        return fn();
    }
    catch (e) {
        (0, debug_1.debugErrorHandler)((0, chalk_1.red)("Error: ", e.message));
    }
};
//# sourceMappingURL=errorHandler.js.map
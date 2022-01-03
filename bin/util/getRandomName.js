"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
exports.default = (obj) => {
    return `${obj.prefix || "file"}-${(0, crypto_1.randomInt)(100000, 999999)}.${obj.format}`;
};
//# sourceMappingURL=getRandomName.js.map
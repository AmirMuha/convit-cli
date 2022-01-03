#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("./convert/image"));
const chalk_1 = require("./util/chalk");
const debug_1 = require("./util/debug");
const interactiveHandler_1 = __importDefault(require("./util/interactiveHandler"));
const argsHandler_1 = __importDefault(require("./util/argsHandler"));
const boxen_1 = __importDefault(require("boxen"));
const supportedFormats_1 = require("./util/supportedFormats");
process.on("uncaughtException", (err) => {
    (0, debug_1.debugIndex)((0, chalk_1.red)(`UNCAUGHT EXCEPTION: ${err.message} \n${(0, chalk_1.gray)(err.stack)}`));
    process.exit(1);
});
const checkIfRequiredOptionsExist = (obj) => {
    try {
        if (!obj.files && !obj.convertTo) {
            throw new Error(`Please either provide [--files | -f] and [--convert-to | --to | -t] or use the interactive mode by using interactive command.\n${(0, boxen_1.default)("- convit interactive\n- convit i\n- convit -f ./image.png -t webp\n- convit -f ./imageDir -t avif\n- convit -f ./image.png -t webp [options]", {
                title: "Examples",
                borderColor: "red",
                padding: 1,
                margin: 2
            })}\n To see all available options and commands see 'convit help | --help'`);
        }
        if (!obj.files) {
            throw new Error("Files option is required, please provide the files you intend to manipulate.");
        }
        else if (!obj.convertTo) {
            if (!obj.convertTo) {
                throw new Error("Format is required, Please provide a format.");
            }
            if (!supportedFormats_1.supportedOutputImages.includes(obj.convertTo)) {
                throw new Error("Format is not valid please try again with a valid format. You can view valid image formats by seeing --help option.");
            }
        }
    }
    catch (e) {
        console.log((0, chalk_1.red)("Error: ", (0, chalk_1.gray)(e.message)));
    }
};
(async () => {
    const args = (0, argsHandler_1.default)();
    if (args._[0] && (args._[0] === "interactive" || args._[0] === "i")) {
        const answers = await (0, interactiveHandler_1.default)();
        checkIfRequiredOptionsExist(answers);
        (0, image_1.default)(Object.assign(Object.assign(Object.assign(Object.assign({ inputPath: answers.files, format: answers.convertTo }, (answers.output ? { outputPath: answers.output } : {})), (answers.width ? { width: answers.width } : {})), (answers.height ? { height: answers.height } : {})), (answers.quality ? { quality: answers.quality } : {})));
    }
    else {
        checkIfRequiredOptionsExist(args);
        (0, image_1.default)(Object.assign(Object.assign(Object.assign(Object.assign({ inputPath: args.files, format: args.convertTo }, (args.output ? { outputPath: args.output } : {})), (args.width || args.size.width ? { width: args.width } : {})), (args.height || args.size.height ? { height: args.height } : {})), (args.quality ? { quality: args.quality } : {})));
    }
})();
process.on("unhandledRejection", (reason) => {
    (0, debug_1.debugIndex)((0, chalk_1.red)(`UNHANDLED REJECTION: ${reason}`));
    process.exit(1);
});
//# sourceMappingURL=index.js.map
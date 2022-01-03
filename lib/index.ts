#!/usr/bin/env node
import convertImage from "./convert/image"
import {red,gray } from "./util/chalk"
import {debugIndex as debug} from "./util/debug"
import interactiveHandler from "./util/interactiveHandler"
import argsHandler from "./util/argsHandler"
import boxen from "boxen"
import {supportedOutputImages} from "./util/supportedFormats"
import {SupportedImageOutput} from "./types"

process.on("uncaughtException", (err) => {
  debug(red(`UNCAUGHT EXCEPTION: ${err.message} \n${gray(err.stack)}`))
  process.exit(1)
});

const checkIfRequiredOptionsExist = (obj:any) => {
  try {
    if(!obj.files&&!obj.convertTo) {
      throw new Error(
        `Please either provide [--files | -f] and [--convert-to | --to | -t] or use the interactive mode by using interactive command.\n${boxen(
          "- convit interactive\n- convit i\n- convit -f ./image.png -t webp\n- convit -f ./imageDir -t avif\n- convit -f ./image.png -t webp [options]",
          {
            title: "Examples",
            borderColor: "red",
            padding: 1,
            margin:2
          }
        )}\n To see all available options and commands see 'convit help | --help'`
      );
    }
    if (!obj.files) {
      throw new Error(
        "Files option is required, please provide the files you intend to manipulate."
      );
    } else if (!obj.convertTo) {
      if (!obj.convertTo) {
        throw new Error("Format is required, Please provide a format.");
      }
      if (!supportedOutputImages.includes(obj.convertTo)) {
        throw new Error(
          "Format is not valid please try again with a valid format. You can view valid image formats by seeing --help option."
        );
      }
    }
  } catch (e) {
    console.log(red("Error: ", gray(e.message)));
  }
}

(async () => {
  const args = argsHandler();
  if (args._[0] && (args._[0] === "interactive" || args._[0] === "i")) {
    const answers = await interactiveHandler();
    checkIfRequiredOptionsExist(answers);
    convertImage({
      inputPath: answers.files,
      format: answers.convertTo,
      ...(answers.output?{outputPath:answers.output}:{}),
      ...(answers.width?{width:answers.width}:{}),
      ...(answers.height?{height:answers.height}:{}),
      ...(answers.quality?{quality:answers.quality}:{}),
    })
  } else {
    checkIfRequiredOptionsExist(args);
    convertImage({
      inputPath: args.files as string[],
      format: args.convertTo as SupportedImageOutput,
      ...(args.output?{outputPath:args.output}:{}),
      ...(args.width||(args.size as any).width?{width:args.width}:{}),
      ...(args.height||(args.size as any).height?{height:args.height}:{}),
      ...(args.quality?{quality:args.quality}:{}),
    })
  }
})();

process.on("unhandledRejection", (reason) => {
  debug(red(`UNHANDLED REJECTION: ${reason}`));
  process.exit(1);
});

import { red,orange } from "./chalk";
import fs from "fs"
import {supportedOutputImages} from "./supportedFormats";
import getResolvedPath from "./getResolvedPath";
import {QuestionCollection} from "inquirer"
import inquirer from "inquirer";
import inquirerFuzzyPath from "inquirer-fuzzy-path"

//------------REGISTERING INQUIRER PLUGIN
inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath);
//------------QUESTIONS
export const questions:QuestionCollection = [
    {
      name: "files",
      type: "input",
      message: `${red(
        `Enter the files you want to manipulate ${orange(
          "(required, seperate files with comma)"
        )} \n example -> ./file.ext, ./dir: `
      )}`,
      filter(input: string) {
        const files = input.split(",");
        const resolvedFiles: string[] = [];
        files.forEach((f) => {
          if(fs.existsSync(getResolvedPath(f))) {
            resolvedFiles.push(getResolvedPath(f.trim()));
          } else {
            throw new Error(`file "${f}" doesn't exist.`)
          }
        });
        return resolvedFiles;
      },
    },
    {
      name: "format",
      type: "list",
      message: `${red(
        `Select the format you want to convert your files into ? ${orange(
          "(required)"
        )} `
      )}`,
      choices: supportedOutputImages,
    },
    {
      name: "output",
      type: "string",
      message: `${red(
        `Enter the output path where you want to save converted file there ${orange(
          "(optional, default -> current directory with the input filename)"
        )}\n example -> ./output.ext or ./outputDir:`
      )} `,
      filter(input: string) {
        input = getResolvedPath(input.trim())
        return input
      },
    },
    {
      name: "width",
      type: "number",
      message: `${red(
        `Enter the width of the output file in pixel ${orange(
          "(optional)"
        )}\nexample -> 1200:`
      )} `,
      filter(input: number) {
        return input;
      },
    },
    {
      name: "height",
      type: "number",
      message: `${red(
        `Enter the height of the output file in pixel ${orange(
          "(optional)"
        )}\nexample -> 1200: `
      )}`,
      filter(input: number) {
        return input;
      },
    },
    {
      name: "quality",
      type: "number",
      message: `${red(
        `Enter the quality of the output file ${orange(
          "(optional, valid range -> 0 to 100)"
        )}\nexample -> 60: `
      )}`,
      filter(input: number) {
        return input;
      },
    },
];
// -------------SETTING UP INQUIRER
export default async () => {
  const answers = await inquirer.prompt(questions);
  return answers;
};

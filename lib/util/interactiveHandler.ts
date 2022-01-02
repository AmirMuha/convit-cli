import inquirer from "inquirer";
import { red,orange } from "./chalk";
import path from "path";
import {supportedOutputImages} from "./supportedFormats";

export const interactiveHandler = () => { 
  const answers = inquirer.prompt([
    {
      name: "files",
      type: "input",
      message: `${red(
        `Enter the files you want to manipulate ${orange("(required, seperate files with comma)")} \n example -> ./file.ext, ./dir: `
      )}`,
      filter(input: string) {
        const files = input.split(",");
        const resolvedFiles: string[] = [];
        files.forEach((f) => {
          resolvedFiles.push(path.resolve(process.cwd(),f.trim()));
        });
        return resolvedFiles;
      },
    },
    {
      name: "format",
      type: "list",
      message: `${red(
        `Select the format you want to convert your files into ? ${orange("(required)")} `
      )}`,
      choices: supportedOutputImages,
    },
    {
      name: "width",
      type: "number",
      message: `${red(`Enter the width of the output file in pixel ${orange("(optional)")}\nexample -> 1200:`)} `,
      filter(input:number) {
        return input
      }
    },
    {
      name: "height",
      type: "number",
      message: `${red(`Enter the height of the output file in pixel ${orange("(optional)")}\nexample -> 1200: `)}`,
      filter(input:number) {
        return input
      }
    },{
      name: "quality",
      type: "number",
      message: `${red(`Enter the quality of the output file ${orange("(optional, valid range -> 0 to 100)")}\nexample -> 60: `)}`,
      filter(input:number) {
        return input
      }
    }
  ]);
  return answers
}

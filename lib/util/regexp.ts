import {AllFileTypes} from "../types";

export const allFilenamesRegExp = /(([^\/])+\.(\w+))/gi;
export const lastFilenameRegExp = /(([^\/])+\.(\w+))$/gi;
export const lastDirRegExp = /([^\/]+[\/]?)$/gi;
export const extensionRegExp = (format: AllFileTypes) => {
  return new RegExp(`\.(${format})$`,"ig")
}

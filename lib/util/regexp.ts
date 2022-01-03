import {AllFileTypes} from "../types";

export const allFilenamesRegExp = /(([^\/])+\.(\w+))/gi;
export const lastFilenameRegExp = /(([^\/])+\.(\w+))$/gi;
export const lastDirRegExp = /[^\/][a-zA-Z0-9_-]+[\/]?$/gi;
export const extensionRegExp = (format: AllFileTypes) => {
  return new RegExp(`\.(${format})$`,"ig")
}

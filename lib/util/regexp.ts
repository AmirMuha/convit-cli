import {AllFileTypes} from "../types";

export const getFilename = /(([^\/])+\.(\w+))/g;

export const getExtension = (format: AllFileTypes) => {
  return new RegExp(`\.(${format})$`,"ig")
}


import debug from "debug"

//--------------Index.ts
export const debugIndex = debug("convit:index");
//--------------UTIL
export const debugGetFilesByFormat = debug("convit:util:getFilesByFormat")
export const debugArgsHandler = debug("convit:util:argsHandler")
export const debugErrorHandler = debug("convit:util:errorHandler")
//--------------CONVERT
export const debugConvertImage = debug("convit:convert:image")
//--------------CHECK
export const debugIsDir = debug("convit:check:isDir")
export const debugIsFileExist = debug("convit:check:isFileExist")
export const debugIsImage = debug("convit:check:isImage")
export const debugIsOutputValid = debug("convit:check:isOutputValid")

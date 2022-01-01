import {getFilename} from "../util/regexp"
const isOneFileInURL = (url:string) => {
  return url.match(getFilename)
}
export default isOneFileInURL;

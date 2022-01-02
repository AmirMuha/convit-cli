import {red} from "./chalk"
import {debugErrorHandler as debug} from "./debug"
export default (fn: (...args: any[]) => void):any => {
  try {
    return fn()
  } catch(e) {
    debug(red("Error: ",e.message))
  }
}

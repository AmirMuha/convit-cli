import {red} from "./chalk"
export default (fn: (...args: any[]) => void):any => {
  try {
    return fn()
  } catch(e) {
    console.log(red("ERROR: ",e.message))
  }
}

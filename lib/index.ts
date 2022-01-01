import {red,gray } from "./util/chalk"
import {debugIndex as debug} from "./util/debug"

process.on("uncaughtException", (err) => {
  debug(red(`UNCAUGHT EXCEPTION: ${err.message} \n${gray(err.stack)}`))
  process.exit(1)
})


process.on("unhandledRejection", (reason) => {
  debug(red(`UNHANDLED REJECTION: ${reason}`))
  process.exit(1)
})

import {randomInt} from "crypto"
export default (obj: { format: string; prefix?: string }) => {
  return `${obj.prefix||"file"}-${randomInt(100000, 999999)}.${obj.format}`;
};

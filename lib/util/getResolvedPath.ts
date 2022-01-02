import path from "path"

export default (input: string) => {
  return path.resolve(process.cwd(), input);
};

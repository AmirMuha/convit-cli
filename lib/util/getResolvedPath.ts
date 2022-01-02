import path from "path"

export const getResolvePath = (input: string) => {
  return path.resolve(process.cwd(), input);
};

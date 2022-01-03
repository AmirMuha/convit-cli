import { SupportedImageOutput } from "../types";
declare const convertImage: (options: {
    inputPath: string[];
    format: SupportedImageOutput;
    quality?: number;
    width?: number;
    height?: number;
    outputPath?: string;
}) => void;
export default convertImage;

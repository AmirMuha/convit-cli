export declare const getFilesByFormatInOneDir: (options: {
    directory: string;
    format: "image" | "video" | "audio";
}) => string[];
export declare const getFilesByFormatInSeveralDirs: (options: {
    inputs: string[];
    format: "image" | "video" | "audio";
}) => string[];

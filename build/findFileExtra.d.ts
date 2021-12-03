export interface findFileExtraFileInfo {
    fullPath: string;
    pathFromRoot: string;
    fileName: string;
    dirFullPath: string;
    dirPathFromRoot: string;
    ext: string;
    json?: string;
    content?: string;
}
export declare const findFileExtra: (opt: {
    root: string;
    filePattern?: string;
    ignoreFilePattern?: string[];
    fileContentPattern?: RegExp | string;
    loadFileContent?: boolean;
    parseJson?: boolean;
    dot?: boolean;
    nocase?: boolean;
}) => Promise<findFileExtraFileInfo[]>;

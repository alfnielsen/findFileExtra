export interface findFileExtraFileInfo {
    fullPath: string;
    pathFromRoot: string;
    fileName: string;
    dirFullPath: string;
    dirPathFromRoot: string;
    ext: string;
    json?: unknown;
    content?: string;
}
declare const findFilesExtra: (opt: {
    root: string;
    filePattern?: string;
    ignoreFilePattern?: string[];
    fileContentPattern?: RegExp | string;
    loadFileContent?: boolean;
    parseJson?: boolean;
    dot?: boolean;
    nocase?: boolean;
}) => Promise<findFileExtraFileInfo[]>;
export default findFilesExtra;

export interface IFindFileExtraFileInfo {
    fullPath: string;
    pathFromRoot: string;
    fileName: string;
    dirFullPath: string;
    dirPathFromRoot: string;
    ext: string;
    json?: unknown;
    content?: string;
}
export interface IFindFilesExtraOptions {
    root: string;
    filePattern?: string;
    ignoreFilePattern?: string[];
    fileContentPattern?: RegExp | string;
    loadFileContent?: boolean;
    parseJson?: boolean;
    dot?: boolean;
    nocase?: boolean;
}
declare const findFilesExtra: (opt: IFindFilesExtraOptions) => Promise<IFindFileExtraFileInfo[]>;
export default findFilesExtra;

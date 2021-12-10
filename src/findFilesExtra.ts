import fs from "fs-extra";
import path from "path";
import glob from "glob-promise";

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

const findFilesExtra = async (opt: IFindFilesExtraOptions) => {
  let {
    root,
    filePattern = "**/*.*",
    ignoreFilePattern = ["**/bin/**", "**/node_modules/**", "**/obj/**"],
    fileContentPattern,
    loadFileContent = false,
    parseJson = false,
    dot = true,
    nocase = true,
  } = opt;

  if (!loadFileContent && parseJson) {
    throw new Error("findFileExtra: parseJson is only available when loadFileContent is true");
  }

  let fileNames = await glob(filePattern, {
    ignore: ignoreFilePattern,
    cwd: root,
    nocase,
    dot,
  });

  const files: IFindFileExtraFileInfo[] = [];

  for (const pathFromRoot of fileNames) {
    const fullPath = path.join(root, pathFromRoot);
    const fileName = path.basename(fullPath);
    const dirFullPath = path.dirname(fullPath);
    const dirPathFromRoot = path.dirname(pathFromRoot);
    const ext = path.extname(fullPath);
    let content: string | undefined;
    let json: unknown | undefined = undefined;

    if (fileContentPattern || loadFileContent) {
      content = await fs.readFile(fullPath, "utf8");
      if (fileContentPattern) {
        if (fileContentPattern instanceof RegExp && !fileContentPattern.test(content)) {
          continue;
        } else if (typeof fileContentPattern === "string" && content.indexOf(fileContentPattern) === -1) {
          continue;
        }
      }
    }

    if (!loadFileContent) {
      content = undefined;
    }

    if (content && parseJson && ext === ".json") {
      json = JSON.parse(content);
    }

    files.push({
      fullPath,
      pathFromRoot,
      dirPathFromRoot,
      fileName,
      dirFullPath,
      ext: ext,
      json: json,
      content: loadFileContent ? content : undefined,
    });
  }

  return files;
};

export default findFilesExtra;

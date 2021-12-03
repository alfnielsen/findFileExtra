import fs from "fs-extra";
import path from "path";
import glob from "glob-promise";

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

export const findFileExtra = async (opt: {
  rootFolderPath: string;
  filePattern: string;
  ignoreFilePattern: string[];
  fileContentPattern?: RegExp;
  loadFileContent?: boolean;
  parseJson?: boolean;
  dot?: boolean;
  nocase?: boolean;
}) => {
  let {
    rootFolderPath,
    filePattern = "**/*",
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
    cwd: rootFolderPath,
    nocase,
    dot,
  });

  const files: findFileExtraFileInfo[] = [];

  for (const pathFromRoot of fileNames) {
    if (fileContentPattern || loadFileContent) {
      const fullPath = path.join(rootFolderPath, pathFromRoot);
      const fileName = path.basename(fullPath);
      const dirFullPath = path.dirname(fullPath);
      const dirPathFromRoot = path.dirname(pathFromRoot);
      const ext = path.extname(fileNames[0]);
      const content = await fs.readFile(fileNames[0], "utf8");
      if (fileContentPattern && !fileContentPattern.test(content)) {
        continue;
      }
      files.push({
        fullPath,
        pathFromRoot,
        dirPathFromRoot,
        fileName,
        dirFullPath,
        ext: ext,
        json: parseJson && ext === "json" ? JSON.parse(content) : undefined,
        content: loadFileContent ? content : undefined,
      });
    } else {
      const fullPath = path.join(rootFolderPath, pathFromRoot);
      const fileName = path.basename(fullPath);
      const dirFullPath = path.dirname(fullPath);
      const dirPathFromRoot = path.dirname(pathFromRoot);
      const ext = path.extname(fileNames[0]);
      files.push({
        fullPath,
        pathFromRoot,
        dirPathFromRoot,
        fileName,
        dirFullPath,
        ext: ext,
        json: undefined,
        content: undefined,
      });
    }
  }

  return files;
};

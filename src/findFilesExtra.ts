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

const findFilesExtra = async (opt: {
  root: string;
  filePattern?: string;
  ignoreFilePattern?: string[];
  fileContentPattern?: RegExp | string;
  loadFileContent?: boolean;
  parseJson?: boolean;
  dot?: boolean;
  nocase?: boolean;
}) => {
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

  const files: findFileExtraFileInfo[] = [];

  for (const pathFromRoot of fileNames) {
    if (fileContentPattern || loadFileContent) {
      const fullPath = path.join(root, pathFromRoot);
      const fileName = path.basename(fullPath);
      const dirFullPath = path.dirname(fullPath);
      const dirPathFromRoot = path.dirname(pathFromRoot);
      const ext = path.extname(fullPath);
      const content = await fs.readFile(fullPath, "utf8");
      const json = parseJson && ext === ".json" ? JSON.parse(content) : undefined;
      if (fileContentPattern) {
        if (fileContentPattern instanceof RegExp && !fileContentPattern.test(content)) {
          continue;
        } else if (typeof fileContentPattern === "string" && content.indexOf(fileContentPattern) === -1) {
          continue;
        }
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
    } else {
      const fullPath = path.join(root, pathFromRoot);
      const fileName = path.basename(fullPath);
      const dirFullPath = path.dirname(fullPath);
      const dirPathFromRoot = path.dirname(pathFromRoot);
      const ext = path.extname(fullPath);
      let content: string | undefined = undefined;
      let json: any | undefined = undefined;
      if (loadFileContent) {
        content = await fs.readFile(fullPath, "utf8");
        if (parseJson && ext === ".json") {
          json = JSON.parse(content);
        }
      }

      files.push({
        fullPath,
        pathFromRoot,
        dirPathFromRoot,
        fileName,
        dirFullPath,
        ext: ext,
        json: json,
        content: content,
      });
    }
  }

  return files;
};

export default findFilesExtra;

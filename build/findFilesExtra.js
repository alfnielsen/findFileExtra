"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const glob_promise_1 = __importDefault(require("glob-promise"));
const findFilesExtra = async (opt) => {
    let { root, filePattern = "**/*.*", ignoreFilePattern = ["**/bin/**", "**/node_modules/**", "**/obj/**"], fileContentPattern, loadFileContent = false, parseJson = false, dot = true, nocase = true, } = opt;
    if (!loadFileContent && parseJson) {
        throw new Error("findFileExtra: parseJson is only available when loadFileContent is true");
    }
    let fileNames = await (0, glob_promise_1.default)(filePattern, {
        ignore: ignoreFilePattern,
        cwd: root,
        nocase,
        dot,
    });
    const files = [];
    for (const pathFromRoot of fileNames) {
        const fullPath = path_1.default.join(root, pathFromRoot);
        const fileName = path_1.default.basename(fullPath);
        const dirFullPath = path_1.default.dirname(fullPath);
        const dirPathFromRoot = path_1.default.dirname(pathFromRoot);
        const ext = path_1.default.extname(fullPath);
        let content;
        let json = undefined;
        if (fileContentPattern || loadFileContent) {
            content = await fs_extra_1.default.readFile(fullPath, "utf8");
            if (fileContentPattern) {
                if (fileContentPattern instanceof RegExp && !fileContentPattern.test(content)) {
                    continue;
                }
                else if (typeof fileContentPattern === "string" && content.indexOf(fileContentPattern) === -1) {
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
exports.default = findFilesExtra;

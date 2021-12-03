import path from "path";
import chalk from "chalk";
import findFilesExtra from "../src/findFilesExtra";

const testFileFolder = path.join(__dirname, "test-search-files");

console.log(`Test files are placed in ${testFileFolder}`);

describe("find files", () => {
  it("should find files (without content search) (without content)", async () => {
    let jsonFiles = await findFilesExtra({
      root: testFileFolder,
      filePattern: "**/*.json",
    });
    expect(jsonFiles.length).toEqual(2);

    // sort by name
    jsonFiles = jsonFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));

    // ext
    expect(jsonFiles[0].ext).toBe(".json");
    expect(jsonFiles[1].ext).toBe(".json");
    // dir paths:
    let expectedDirPath1 = ".";
    let expectedDirPath2 = "model2";
    console.log(jsonFiles[0].fileName);
    expect(jsonFiles[0].dirPathFromRoot).toBe(expectedDirPath1);
    expect(jsonFiles[1].dirPathFromRoot).toBe(expectedDirPath2);
    // full dir paths:
    let expectedDirFullPath1 = testFileFolder;
    let expectedDirFullPath2 = path.join(testFileFolder, "model2");
    expect(jsonFiles[0].dirFullPath).toBe(expectedDirFullPath1);
    expect(jsonFiles[1].dirFullPath).toBe(expectedDirFullPath2);
    // path from root:
    let expectedPathFromRoot1 = "test-search-file-1.json";
    let expectedPathFromRoot2 = path.join("model2", "test-search-file-2.json");
    expect(jsonFiles[0].pathFromRoot).toBe(expectedPathFromRoot1);
    expect(jsonFiles[1].pathFromRoot).toBe(expectedPathFromRoot2);
    // full path:
    let expectedFullPath1 = path.join(testFileFolder, "test-search-file-1.json");
    let expectedFullPath2 = path.join(testFileFolder, "model2", "test-search-file-2.json");
    expect(jsonFiles[0].fullPath).toBe(expectedFullPath1);
    expect(jsonFiles[1].fullPath).toBe(expectedFullPath2);
    // content (undefined):
    expect(jsonFiles[0].content).toBeUndefined();
    expect(jsonFiles[1].content).toBeUndefined();
    // json (undefined):
    expect(jsonFiles[0].json).toBeUndefined();
    expect(jsonFiles[1].json).toBeUndefined();
    // fileName:
    let expectedFileName1 = "test-search-file-1.json";
    let expectedFileName2 = "test-search-file-2.json";
    expect(jsonFiles[0].fileName).toBe(expectedFileName1);
    expect(jsonFiles[1].fileName).toBe(expectedFileName2);
  });

  it("should find files (without content search) (with content)", async () => {
    let jsonFiles = await findFilesExtra({
      root: testFileFolder,
      filePattern: "**/*.json",
      loadFileContent: true,
    });
    expect(jsonFiles.length).toEqual(2);
    // sort by name
    jsonFiles = jsonFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));

    expect(jsonFiles[0].content).not.toBeUndefined();
    expect(jsonFiles[1].content).not.toBeUndefined();
  });

  it("should find files (without content search) (with content) (with json)", async () => {
    let jsonFiles = await findFilesExtra({
      root: testFileFolder,
      filePattern: "**/*.json",
      loadFileContent: true,
      parseJson: true,
    });
    expect(jsonFiles.length).toEqual(2);
    // sort by name
    jsonFiles = jsonFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));

    expect(jsonFiles[0].content).not.toBeUndefined();
    expect(jsonFiles[1].content).not.toBeUndefined();
    expect(jsonFiles[0].json).not.toBeUndefined();
    expect(jsonFiles[1].json).not.toBeUndefined();
  });

  // File search

  it("should find files (with content search as string) (with content) (with json)", async () => {
    let jsonFiles = await findFilesExtra({
      root: testFileFolder,
      fileContentPattern: "search-me",
    });
    expect(jsonFiles.length).toEqual(3);
    // sort by name
    jsonFiles = jsonFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));
    expect(jsonFiles[0].ext).toBe(".js");
    expect(jsonFiles[1].ext).toBe(".json");
    expect(jsonFiles[2].ext).toBe(".json");
  });

  it("should find files (with content search as string) (with content) (with json)", async () => {
    let jsonFiles = await findFilesExtra({
      root: testFileFolder,
      fileContentPattern: /search\-me|searchMe/,
    });
    expect(jsonFiles.length).toEqual(4);
    // sort by name
    jsonFiles = jsonFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));
    expect(jsonFiles[0].ext).toBe(".js");
    expect(jsonFiles[1].ext).toBe(".json");
    expect(jsonFiles[2].ext).toBe(".js");
    expect(jsonFiles[3].ext).toBe(".json");
  });
});

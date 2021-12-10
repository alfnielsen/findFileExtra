Simple (with advanced feature) file search

## Examples

```ts
// Find all json files (Loading content + parse to json)
let jsonFiles = await findFileExtra({
  root: MY_PROJECT_ROOT,
  filePattern: "**/*.json",
  loadFileContent: true,
  parseJson: true,
});

// Find all ts files with 'search-me' in content (Not loading content)
let files = await findFileExtra({
  root: MY_PROJECT_ROOT,
  filePattern: "**/*.ts",
  fileContentPattern: "search-me",
});

// Find all ts files with content that match regexp (Loading content)
let files = await findFileExtra({
  root: MY_PROJECT_ROOT,
  filePattern: "**/*.ts",
  fileContentPattern: /search\-me|searchMe/,
  loadFileContent: true,
});
```

## Result

The result is list of `findFileExtraFileInfo` _(interface)_

```ts
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
```

## Options

| Option             | Required | Type            | Default                                            | Description                                                                                    |
| ------------------ | -------- | --------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| root               | true     | string          | -                                                  | Root directory to search in.                                                                   |
| filePattern        | false    | string          | `"**/*.*"`                                         | File pattern to search for. [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) |
| ignoreFilePattern  | false    | string[]        | `["**/bin/**", "**/node_modules/**", "**/obj/**"]` | File pattern to ignore. [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>)     |
| fileContentPattern | false    | regexp / string | undefined                                          | File content pattern to search for.                                                            |
| loadFileContent    | false    | boolean         | false                                              | Load file content.                                                                             |
| parseJson          | false    | boolean         | false                                              | Parse file content to json.                                                                    |
| dot                | false    | boolean         | true                                               | Use dot notation for json keys.                                                                |
| nocase             | false    | boolean         | true                                               | Case insensitive search.                                                                       |

> `parseJson` requires `loadFileContent` to be true.

> if `filePattern` and `fileContentPattern` is both `undefined` (not set) all files will be found in the root.

## Installation

> - npm install find-files-extra

> - yarn add find-files-extra

Simple (with advanced feature) file search

## Examples

**File name search**

```ts
// Find all json files (and load content + parse to json)
let jsonFiles = await findFileExtra({
  root: MY_PROJECT_ROOT,
  filePattern: "**/*.json",
  loadFileContent: true,
  parseJson: true,
});
```

**File name and content search**

```ts
// Find all json files (and load content + parse to json)
let files = await findFileExtra({
  root: MY_PROJECT_ROOT,
  filePattern: "**/*.ts",
  fileContentPattern: "search-me",
  loadFileContent: true,
});
```

**File name and content search (regexp)**

```ts
// Find all json files (and load content + parse to json)
let files = await findFileExtra({
  root: MY_PROJECT_ROOT,
  filePattern: "**/*.ts",
  fileContentPattern: /search\-me|searchMe/,
  loadFileContent: true,
});
```

## Options

| Option             | Required | Type            | Default   | Description                                                                                  |
| ------------------ | -------- | --------------- | --------- | -------------------------------------------------------------------------------------------- |
| root               | true     | string          | -         | Root directory to search in.                                                                 |
| filePattern        | false    | string          | undefined | File pattern to search for. (glob pattern)[https://en.wikipedia.org/wiki/Glob_(programming)] |
| ignoreFilePattern  | false    | string          | undefined | File pattern to ignore. (glob pattern)[https://en.wikipedia.org/wiki/Glob_(programming)]     |
| fileContentPattern | false    | regexp / string | undefined | File content pattern to search for.                                                          |
| loadFileContent    | false    | boolean         | false     | Load file content.                                                                           |
| parseJson          | false    | boolean         | false     | Parse file content to json.                                                                  |
| dot                | false    | boolean         | true      | Use dot notation for json keys.                                                              |
| nocase             | false    | boolean         | true      | Case insensitive search.                                                                     |

> `parseJson` requires `loadFileContent` to be true.

> if `filePattern` and `fileContentPattern` is both `undefined` (not set) all files will found.

## Installation

> - npm install find-files-extra

> - yarn add find-files-extra

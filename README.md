# remark-auto-import

A remark plugin for automatically importing components in MDX.

# Usage

This plugin searches directories for component files and then automatically generates default imports for them during your MDX build.
This means that your content editors can freely and and remove components in MDX without worrying about keeping imports up to date.

To use the plugin provide it to your MDX engine's `remarkPlugins` array and provide an options object containg a list of directories to search and a glob pattern of files to import.

## Options

```typescript
type Options = {
  directories: Array<string>;
  patterns: Array<string>;
  name?: (path: string): string;

  additionals: Array<{
    importPath: string;
    defaultImport: string;
    namedImports: Array<{ name: string; alias?: string }>;
  }>;
};
```

`directories`: An array of directory names to search for files to import.

`patterns`: An array of [fast-glob](https://www.npmjs.com/package/fast-glob) patterns for which files to import.

`name`: An optional function which takes the absolute path of a file to be imported and returns the identifier for that files default import. By default the file name is used, e.g `/path/to/Component.jsx` is imported as `Component`, and the generated import would be `import Component from "/path/to/Component.jsx"`.

`additional`: An array of objects that specify additional fixed imports:

- `importPath`: The path to the file to be imported. This will be inserted as-is so it's recommend to use package names or absolute paths.
- `defaultImport`: The identifier that will be used for the default import.

- `namedImports`: An array of objects specifying named imports:

  - `name`: The idenifier of the item to import
  - `alias`: An optional identifier to alias the import to with `as`.

So, an additional import with the structure `{ importPath: "package", defaultImport: "default", namedImports: [{name: "named", alias: 'alias'}]}` would be imported as `import default, {named as alias} from "package"`.

This can also be used for imports with only side effects, such as CSS files, by not specifying any default or named imports, i.e `{ importPath: "/path/to/styles.css" }`.

# Configuration Examples

## Astro

```javascript
//astro.config.mjs

import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import remarkAutoImport from "@cloudcannon/remark-auto-import";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [
      [
        remarkAutoImport,
        {
          directories: ["src/components"],
          patterns: ["*.*"],
        },
      ],
    ],
    extendDefaultPlugins: true,
  },
});
```

## Next.js

```javascript
//next.config.mjs

import remarkFrontmatter from "remark-frontmatter";
import remarkAutoImport from "@cloudcannon/remark-auto-import";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [
        remarkAutoImport,
        {
          directories: ["components"],
          patterns: ["*.js"],
        },
      ],
    ],
  },
});

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
```

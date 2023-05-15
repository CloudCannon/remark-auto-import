import fg from "fast-glob";
import { join } from "path";
import { defaultImportSpecifier, importStatement, namedImportSpecifier } from "./helpers/tree-helper.js";

export default (options) => {
  return (tree, file) => {
    if (!options || !options.patterns || !options.directories) {
      console.warn('[remark-auto-import] Invalid configuration skipping')
      return tree;
    }

    if(!file.history.find((name) => name.endsWith('.mdx'))){
      if(options.debug && file.history.length > 0){
        console.log(`[remark-auto-import] Skipping ${file.history[0]}: File is not MDX`)
      }
      return tree;
    }

    if(options.debug && file.history.length > 0){
      console.log(`[remark-auto-import] Processing ${file.history[0]}...`)
    }

    const seen = {};

    options.directories?.forEach((dir) => {
      fg.sync(options.patterns, {
        cwd: join(process.cwd(), dir),
        absolute: true,
      }).forEach((path) => {
        let name;
        if (!options.name) {
          const nameMatch = path.match(/(^|\/)(?<name>[^.\/]*)(\.[^\/]*)?$/);
          name = nameMatch?.groups?.name;
        } else {
          try{
            name = options.name(path);
          } catch (err){
            console.warn(`[remark-auto-import] ${path}: Error getting name, skipping file: ${err}`)
            return;
          }
        }

        if (!name) {
          console.warn(path+': Failed to get name, skipping file')
          return;
        }

        if (seen[name]){
          console.warn(`[remark-auto-import] ${file.history[0]}: Skipping import of ${path}: "${seen[name]}" already imported with name ${name}`)
          return;
        }

        seen[name] = path;

        if(options.debug){
          console.log(`[remark-auto-import] ${file.history[0]}: Added import of ${path}: "${name}"`)
        }

        tree.children.unshift(importStatement(path, [defaultImportSpecifier(name)]));
      });
    });

    options.additionals?.forEach((additional) => {
      if (additional.tree) {
        tree.children.unshift(additional.tree);
      } else if (additional.importPath) {
        let specifiers = [];

        if (additional.defaultImport) {
          specifiers.push(defaultImportSpecifier(additional.defaultImport));
        }

        if (additional.namedImports) {
          specifiers.push(
            ...additional.namedImports.map(({ name, alias }) => namedImportSpecifier(name, alias))
          );
        }

        tree.children.unshift(importStatement(additional.importPath, specifiers));
      }
    });
    return tree;
  };
};

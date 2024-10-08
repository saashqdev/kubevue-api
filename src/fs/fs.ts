import * as fs from 'fs-extra';
import * as path from 'path';
import * as babel from '@babel/core';
import * as globby from 'globby';

import { kebab2Camel, Camel2kebab, normalizeName } from '../utils';
import { VueFile, Library, VueFileExtendMode, JSFile } from '.';

export class FileExistsError extends Error {
    constructor(fullPath: string) {
        super(fullPath);
        this.name = 'FileExistsError';
        this.message = `The file "${fullPath}" already exists! `;
    }
}

export function handleSame(dir: string, baseName: string = 'u-sample') {
    let dest = path.resolve(dir, `${baseName}.vue`);

    if (fs.existsSync(dest))
        throw new FileExistsError(dest);

    return dest;
}

export type Replacer = [RegExp, string];
export async function batchReplace(src: string | Array<string>, replacers: Array<Replacer>) {
    if (typeof src === 'string')
        src = [src];
    return Promise.all(src.map((fullPath) =>
        fs.readFile(fullPath, 'utf8').then((content) => {
            replacers.forEach((replacer) => content = content.replace(...replacer));
            return fs.writeFile(fullPath, content);
        })
    ));
}

export interface ListFilesFilters {
    type?: string, // both, file, directory
    dot?: boolean,
    patterns?: Array<string>,
    includes?: string | RegExp | Array<string | RegExp>,
    excludes?: string | RegExp | Array<string | RegExp>,
    filters?: ((fullPath: string) => boolean) | Array<(fullPath: string) => boolean>,
};

export function listFiles(dir: string = '', filters: ListFilesFilters = {}, recursive: boolean = false) {
    dir = dir.replace(/\\/g, '/');
    const pattern = recursive ? '**' : '*';
    // globby only supports /
    return globby.sync([dir ? dir + '/' + pattern : pattern].concat(filters.patterns || []), {
        dot: filters.dot,
        onlyFiles: false,
    }).filter((filePath) => {
        if (filters.type) {
            const stat = fs.statSync(filePath);
            if (filters.type === 'file' && !stat.isFile())
                return false;
            if (filters.type === 'directory' && !stat.isDirectory())
                return false;
            if (filters.type === 'link' && !stat.isSymbolicLink())
                return false;
        }
        if (filters.includes) {
            if (!Array.isArray(filters.includes))
                filters.includes = [filters.includes];
            if (!filters.includes.every((include) => {
                if (typeof include === 'string')
                    return filePath.includes(include);
                else
                    return include.test(filePath);
            })) return false;
        }
        if (filters.excludes) {
            if (!Array.isArray(filters.excludes))
                filters.excludes = [filters.excludes];
            if (filters.excludes.some((exclude) => {
                if (typeof exclude === 'string')
                    return filePath.includes(exclude);
                else
                    return exclude.test(filePath);
            })) return false;
        }
        if (filters.filters) {
            if (!Array.isArray(filters.filters))
                filters.filters = [filters.filters];
            if (!filters.filters.every((filter) => filter(filePath)))
                return false;
        }
        return true;
    });
}

export function listAllFiles(dir?: string, filters: ListFilesFilters = {}) {
    return listFiles(dir, filters, true);
}

/* The following code is a bit redundant due to copy-pasting, but the functions of each part may be different in the future, so I will not integrate it yet*/

export async function createDirectory(dir: string, dirName: string) {
    const dest = path.resolve(dir, dirName);
    if (fs.existsSync(dest))
        throw new FileExistsError(dest);

    await fs.mkdir(dest);
    return dest;
}

export async function moveFileToTrash(fullPath: string) {
    // @TODO: Windows, Linux
    const fileName = path.basename(fullPath);
    let dest = path.resolve(process.env.HOME, '.Trash', fileName);
    if (fs.existsSync(dest)) {
        const date = new Date();
        dest = dest.replace(/(\.[a-zA-Z]+$|$)/, `.${date.toTimeString().split(' ')[0].replace(/:/g, '-')}-${date.getMilliseconds()}$1`);
    }
    await fs.move(fullPath, dest);
    return dest;
}

export async function deleteFile(fullPath: string) {
    // @TODO: Windows, Linux
    await fs.remove(fullPath);
}

export async function rename(fullPath: string, newName: string) {
    const dest = path.join(path.dirname(fullPath), newName);
    if (dest === fullPath)
        return dest;

    if (fs.existsSync(dest))
        throw new FileExistsError(dest);

    await fs.move(fullPath, dest);
    return dest;
}

export async function createSingleFile(dir: string, componentName?: string) {
    const normalized = normalizeName(componentName);
    const dest = handleSame(dir, normalized.baseName);
    await fs.copy(path.resolve(__dirname, '../../templates/u-single-file.vue'), dest);

    if (normalized.baseName !== 'u-sample') {
        await batchReplace(dest, [
            [/u-sample/g, normalized.baseName],
            [/USample/g, normalized.componentName],
        ]);
    }
    return dest;
}

export async function createMultiFile(dir: string, componentName?: string) {
    const normalized = normalizeName(componentName);
    const dest = handleSame(dir, normalized.baseName);
    await fs.copy(path.resolve(__dirname, '../../templates/u-multi-file.vue'), dest);

    if (normalized.baseName !== 'u-sample') {
        await batchReplace([
            path.join(dest, 'index.js'),
            path.join(dest, 'README.md'),
        ], [
            [/u-sample/g, normalized.baseName],
            [/USample/g, normalized.componentName],
        ]);
    }
    return dest;
}

/**
 * @deprecated
 **/
export async function createMultiFileWithSubdocs(dir: string, componentName?: string) {
    const normalized = normalizeName(componentName);
    const dest = handleSame(dir, normalized.baseName);
    await fs.copy(path.resolve(__dirname, '../../templates/u-multi-file-with-subdocs.vue'), dest);

    if (normalized.baseName !== 'u-sample') {
        await batchReplace([
            path.join(dest, 'index.js'),
            path.join(dest, 'docs/api.md'),
            path.join(dest, 'docs/examples.md'),
        ], [
            [/u-sample/g, normalized.baseName],
            [/USample/g, normalized.componentName],
        ]);
    }
    return dest;
}

/**
 * @deprecated
 **/
export async function createMultiFileWithScreenshots(dir: string, componentName?: string) {
    const normalized = normalizeName(componentName);
    const dest = handleSame(dir, normalized.baseName);
    await fs.copy(path.resolve(__dirname, '../../templates/u-multi-file-with-screenshots.vue'), dest);

    if (normalized.baseName !== 'u-sample') {
        await batchReplace([
            path.join(dest, 'index.js'),
            path.join(dest, 'README.md'),
        ], [
            [/u-sample/g, normalized.baseName],
            [/USample/g, normalized.componentName],
        ]);
    }
    return dest;
}

/**
 * @deprecated
 **/
export async function createMultiFilePackage(dir: string, componentName?: string) {
    const normalized = normalizeName(componentName);
    const dest = handleSame(dir, normalized.baseName);
    await fs.copy(path.resolve(__dirname, '../../templates/u-multi-file-package.vue'), dest);

    if (normalized.baseName !== 'u-sample') {
        await batchReplace([
            path.join(dest, 'index.js'),
            path.join(dest, 'README.md'),
            path.join(dest, 'package.json'),
        ], [
            [/u-sample/g, normalized.baseName],
            [/USample/g, normalized.componentName],
        ]);
    }
    return dest;
}

export async function addModuleCSS(vuePath: string) {
    if (!fs.statSync(vuePath).isDirectory())
        throw new Error('Unsupport adding functional block in single vue file!');

    const dest = path.resolve(vuePath, 'module.css');
    if (fs.existsSync(dest))
        throw new Error('File module.css exists!');

    await fs.copy(path.resolve(__dirname, '../../templates/u-fully-functional.vue/module.css'), dest);
    return dest;
}

export async function addAPI(vuePath: string) {
    if (!fs.statSync(vuePath).isDirectory())
        throw new Error('Unsupport adding functional block in single vue file!');

    const dest = path.resolve(vuePath, 'api.yaml');
    if (fs.existsSync(dest))
        throw new Error('File api.yaml exists!');

    await fs.copy(path.resolve(__dirname, '../../templates/u-fully-functional.vue/api.yaml'), dest);

    const baseName = path.basename(vuePath, path.extname(vuePath));
    const componentName = kebab2Camel(baseName);
    await batchReplace(dest, [
        [/u-sample/g, baseName],
        [/USample/g, componentName],
    ]);
    return dest;
}

export async function addDocs(vuePath: string) {
    if (!fs.statSync(vuePath).isDirectory())
        throw new Error('Unsupport adding functional block in single vue file!');

    const dest = path.resolve(vuePath, 'docs');
    if (fs.existsSync(dest))
        throw new FileExistsError('Directory docs exists!');

    await fs.copy(path.resolve(__dirname, '../../templates/u-fully-functional.vue/docs'), dest);

    const baseName = path.basename(vuePath, path.extname(vuePath));
    const componentName = kebab2Camel(baseName);
    await batchReplace(listAllFiles(dest), [
        [/u-sample/g, baseName],
        [/USample/g, componentName],
    ]);
    return dest;
}

export async function addPackage(vuePath: string) {
    if (!fs.statSync(vuePath).isDirectory())
        throw new Error('Unsupport adding functional block in single vue file!');

    const dest = path.resolve(vuePath, 'package.json');
    if (fs.existsSync(dest))
        throw new FileExistsError('File package.json exists!');

    await fs.copy(path.resolve(__dirname, '../../templates/u-fully-functional.vue/package.json'), dest);

    const baseName = path.basename(vuePath, path.extname(vuePath));
    const componentName = kebab2Camel(baseName);
    await batchReplace(dest, [
        [/u-sample/g, baseName],
        [/USample/g, componentName],
    ]);
    return dest;
}

/**
 * Expand to new paths
 * @param vueFile The component that the original component library needs to expand, both primary and secondary components are acceptable
 * @param from the original library, or the path of VueFile itself
 * @param to new path
 */
export async function extendToPath(vueFile: VueFile, from: Library | string, to: string, mode: VueFileExtendMode) {
    let importFrom: string;
    if (from instanceof Library) {
        importFrom = from.fileName;
    } else {
        importFrom = from;
    }

    const dest = to;
    const destDir = path.dirname(dest);

    if (fs.existsSync(dest))
        throw new FileExistsError(dest);
    if (!fs.existsSync(destDir))
        fs.mkdirSync(destDir);

    const newVueFile = vueFile.extend(mode, dest, importFrom);
    await newVueFile.save();

    return newVueFile;
}

/**
 * Expanding to new libraries
 * @param vueFile The component that the original component library needs to expand, both primary and secondary components are acceptable
 * @param from the original library, or the path of VueFile itself
 * @param to The component library that needs to be expanded, such as internalLibrary
 */
export async function extendToLibrary(vueFile: VueFile, from: Library | string, to: Library, mode: VueFileExtendMode, subDir?: string) {
    let importFrom: string;
    if (from instanceof Library) {
        if (subDir === undefined)
            subDir = to.config.type !== 'library' && to.config.type !== 'repository' ? from.baseName : ''; // @example 'cloud-ui';
        importFrom = from.fileName;
    } else {
        if (subDir === undefined)
            subDir = to.config.type !== 'library' && to.config.type !== 'repository' ? 'other' : '';
        importFrom = from;
    }

    const arr = vueFile.fullPath.split(path.sep);
    let pos = arr.length - 1; // root Vue position
    while(arr[pos] && arr[pos].endsWith('.vue'))
        pos--;
    pos++;
    const basePath = arr.slice(0, pos).join(path.sep);
    const fromRelativePath = path.relative(basePath, vueFile.fullPath);
    const toRelativePath = subDir ? `./${subDir}/${fromRelativePath}` : `./${fromRelativePath}`;
    const toPath = to.componentsDirectory.fullPath;

    const destDir = path.resolve(toPath, subDir);
    const dest = path.resolve(toPath, toRelativePath);
    const parentDest = path.dirname(dest);

    // If it is a child component and the parent component does not exist, create the parent component first
    if (vueFile.isChild && !fs.existsSync(parentDest))
        await extendToLibrary(vueFile.parent, from, to, VueFileExtendMode.script, subDir);

    if (fs.existsSync(dest))
        throw new FileExistsError(dest);
    if (!fs.existsSync(destDir))
        fs.mkdirSync(destDir);

    const newVueFile = vueFile.extend(mode, dest, importFrom);
    await newVueFile.save();

    // The child component is added in the parent component, and the root component is added in index.js
    if (vueFile.isChild) {
        // VueFile.save() will clear the child components
        // const parentFile = new VueFile(parentDest);
        // await parentFile.open();
        // parentFile.parseScript();
        const parentIndexFile = JSFile.fetch(path.join(parentDest, 'index.js'));
        await parentIndexFile.open();
        parentIndexFile.parse();

        await vueFile.open();
        vueFile.parseScript();

        const relativePath = './' + vueFile.fileName;

        // const getExportSpecifiers = () => {
        const exportNames: Array<string> = [];
        babel.traverse(vueFile.scriptHandler.ast, {
            ExportNamedDeclaration(nodeInfo) {
                if (nodeInfo.node.declaration) {
                    (nodeInfo.node.declaration as babel.types.VariableDeclaration).declarations.forEach((declaration) => {
                        exportNames.push((declaration.id as babel.types.Identifier).name);
                    });
                }

                if (nodeInfo.node.specifiers) {
                    nodeInfo.node.specifiers.forEach((specifier) => {
                        exportNames.push((specifier.exported as babel.types.Identifier).name);
                    });
                }
            },
        });
        // }

        const createExportNamed = () => {
            const exportNamedDeclaration = babel.template(`export { ${exportNames.join(', ')} } from "${relativePath}"`)() as babel.types.ExportNamedDeclaration;
            // To escape typescript
            // Object.assign(exportNamedDeclaration.source, { raw: `'${relativePath}'` });
            return exportNamedDeclaration;
        }

        let exportNamed: babel.types.ExportNamedDeclaration;
        babel.traverse(parentIndexFile.handler.ast, {
            enter(nodeInfo) {
                // Only traverse the top level nodes
                if (nodeInfo.parentPath && nodeInfo.parentPath.isProgram())
                    nodeInfo.skip();

                if (nodeInfo.isExportAllDeclaration() || nodeInfo.isExportNamedDeclaration()) {
                    if (!nodeInfo.node.source) {
                        // It may be declarations
                    } else if (relativePath === nodeInfo.node.source.value) {
                        if (nodeInfo.isExportAllDeclaration) {
                            exportNamed = createExportNamed();
                            nodeInfo.replaceWith(exportNamed);
                        } else {
                            // exportNamed = nodeInfo.node;
                        }
                        nodeInfo.stop();
                    } else if (relativePath < nodeInfo.node.source.value) {
                        exportNamed = createExportNamed();
                        nodeInfo.insertBefore(exportNamed);
                        nodeInfo.stop();
                    }
                } else if (nodeInfo.isExportDefaultDeclaration() && !exportNamed) {
                    exportNamed = createExportNamed();
                    nodeInfo.insertBefore(exportNamed);
                    nodeInfo.stop();
                }
            },
        });

        await parentIndexFile.save();
    } else if (to.componentsIndexFile) {
        const indexFile = to.componentsIndexFile;
        await indexFile.open();
        indexFile.parse();

        const createExportAll = () => {
            const exportAllDeclaration = babel.types.exportAllDeclaration(babel.types.stringLiteral(toRelativePath));
            // To escape typescript
            Object.assign(exportAllDeclaration.source, { raw: `'${toRelativePath}'` });
            return exportAllDeclaration;
        }

        let exportAll: babel.types.ExportAllDeclaration;
        babel.traverse(indexFile.handler.ast, {
            enter(nodeInfo) {
                // Only traverse the top level nodes
                if (nodeInfo.parentPath && nodeInfo.parentPath.isProgram())
                    nodeInfo.skip();

                if (nodeInfo.isExportAllDeclaration()) {
                    if (!nodeInfo.node.source) {
                        // It may be declarations
                    } else if (toRelativePath === nodeInfo.node.source.value) {
                        exportAll = nodeInfo.node;
                        nodeInfo.stop();
                    } else if (toRelativePath < nodeInfo.node.source.value) {
                        exportAll = createExportAll();
                        nodeInfo.insertBefore(exportAll);
                        nodeInfo.stop();
                    }
                }
            },
            exit(nodeInfo) {
                if (nodeInfo.isProgram() && !exportAll) {
                    exportAll = createExportAll();
                    nodeInfo.node.body.push(exportAll);
                }
            },
        });

        await indexFile.save();
    }

    return newVueFile;
}
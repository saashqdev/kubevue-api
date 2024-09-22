/// <reference path="../types/line-reader.d.ts" />
import * as fs from 'fs-extra';
import * as path from 'path';
import * as shell from 'shelljs';
import * as lineReader from 'line-reader';
import pluralize = require('pluralize');
import { kebab2Camel, Camel2kebab } from '../utils';

import FSEntry from './FSEntry';
import { default as TemplateHandler, TemplateOptions } from './TemplateHandler';
import ScriptHandler from './ScriptHandler';
import StyleHandler from './StyleHandler';
import APIHandler from './APIHandler';
import ExamplesHandler from './ExamplesHandler';

import traverse from '@babel/traverse';
import PackageJSON from '../types/PackageJSON';
import { FileExistsError } from './fs';
import { uniqueInMap } from '../utils/shared';

const fetchPartialContent = (content: string, tag: string, attrs: string = '') => {
    const reg = new RegExp(`<${tag}${attrs ? ' ' + attrs : ''}.*?>([\\s\\S]+)<\\/${tag}>`);
    const m = content.match(reg);
    return m ? m[1].replace(/^\n+/, '') : '';
};

export enum VueFileExtendMode {
    style = 'style',
    script = 'script',
    template = 'template',
    all = 'all',
};

export const SUBFILE_LIST = [
    'index.html',
    'index.js',
    'module.css',
    'index.vue',
    'README.md',
    'CHANGELOG.md',
    'api.yaml',
    'package.json',
    'node_modules',
    'kubevue_packages',
    'assets',
    'docs',
    'i18n',
    'dist',
    'public',
    'screenshots',
    'winter',
];

/**
 * Class for handling single/multiple Vue files
 *
 * ### Main functions
 *
 * #### Open: Generally divided into four stages
 * - const vueFile = new VueFile(fullPath); // Create an object based on the path, which can be a virtual path.
 * - await vueFile.preOpen(); // Asynchronous method. Get isDirectory, get subcomponents, and title information.
 * - await vueFile.open(); // Asynchronous method. If it is already opened, it will not be reopened. If there is no preOpen, preOpen will be executed first. Get the content blocks of common operations: script, template, style, api, examples, definition, package.
 * - vueFile.parseAll(); // parse all content blocks
 *
 * #### keep:
 * - await vueFile.save();
 * - If there is a parsing, first generate() the content according to the parser, then save it
 * - Determine whether to save single or multiple files based on isDirectory
 *
 * #### Save as:
 * - await vueFile.saveAs(fullPath);
 */
export default class VueFile extends FSEntry {
    /**
     * Tag name/dash name
     */
    tagName: string;
    /**
     * import component name/camelCase name
     */
    componentName: string;
    /**
     * Alias, used for information prompts, etc.
     */
    alias: string;
    /**
     * Father VueFile
     */
    parent: VueFile;
    /**
     * Subfiles of multi-file components
     */
    subfiles: string[];
    /**
     * The subcomponents of this component
     * `undefined` means it has not been preOpened, and an array means it has been opened.
     */
    children: VueFile[];
    /**
     * Whether it is a subcomponent
     */
    isChild: boolean;
    /**
     * Is it in a completely decomposed form?
     */
    isComposed: boolean;

    /**
     * The content read from a single file, or the content after generate()
     * `undefined` means it has not been opened
     */
    content: string;
    template: string;
    script: string;
    style: string;
    api: string;
    examples: string;
    definition: string;
    package: PackageJSON;

    /**
     * Template Processor
     * `undefined` means it has not been resolved yet
     */
    templateHandler: TemplateHandler;
    /**
     * Alias of templateHandler
     */
    $html: TemplateHandler;
    /**
     * Script Processor
     * `undefined` means it has not been resolved yet
     */
    scriptHandler: ScriptHandler;
    /**
     * Alias of scriptHandler
     */
    $js: ScriptHandler;
    /**
     * Style Processor
     * `undefined` means it has not been resolved yet
     */
    styleHandler: StyleHandler;
    /**
     * Alias of styleHandler
     */
    $css: StyleHandler;
    /**
     * API Handler
     */
    apiHandler: APIHandler;
    /**
     * Document example processor
     */
    examplesHandler: ExamplesHandler;
    /**
     * Define the processor
     */
    definitionHandler: void;

    /**
     * @param fullPath The full path must end with `.vue`. It can also be a relative virtual path
     */
    constructor(fullPath: string) {
        if (!fullPath.endsWith('.vue'))
            throw new Error('Not a vue file: ' + fullPath);
        super(fullPath, undefined);
        this.isVue = true;
        this.isComposed = true;
        this.tagName = VueFile.resolveTagName(fullPath);
        this.componentName = kebab2Camel(this.tagName);
    }

    /**
     * Open in advance
     * Detect VueFile file type, subcomponents, etc.
     * Generally used to quickly obtain information in a list, which consumes less performance than directly opening the file content.
     */
    async preOpen(): Promise<void> {
        if (!fs.existsSync(this.fullPath))
            return;
        const stats = fs.statSync(this.fullPath);
        this.isDirectory = stats.isDirectory();
        if (this.isDirectory) {
            await this.loadDirectory();
            this.isComposed = fs.existsSync(path.join(this.fullPath, 'index.vue'));
        } else {
            this.subfiles = [];
            this.children = [];
        }

        this.alias = await this.readTitleInReadme();
    }

    /**
     * Try to read the title line of README.md
     * Search in the first 10 rows
     */
    async readTitleInReadme(): Promise<string> {
        const readmePath = path.join(this.fullPath, 'README.md');
        if (!fs.existsSync(readmePath))
            return;

        const titleRE = /^#\s+\w+\s*(.*?)$/;
        let count = 0;
        let title: string;
        return new Promise((resolve, reject) => {
            lineReader.eachLine(readmePath, { encoding: 'utf8' }, (line, last) => {
                line = line.trim();
                const cap = titleRE.exec(line);
                if (cap) {
                    title = cap[1];
                    return false;
                } else {
                    count++;
                    if (count > 10)
                        return false;
                }
            }, (err) => {
                err? reject(err) : resolve(title);
            });
        });
    }

    /**
     * Load multiple file directories
     */
    async loadDirectory() {
        if (!fs.existsSync(this.fullPath))
            throw new Error(`Cannot find: ${this.fullPath}`);

        const children: Array<VueFile> = [];
        this.subfiles = await fs.readdir(this.fullPath);

        this.subfiles.forEach((name) => {
            if (!name.endsWith('.vue') || name === 'index.vue')
                return;

            const fullPath = path.join(this.fullPath, name);
            let vueFile;
            // if (this.isWatched)
            // vueFile = VueFile.fetch(fullPath);
            // else
            vueFile = new VueFile(fullPath);
            vueFile.parent = this;
            vueFile.isChild = true;
            children.push(vueFile);
        });

        return this.children = children;
    }

    /**
     * Force Reopen
     */
    async forceOpen(): Promise<void> {
        this.close();
        await this.preOpen();
        await this.load();
        this.isOpen = true;
    }

    /**
     * Close the file
     */
    close(): void {
        this.isDirectory = undefined;
        this.alias = undefined;
        this.subfiles = undefined;
        this.children = undefined;

        // Single file content
        this.content = undefined;
        this.template = undefined;
        this.script = undefined;
        this.style = undefined;
        this.api = undefined;
        this.examples = undefined;
        this.definition = undefined;
        this.package = undefined;

        this.templateHandler = undefined;
        this.$html = undefined;
        this.scriptHandler = undefined;
        this.$js = undefined;
        this.styleHandler = undefined;
        this.$css = undefined;
        this.apiHandler = undefined;
        this.examplesHandler = undefined;
        this.definitionHandler = undefined;

        this.isOpen = false;
    }

    /**
     * Load all content
     */
    protected async load(): Promise<void> {
        await this.loadScript();
        await this.loadTemplate();
        await this.loadStyle();
        await this.loadPackage();
        await this.loadAPI();
        await this.loadExamples();
        await this.loadDefinition();
    }

     /**
     * Preload
     * Only load content
     */
    async preload() {
        if (!fs.existsSync(this.fullPath))
            throw new Error(`Cannot find: ${this.fullPath}!`);

        if (!this.isDirectory)
            return this.content = await fs.readFile(this.fullPath, 'utf8');
        else if (this.isComposed)
            return this.content = await fs.readFile(path.join(this.fullPath, 'index.vue'), 'utf8');
    }

    async loadScript() {
        await this.preload();

        if (this.isDirectory && !this.isComposed) {
            if (fs.existsSync(path.join(this.fullPath, 'index.js')))
                return this.script = await fs.readFile(path.join(this.fullPath, 'index.js'), 'utf8');
            else
                throw new Error(`Cannot find 'index.js' in multifile Vue ${this.fullPath}!`);
        } else {
            return this.script = fetchPartialContent(this.content, 'script');
        }
    }

    async loadTemplate() {
        await this.preload();

        if (this.isDirectory && !this.isComposed) {
            if (fs.existsSync(path.join(this.fullPath, 'index.html')))
                return this.template = await fs.readFile(path.join(this.fullPath, 'index.html'), 'utf8');
        } else {
            return this.template = fetchPartialContent(this.content, 'template');
        }
    }

    async loadStyle() {
        await this.preload();

        if (this.isDirectory && !this.isComposed) {
            if (fs.existsSync(path.join(this.fullPath, 'module.css')))
                return this.style = await fs.readFile(path.join(this.fullPath, 'module.css'), 'utf8');
        } else {
            return this.style = fetchPartialContent(this.content, 'style');
        }
    }

    async loadPackage() {
        await this.preload();

        if (this.isDirectory) {
            if (fs.existsSync(path.join(this.fullPath, 'package.json'))) {
                const content = await fs.readFile(path.join(this.fullPath, 'package.json'), 'utf8');
                return this.package = JSON.parse(content);
            }
        }
    }

    async loadAPI() {
        await this.preload();

        if (this.isDirectory) {
            if (fs.existsSync(path.join(this.fullPath, 'api.yaml')))
                return this.api = await fs.readFile(path.join(this.fullPath, 'api.yaml'), 'utf8');
        } else {
            return this.api = fetchPartialContent(this.content, 'api');
        }
    }

    // @ALL
    // loadDocs()
    async loadExamples(from?: string) {
        await this.preload();

        if (this.isDirectory) {
            if (!from) {
                if (fs.existsSync(path.join(this.fullPath, 'docs/blocks.md')))
                    from = 'blocks.md';
                else if (fs.existsSync(path.join(this.fullPath, 'docs/examples.md')))
                    from = 'examples.md';
                else
                    return;
            }
            return this.examples = await fs.readFile(path.join(this.fullPath, 'docs/' + from), 'utf8');
        } else {
            if (!from) {
                if (fetchPartialContent(this.content, 'doc', `name="blocks.md"`))
                    from = 'blocks.md';
                else if (fetchPartialContent(this.content, 'doc', `name="examples.md"`))
                    from = 'examples.md';
                else
                    return;
            }
            this.examples = fetchPartialContent(this.content, 'doc', `name="${from}"`);
        }
    }

    async loadDefinition() {
        await this.preload();

        if (this.isDirectory) {
            if (fs.existsSync(path.join(this.fullPath, 'definition.json')))
                return this.definition = await fs.readFile(path.join(this.fullPath, 'definition.json'), 'utf8');
        } else {
            return this.definition = fetchPartialContent(this.content, 'definition');
        }
    }

    hasAssets() {
        return !!this.subfiles && this.subfiles.includes('assets');
    }

    /**
     * Are there any additional
     */
    hasExtra() {
        return !!this.subfiles && this.subfiles.some((file) => file[0] !== '.' && !SUBFILE_LIST.includes(file));
    }

    /**
     * Is there a template?
     * @param simplify Simplification mode. In this mode, `<div></div>` is regarded as having no template
     */
    hasTemplate(simplify: boolean) {
        const template = this.template;
        if (!simplify)
            return !!template;
        else
            return !!template && template.trim() !== '<div></div>';
    }

    /**
     * Is there a JS script
     * @param simplify Simplification mode. In this mode, `export default {};` is regarded as no JS script
     */
    hasScript(simplify: boolean) {
        const script = this.script;
        if (!simplify)
            return !!script;
        else
            return !!script && script.trim().replace(/\s+/g, ' ').replace(/\{ \}/g, '{}') !== 'export default {};';
    }

    /**
     * Is there a CSS style?
     * @param simplify Simplification mode. In this mode, `.root {}` is treated as having no CSS style
     */
    hasStyle(simplify: boolean) {
        const style = this.style;
        if (!simplify)
            return !!style;
        else
            return !!style && style.trim().replace(/\s+/g, ' ').replace(/\{ \}/g, '{}') !== '.root {}';
    }

    // @TODO Is anything else needed?

    warnIfNotOpen() {
        if (!this.isOpen)
            console.warn(`[kubevue.VueFile] File ${this.fileName} seems not open.`);
    }

    parseAll(): void {
        this.warnIfNotOpen();

        this.parseTemplate();
        this.parseScript();
        this.parseStyle();
        this.parseAPI();
        this.parseExamples();
        // this.parseDefinition();
    }

    parseTemplate() {
        if (this.templateHandler)
            return this.templateHandler;
        else
            return this.$html = this.templateHandler = new TemplateHandler(this.template);
    }

    parseScript() {
        if (this.scriptHandler)
            return this.scriptHandler;
        else
            return this.$js = this.scriptHandler = new ScriptHandler(this.script);
    }

    parseStyle() {
        if (this.styleHandler)
            return this.styleHandler;
        else
            return this.$css = this.styleHandler = new StyleHandler(this.style);
    }

    parseAPI() {
        if (this.apiHandler)
            return this.apiHandler;
        else
            return this.apiHandler = new APIHandler(this.api, path.join(this.fullPath, 'api.yaml'));
    }

    parseExamples() {
        if (this.examplesHandler)
            return this.examplesHandler;
        else
            return this.examplesHandler = new ExamplesHandler(this.examples);
    }

    generate(options?: TemplateOptions) {
        let template = this.template;
        let script = this.script;
        let style = this.style;
        let definition = this.definition;

        if (this.templateHandler) {
            if (!this.isDirectory)
                this.templateHandler.options.startLevel = 1;
            this.template = template = this.templateHandler.generate(options);
        }
        if (this.scriptHandler)
            this.script = script = this.scriptHandler.generate();
        if (this.styleHandler)
            this.style = style = this.styleHandler.generate();

        const contents = [];
        template && contents.push(`<template>\n${template}</template>`);
        script && contents.push(`<script>\n${script}</script>`);
        style && contents.push(`<style module>\n${style}</style>`);
        definition && contents.push(`<definition>\n${definition}</definition>`);

        return this.content = contents.join('\n\n') + '\n';
    }

    /**
     * Clone the VueFile object
     * Clone all parameters, but exclude handler references
     */
    clone() {
        this.warnIfNotOpen();
        const vueFile = new VueFile(this.fullPath);

        vueFile.fullPath = this.fullPath;
        vueFile.fileName = this.fileName;
        vueFile.extName = this.extName;
        vueFile.baseName = this.baseName;
        vueFile.title = this.title;
        vueFile.isDirectory = this.isDirectory;
        vueFile.isVue = this.isVue;
        vueFile.isComposed = this.isComposed;
        vueFile.isOpen = this.isOpen;
        vueFile.isSaving = this.isSaving;
        vueFile.tagName = this.tagName;
        vueFile.componentName = this.componentName;
        vueFile.alias = this.alias;
        vueFile.subfiles = this.subfiles && Array.from(this.subfiles);
        vueFile.children = this.children && Array.from(this.children);
        vueFile.content = this.content;
        vueFile.template = this.template;
        vueFile.script = this.script;
        vueFile.style = this.style;
        vueFile.api = this.api;
        vueFile.examples = this.examples;
        vueFile.definition = this.definition;
        vueFile.package = this.package && Object.assign({}, this.package);

        return vueFile;
    }

    /**
     * await vueFile.save();
     * Only relies on this.fullPath and this.isDirectory variables
     * - If there is parsing, generate content according to the parser first, then save
     * - Determine whether to save single or multiple files based on isDirectory
     */
    async save(): Promise<void> {
        this.warnIfNotOpen();
        this.isSaving = true;

        // Only delete if isDirectory is different, because there may be other additional files
        if (fs.existsSync(this.fullPath) && fs.statSync(this.fullPath).isDirectory() !== this.isDirectory)
            shell.rm('-rf', this.fullPath);

        this.generate();

        if (this.isDirectory) {
            fs.ensureDirSync(this.fullPath);

            if (this.isComposed)
                await fs.writeFile(path.join(this.fullPath, 'index.vue'), this.content);
            else {
                const promises = [];

                this.template && promises.push(fs.writeFile(path.resolve(this.fullPath, 'index.html'), this.template));
                this.script && promises.push(fs.writeFile(path.resolve(this.fullPath, 'index.js'), this.script));
                this.style && promises.push(fs.writeFile(path.resolve(this.fullPath, 'module.css'), this.style));
                this.definition && promises.push(fs.writeFile(path.resolve(this.fullPath, 'definition.json'), this.definition));
                if (this.package && typeof this.package === 'object')
                    promises.push(fs.writeFile(path.resolve(this.fullPath, 'package.json'), JSON.stringify(this.package, null, 2) + '\n'));
    
                await Promise.all(promises);
            }
        } else {
            await fs.writeFile(this.fullPath, this.content);
        }

        super.save();
    }

    /**
     * Save as, save to another path
     * All content parameters will be cloned, but the handler reference will be excluded
     * @param fullPath
     */
    async saveAs(fullPath: string, isDirectory?: boolean) {
        this.warnIfNotOpen();
        if (fs.existsSync(fullPath))
            throw new FileExistsError(fullPath);

        if (this.templateHandler) {
            if (!this.isDirectory)
                this.templateHandler.options.startLevel = 1;
            this.template = this.templateHandler.generate();
        }
        if (this.scriptHandler)
            this.script = this.scriptHandler.generate();
        if (this.styleHandler)
            this.style = this.styleHandler.generate();

        // Only when isDirectory is the same will the original file be copied, otherwise it will be regenerated
        if (this.isDirectory && fs.existsSync(this.fullPath) && fs.statSync(this.fullPath).isDirectory())
            await fs.copy(this.fullPath, fullPath);

        const vueFile = new VueFile(fullPath);
        // vueFile.fullPath = this.fullPath;
        // vueFile.fileName = this.fileName;
        // vueFile.extName = this.extName;
        // vueFile.baseName = this.baseName;
        // vueFile.title = this.title;
        vueFile.isDirectory = isDirectory === undefined ? this.isDirectory : isDirectory;
        vueFile.isVue = this.isVue;
        vueFile.isComposed = this.isComposed;
        vueFile.isOpen = this.isOpen;
        vueFile.isSaving = this.isSaving;
        // vueFile.tagName = this.tagName;
        // vueFile.componentName = this.componentName;
        vueFile.alias = this.alias;
        vueFile.subfiles = this.subfiles && Array.from(this.subfiles);
        vueFile.children = this.children && Array.from(this.children);
        vueFile.content = this.content;
        vueFile.template = this.template;
        vueFile.script = this.script;
        vueFile.style = this.style;
        vueFile.api = this.api;
        vueFile.examples = this.examples;
        vueFile.definition = this.definition;
        vueFile.package = this.package && Object.assign({}, this.package);

        vueFile.save();

        return vueFile;
    }

    // @ALL
    // async saveTemplate() {
    // }

    checkTransform() {
        if (!this.isDirectory)
            return true;
        else {
            const files = fs.readdirSync(this.fullPath);
            const normalBlocks = ['index.html', 'index.js', 'module.css'];
            const extraBlocks: Array<string> = [];
            files.forEach((file) => {
                if (!normalBlocks.includes(file))
                    extraBlocks.push(file);
            });

            return extraBlocks.length ? extraBlocks : true;
        }
    }

    transform() {
        const isDirectory = this.isDirectory;

        if (!isDirectory && !this.script) {
            this.script = 'export default {};\n';
        }

        if (!isDirectory && this.template) {
            const tabs = this.template.match(/^ */)[0];
            if (tabs)
                this.template = this.template.replace(new RegExp('^' + tabs, 'mg'), '');
        }

        this.parseScript();
        this.parseStyle();
        // this.parseTemplate();

        function shortenPath(filePath: string) {
            if (filePath.startsWith('../')) {
                let newPath = filePath.replace(/^\.\.\//, '');
                if (!newPath.startsWith('../'))
                    newPath = './' + newPath;
                return newPath;
            } else
                return filePath;
        }

        function lengthenPath(filePath: string) {
            if (filePath.startsWith('.'))
                return path.join('../', filePath);
            else
                return filePath;
        }

        traverse(this.scriptHandler.ast, {
            ImportDeclaration(nodeInfo) {
                if (nodeInfo.node.source)
                    nodeInfo.node.source.value = isDirectory ? shortenPath(nodeInfo.node.source.value) : lengthenPath(nodeInfo.node.source.value);
            },
            ExportAllDeclaration(nodeInfo) {
                if (nodeInfo.node.source)
                    nodeInfo.node.source.value = isDirectory ? shortenPath(nodeInfo.node.source.value) : lengthenPath(nodeInfo.node.source.value);
            },
            ExportNamedDeclaration(nodeInfo) {
                if (nodeInfo.node.source)
                    nodeInfo.node.source.value = isDirectory ? shortenPath(nodeInfo.node.source.value) : lengthenPath(nodeInfo.node.source.value);
            },
        });

        this.styleHandler.ast.walkAtRules((node) => {
            if (node.name !== 'import')
                return;

            const value = node.params.slice(1, -1);
            node.params = `'${isDirectory ? shortenPath(value) : lengthenPath(value)}'`;
        });

        this.styleHandler.ast.walkDecls((node) => {
            const re = /url\((['"])(.+?)['"]\)/;

            const cap = re.exec(node.value);
            if (cap) {
                node.value = node.value.replace(re, (m, quote, url) => {
                    url = isDirectory ? shortenPath(url) : lengthenPath(url);

                    return `url(${quote}${url}${quote})`;
                });
            }
        });

        this.isDirectory = !this.isDirectory;
        this.isComposed = !this.isComposed;
    }

    transformExportStyle() {
        this.parseScript();
        const exportDefault = this.$js.export().default();
        if (exportDefault.is('id')) {
            const name = (exportDefault.node as babel.types.Identifier).name;
            // const object = this.$js.variables().get(name);
            
            const body = this.$js.variables().body;
            let object: babel.types.Expression;
            const index = body.findIndex((node) => {
                if (node.type !== 'ExportNamedDeclaration')
                    return false;
                
                if (node.declaration.type === 'VariableDeclaration') {
                    let declarator = node.declaration.declarations.find((declarator: babel.types.VariableDeclarator) => (declarator.id as babel.types.Identifier).name === name);
                    if (declarator) {
                        object = declarator.init;
                        return true;
                    }
                }
            });
            if (!~index)
                return;
            Object.assign(exportDefault.node, object);

            for (let i = body.length - 1; i >= 0; i--) {
                const node = body[i];
                if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration') {
                    body.splice(i, 1);
                    i++;
                }
            }
        }
    }

    /**
     * Only verify the conversion of decomposed form into combined form
     * No plans to support reverse engineering
     */
    transformDecomposed() {
        if (this.isComposed)
            return;

        shell.rm('-rf', path.join(this.fullPath, 'index.js'));
        shell.rm('-rf', path.join(this.fullPath, 'index.html'));
        shell.rm('-rf', path.join(this.fullPath, 'module.css'));

        this.transformExportStyle();

        if (this.children.length) {
            const content = [];
            content.push(`import ${this.componentName} from './index.vue';`);
            this.children.forEach((child) => content.push(`import ${child.componentName} from './${child.fileName}';`));
            content.push('');
            content.push('export {');
            content.push(`    ${this.componentName},`);
            this.children.forEach((child) => content.push(`    ${child.componentName},`));
            content.push('};');
            content.push('');
            content.push(`export default ${this.componentName};`);

            fs.writeFileSync(path.join(this.fullPath, 'index.js'), content.join('\n') + '\n');
        }

        this.isComposed = true;
    }

    /**
     * Merge templates, logic and styles with another Vue file
     * Both VueFile must be parseAll() first
     * @param that another VueFile
     * @param route The node path to be inserted. The last digit indicates the node position. If it is empty, it means the last one. For example, /1/2/1 means inserting into the first position of the second child node of the first child node of the root node.
     * - merge(that, '') refers to the root node itself
     * - merge(that, '/') refers to the root node itself
     * - merge(that, '/0') refers to the 0th child node
     * - merge(that, '/2/1') refers to the first child of the second child
     * - merge(that, '/2/') refers to the last part of the second child node
     */
    merge(that: VueFile, route: string | number | { line: number, character: number } = '') {
        const scriptReplacements = this.scriptHandler.merge(that.scriptHandler);
        const styleReplacements = this.styleHandler.merge(that.styleHandler);
        const definitionReplacements = this.mergeDefinition(that);
        const replacements = { ...scriptReplacements, ...styleReplacements, ...definitionReplacements };

        this.templateHandler.merge(that.templateHandler, route, replacements);
        return replacements;
    }

    mergeDefinition(that: VueFile) {
        type PartialNode = { [key: string]: any };

        function traverse(
            node: PartialNode,
            func: (node: PartialNode, parent?: PartialNode, index?: number) => any,
            parent: PartialNode = null,
            index?: number
        ) {
            func(node, parent, index);
            Object.values(node).forEach((value) => {
                if (Array.isArray(value)) {
                    value.forEach((child, index) => child && traverse(child, func, node, index));
                } else if (typeof value === 'object')
                    value && traverse(value, func, node, index);
            });
        }

        const thisDefinition = JSON.parse(this.definition || '{}');
        thisDefinition.params = thisDefinition.params || [];
        thisDefinition.variables = thisDefinition.variables || [];
        thisDefinition.lifecycles = thisDefinition.lifecycles || [];
        thisDefinition.logics = thisDefinition.logics || [];
        const thatDefinition = JSON.parse(that.definition || '{}');
        thatDefinition.params = thatDefinition.params || [];
        thatDefinition.variables = thatDefinition.variables || [];
        thatDefinition.lifecycles = thatDefinition.lifecycles || [];
        thatDefinition.logics = thatDefinition.logics || [];
        
        const replacements: { [key: string]: { [old: string]: string } } = { 'data2': {}, logic: {} };

        const thisParamKeys: Set<string> = new Set();
        thisDefinition.params.forEach((param: { name: string }) => thisParamKeys.add(param.name));
        thisDefinition.variables.forEach((variable: { name: string }) => thisParamKeys.add(variable.name));

        thatDefinition.params.forEach((param: { name: string }) => {
            const newName = uniqueInMap(param.name, thisParamKeys);
            if (newName !== param.name)
                replacements['data2'][param.name] = newName;
            thisDefinition.params.push(Object.assign(param, {
                name: newName,
            }));
        });
        thatDefinition.variables.forEach((variable: { name: string }) => {
            const newName = uniqueInMap(variable.name, thisParamKeys);
            if (newName !== variable.name)
                replacements['data2'][variable.name] = newName;
            thisDefinition.variables.push(Object.assign(variable, {
                name: newName,
            }));
        });

        thatDefinition.lifecycles.forEach((thatLC: { name: string }) => {
            if (thisDefinition.lifecycles.find((thisLC: { name: string }) => thisLC.name == thatLC.name))
                return;

            thisDefinition.lifecycles.push(thatLC);
        });

        const thisLogicKeys: Set<string> = new Set();
        thisDefinition.logics.forEach((logic: { name: string }) => thisLogicKeys.add(logic.name));
        thatDefinition.logics.forEach((logic: { name: string }) => {
            const newName = uniqueInMap(logic.name, thisLogicKeys);
            if (newName !== logic.name)
                replacements['logic'][logic.name] = newName;
            
            logic.name = newName;
            thisDefinition.logics.push(logic);
        });

        const identifierMap = { ...replacements['data2'], ...replacements['logic'] };
        thatDefinition.logics.forEach((logic: { name: string }) => {
            traverse(logic, (node) => {
                if (node.level === 'expressionNode' && node.type === 'Identifier') {
                    if (identifierMap[node.name])
                        node.name = identifierMap[node.name];
                }
            });
        });

        this.definition = JSON.stringify(thisDefinition, null, 4) + '\n';

        return replacements;
    }

    extend(mode: VueFileExtendMode, fullPath: string, fromPath: string) {
        const vueFile = new VueFile(fullPath);
        vueFile.isDirectory = true;
        vueFile.isComposed = true;

        // JS
        const tempComponentName = this.componentName.replace(/^[A-Z]/, 'O');
        vueFile.script = fromPath.endsWith('.vue')
? `import ${this.componentName === vueFile.componentName ? tempComponentName : this.componentName} from '${fromPath}';`
: `import { ${this.componentName}${this.componentName === vueFile.componentName ? ' as ' + tempComponentName : ''} } from '${fromPath}';`;

        vueFile.script += `\n
export const ${vueFile.componentName} = {
    name: '${vueFile.tagName}',
    extends: ${this.componentName === vueFile.componentName ? tempComponentName : this.componentName},
};

export default ${vueFile.componentName};
`;

        if (mode === VueFileExtendMode.style || mode === VueFileExtendMode.all)
            vueFile.style = `@extend;\n`;

        if (mode === VueFileExtendMode.template || mode === VueFileExtendMode.all)
            vueFile.template = this.template;

        return vueFile;
    }

    /**
     * Find the base class component according to extends
     */
    findSuper() {
        const $js = this.parseScript();
        const exportDefault = $js.export().default();
        let vueObject = exportDefault;
        if (exportDefault.is('id'))
            vueObject = $js.variables().get((exportDefault.node as babel.types.Identifier).name);
        if (!vueObject.is('object'))
            throw new TypeError('Cannot find Vue object!');

        const extendsName = vueObject.get('extends').name();

        // $js.imports()
    }

    private static _splitPath(fullPath: string) {
        const arr = fullPath.split(path.sep);
        let pos = arr.length - 1; // root Vue position
        while(arr[pos] && arr[pos].endsWith('.vue'))
            pos--;
        pos++;

        return { arr, pos };
    }

    /**
     * Calculate the directory where the root component is located
     * @param fullPath full path
     */
    static resolveRootVueDir(fullPath: string) {
        const { arr, pos } = VueFile._splitPath(fullPath);
        return arr.slice(0, pos).join(path.sep);
    }

    static resolveTagName(fullPath: string) {
        const { arr, pos } = VueFile._splitPath(fullPath);
        const vueNames = arr.slice(pos);

        let result: Array<string> = [];
        vueNames.forEach((vueName) => {
            const baseName = path.basename(vueName, '.vue');
            const arr = baseName.split('-');
            if (arr[0].length === 1) // u-navbar
                result = arr;
            else if (pluralize(baseName) === result[result.length - 1]) // If it is the singular form of the previous one, u-actions -> action, u-checkboxes -> checkbox
                result[result.length - 1] = baseName;
            else
                result.push(baseName);
        });
        return result.join('-');
    }

    static fetch(fullPath: string) {
        return super.fetch(fullPath) as VueFile;
    }

    /**
     * Create a temporary VueFile file from code
     * Similar to skipping preOpen and open phases, but the path is virtual
     * @param code code
     */
    static from(code: string, fileName: string = 'temp.vue') {
        const vueFile = new VueFile('temp.vue');
        vueFile.isOpen = true;
        vueFile.isDirectory = false;
        vueFile.isComposed = true;
        vueFile.subfiles = [];
        vueFile.children = [];
        vueFile.content = code;
        vueFile.script = fetchPartialContent(vueFile.content, 'script');
        vueFile.template = fetchPartialContent(vueFile.content, 'template');
        vueFile.style = fetchPartialContent(vueFile.content, 'style');
        vueFile.api = fetchPartialContent(vueFile.content, 'api');
        vueFile.examples = fetchPartialContent(vueFile.content, 'doc', 'name="blocks"');
        if (!vueFile.examples)
            vueFile.examples = fetchPartialContent(vueFile.content, 'doc', 'name="examples"');
        vueFile.definition = fetchPartialContent(vueFile.content, 'definition');
        return vueFile;
    }
}
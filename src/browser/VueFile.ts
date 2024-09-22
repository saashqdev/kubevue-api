import pluralize = require('pluralize');

import { default as TemplateHandler, TemplateOptions } from '../fs/TemplateHandler';
import ScriptHandler from '../fs/ScriptHandler';
import StyleHandler from '../fs/StyleHandler';
// import APIHandler from '../fs/APIHandler';
// import ExamplesHandler from '../fs/ExamplesHandler';

import traverse from '@babel/traverse';
import PackageJSON from '../types/PackageJSON';
import { kebab2Camel, Camel2kebab, uniqueInMap } from '../utils/shared';

const fetchPartialContent = (content: string, tag: string, attrs: string = '') => {
    const reg = new RegExp(`<${tag}${attrs ? ' ' + attrs : ''}.*?>([\\s\\S]+)<\\/${tag}>`);
    const m = content.match(reg);
    return m ? m[1].replace(/^\n+/, '') : '';
};

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
export default class VueFile {
    fullPath: string;
    filePath: string;
    isOpen: boolean;
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
    // apiHandler: APIHandler;
    /**
     * Document example processor
     */
    // examplesHandler: ExamplesHandler;
    /**
     * Define the processor
     */
    definitionHandler: void;

    /**
     * @param filePath Vue file path, only recorded in browser mode
     * @param content Vue content
     */
    constructor(filePath: string, content: string) {
        this.fullPath = this.filePath = filePath;
        this.content = content;
        this.tagName = VueFile.resolveTagName(filePath);
        this.componentName = kebab2Camel(this.tagName);
    }

    /**
     * Open in advance
     * Detect VueFile file type, subcomponents, etc.
     * Generally used to quickly obtain information in a list, which consumes less performance than directly opening the file content.
     */
    async preOpen(): Promise<void> {
        //
    }

    async open(): Promise<void> {
        if (this.isOpen)
            return;
        return this.forceOpen();
    }

    /**
     * Force Reopen
     */
    async forceOpen(): Promise<void> {
        // this.close();
        await this.preOpen();
        await this.load();
    }

    /**
     * Close the file
     */
    close(): void {
        this.alias = undefined;

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
        // this.apiHandler = undefined;
        // this.examplesHandler = undefined;
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
        // await this.loadAPI();
        // await this.loadExamples();
        await this.loadDefinition();
    }

     /**
     * Preload
     * Only load content
     */
    async preload() {
        //
    }

    async loadScript() {
        return this.script = fetchPartialContent(this.content, 'script');
    }

    async loadTemplate() {
        return this.template = fetchPartialContent(this.content, 'template');
    }

    async loadStyle() {
        return this.style = fetchPartialContent(this.content, 'style');
    }

    async loadAPI() {
        return this.api = fetchPartialContent(this.content, 'api');
    }

    // @ALL
    // loadDocs()
    async loadExamples(from?: string) {
    }

    async loadDefinition() {
        return this.definition = fetchPartialContent(this.content, 'definition');
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

    warnIfNotOpen() {
        //
    }

    parseAll(): void {
        this.warnIfNotOpen();

        this.parseTemplate();
        this.parseScript();
        this.parseStyle();
        // this.parseAPI();
        // this.parseExamples();
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

    // parseAPI() {
    //     if (this.apiHandler)
    //         return this.apiHandler;
    //     else
    //         return this.apiHandler = new APIHandler(this.api, path.join(this.fullPath, 'api.yaml'));
    // }

    // parseExamples() {
    //     if (this.examplesHandler)
    //         return this.examplesHandler;
    //     else
    //         return this.examplesHandler = new ExamplesHandler(this.examples);
    // }

    generate(options?: TemplateOptions) {
        let template = this.template;
        let script = this.script;
        let style = this.style;
        let definition = this.definition;

        if (this.templateHandler) {
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
        const vueFile = new VueFile(this.fullPath, this.content);

        vueFile.tagName = this.tagName;
        vueFile.componentName = this.componentName;
        vueFile.alias = this.alias;
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
        this.generate();
    }

    /**
     * Save as, save to another path
     * All content parameters will be cloned, but the handler reference will be excluded
     * @param fullPath
     */
    async saveAs(fullPath: string) {
        this.warnIfNotOpen();
        console.log('[kubevue-api] no need saveAs in browser mode.');
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

    private static _splitPath(fullPath: string) {
        const arr = fullPath.split('/');
        let pos = arr.length - 1; // root Vue position
        while(arr[pos] && arr[pos].endsWith('.vue'))
            pos--;
        pos++;

        return { arr, pos };
    }

    static resolveTagName(fullPath: string) {
        const { arr, pos } = VueFile._splitPath(fullPath);
        const vueNames = arr.slice(pos);

        let result: Array<string> = [];
        vueNames.forEach((vueName) => {
            const baseName = vueName.split('/').pop().replace(/\.vue$/, '');
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
}
import * as babel from '@babel/core';
import generate from '@babel/generator';
import { uniqueInMap } from '../utils/shared';

import { Options as PrettierOptions } from 'prettier';
import * as prettier from 'prettier/standalone';
import * as parserBabylon from 'prettier/parser-babylon';

/**
 * @TODO - Load babel Config
 * @TODO - Load prettier Config
 */
const prettierConfig = {
    "tabWidth": 4,
    "singleQuote": true,
    "quoteProps": "as-needed",
    "trailingComma": "all",
    "arrowParens": "always",
    "endOfLine": "lf"
};

export const SIMPLIFIED_NODE_TYPE: { [type: string]: string } = {
    object: 'ObjectExpression',
    number: 'NumericLiteral',
    string: 'StringLiteral',
    id: 'Identifier',
}

export const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'beforeDestroy',
    'destroyed'
];

export const ORDER_IN_COMPONENTS = [
    'he',
    'name',
    'parent',
    'functional',
    ['delimiters', 'comments'],
    ['components', 'directives', 'filters'],
    'extends',
    'mixins',
    'inheritAttrs',
    'model',
    ['props', 'propsData'],
    'fetch',
    'asyncData',
    'data',
    'computed',
    'watch',
    LIFECYCLE_HOOKS,
    'methods',
    'head',
    ['template', 'render'],
    'renderError'
];
export const ORDER_IN_COMPONENTS_MAP: { [key: string]: number } = {};
ORDER_IN_COMPONENTS.forEach((key, index) => {
    if (Array.isArray(key)) {
        key.forEach((subkey) => ORDER_IN_COMPONENTS_MAP[subkey] = index);
    } else
        ORDER_IN_COMPONENTS_MAP[key] = index;
});

export class DeclarationHandler {
    state: { [name: string]: string | Array<string> };

    constructor(
        public node: babel.types.Node,
        public parent?: babel.types.Node,
    ) {
        this.resetState();
    }

    resetState() {
        this.state = {};
    }

    after(values: string | Array<string>) {
        this.state.after = values;
        return this;
    }

    is(type: string) {
        if (SIMPLIFIED_NODE_TYPE[type])
            type = SIMPLIFIED_NODE_TYPE[type];
        return this.node.type === type;
    }

    id(name: string) {
        // Try hard assign first to see if there is any problem
        if (this.node.type !== 'Identifier')
            Object.assign(this.node, babel.types.identifier(name));
        return this;
    }

    name() {
        if (this.node.type !== 'Identifier')
            throw new TypeError('This is not an Identifier!');
        return this.node.name;
    }

    object() {
        // Try hard assign first to see if there is any problem
        if (this.node.type !== 'ObjectExpression')
            Object.assign(this.node, babel.types.objectExpression([]));
        return this;
    }

    properties() {
        if (this.node.type !== 'ObjectExpression')
            throw new TypeError('This is not an ObjectExpression!');

        return this.node.properties;
    }

    private _set(key: string, value: string | babel.types.Expression | babel.types.PatternLike, force?: boolean) {
        if (this.node.type !== 'ObjectExpression')
            throw new Error(`${force ? 'set' : 'ensure'} method can only be called on an objectExpression`);

        let pos;
        const after = this.state.after || [];
        let index = this.node.properties.findIndex((property, index) => {
            if (property.type === 'ObjectProperty' && property.key.type === 'Identifier' && after.includes(property.key.name))
                pos = index;
            return property.type === 'ObjectProperty' && property.key.type === 'Identifier' && property.key.name === key;
        });
        if (pos === undefined)
            pos = this.node.properties.length;

        let valueNode: babel.types.Expression | babel.types.PatternLike;
        if (typeof value === 'string') {
            const valueDeclaration = babel.template(`const value = ${value}`)() as babel.types.VariableDeclaration;
            valueNode = valueDeclaration.declarations[0].init;
        } else
            valueNode = value;

        const objectProperty = babel.types.objectProperty(babel.types.identifier(key), valueNode);
        if (~index)
            force && this.node.properties.splice(index, 1, objectProperty);
        else
            this.node.properties.splice(pos, 0, objectProperty);

        this.resetState();
        return this;
    }

    /**
     * Make sure this property exists. If not, set the second parameter to this property
     * @param key
     * @param value
     */
    ensure(key: string, value: string | babel.types.Expression | babel.types.PatternLike = 'undefined') {
        return this._set(key, value);
    }

    /**
     * Assign values   to the properties of an object
     * @param key The name of the key
     * @param value the name of the value
     */
    set(key: string, value: string | babel.types.Expression | babel.types.PatternLike) {
        return this._set(key, value, true);
    }

    setMethod(key: string, objectMethod: babel.types.ObjectMethod) {
        if (this.node.type !== 'ObjectExpression')
        throw new Error(`setMethod method can only be called on an objectExpression`);

        let pos;
        const after = this.state.after || [];
        let index = this.node.properties.findIndex((property, index) => {
            if ((property.type === 'ObjectProperty' || property.type === 'ObjectMethod') && property.key.type === 'Identifier' && after.includes(property.key.name))
                pos = index;
            return (property.type === 'ObjectProperty' || property.type === 'ObjectMethod') && property.key.type === 'Identifier' && property.key.name === key;
        });
        if (pos === undefined)
            pos = this.node.properties.length;

        if (~index)
            this.node.properties.splice(index, 1, objectMethod);
        else
            this.node.properties.splice(pos, 0, objectMethod);

        this.resetState();
        return this;
    }

    /**
     * Get the property value of the object
     * @param key The name of the key
     */
    get(key: string) {
        if (this.node.type !== 'ObjectExpression')
            throw new Error('get method can only be called on an objectExpression');

        const objectProperty = this.node.properties.find((property, index) => {
            return property.type === 'ObjectProperty' && property.key.type === 'Identifier' && property.key.name === key;
        }) as babel.types.ObjectProperty;

        return objectProperty && new DeclarationHandler(objectProperty.value, objectProperty);
    }

    getMethod(key: string) {
        if (this.node.type !== 'ObjectExpression')
            throw new Error('getMethod can only be called on an objectExpression');

        return this.node.properties.find((property, index) => {
            return property.type === 'ObjectMethod' && property.key.type === 'Identifier' && property.key.name === key;
        }) as babel.types.ObjectMethod;
    }

    has(key: string) {
        return !!this.get(key);
    }

    delete(key: string) {
        if (this.node.type !== 'ObjectExpression')
            throw new Error('get method can only be called on an objectExpression');

        let index = this.node.properties.findIndex((property, index) => {
            return property.type === 'ObjectProperty' && property.key.type === 'Identifier' && property.key.name === key;
        });

        ~index && this.node.properties.splice(index, 1);

        return this;
    }
}

export class FromsHandler {
    constructor(public body: babel.types.Statement[]) {}

    has(source: string) {
        let existingIndex = this.body.findIndex((node) => {
            return (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration') && node.source && node.source.value === source;
        });

        return !!~existingIndex;
    }

    delete(source: string) {
        let existingIndex = this.body.findIndex((node) => {
            return (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration') && node.source && node.source.value === source;
        });
        ~existingIndex && this.body.splice(existingIndex, 1);
    }
}

export class ImportsHandler {
    constructor(public body: babel.types.Statement[]) {}

    lastIndex() {
        let i;
        for (i = this.body.length - 1; i >= 0; i--) {
            const node = this.body[i];
            if (node.type === 'ImportDeclaration')
                break;
        }
        return i;
    }

    last() {
        return this.body[this.lastIndex()];
    }

    findIndexFrom(source: string) {
        return this.body.findIndex((node) => {
            return (node.type === 'ImportDeclaration') && node.source && node.source.value === source;
        });
    }

    findFrom(source: string) {
        const index = this.findIndexFrom(source);
        return ~index ? this.body[index] : undefined;
    }

    hasFrom(source: string) {
        const index = this.findIndexFrom(source);
        return !!~index;
    }

    deleteFrom(source: string) {
        const index = this.findIndexFrom(source);
        ~index && this.body.splice(index, 1);
    }

    get(identifer: string) {

    }
}

export class ExportsHandler {
    constructor(public body: babel.types.Statement[]) {}

    lastIndex() {
        let i;
        for (i = this.body.length - 1; i >= 0; i--) {
            const node = this.body[i];
            if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration')
                break;
        }
        return i;
    }

    last() {
        return this.body[this.lastIndex()];
    }
}

/**
 * No handling of destruction
 */
export class StatementHandler {
    declarators: babel.types.VariableDeclarator[] = [];
    constructor(public body: babel.types.Statement[]) {
        body.forEach((node) => {
            if (node.type === 'VariableDeclaration')
                this.declarators.push(...node.declarations);
        });
    }

    has(identifier: string) {
        return !!this.get(identifier);
    }

    get(identifier: string) {
        const declarator = this.declarators.find((declarator) => (declarator.id as babel.types.Identifier).name === identifier);
        return declarator && new DeclarationHandler(declarator.init, declarator);
    }

    return(value?: string) {
        let result = this.body.find((node) => node.type === 'ReturnStatement') as babel.types.ReturnStatement;
        if (!result && value !== undefined)  {
            result = babel.template(`return ${value}`)() as babel.types.ReturnStatement;
            this.body.push(result);
        }
        return result;
    }

    // map(func: (value: babel.types.VariableDeclarator, index: number, array: babel.types.VariableDeclarator[]) => any, thisArg?: any) {
    //     return this.declarators.map(func, thisArg || this);
    // }
}

/**
 * JS AST processor
 * This class can be run on both ends (node, browser)
 */
class ScriptHandler {
    code: string;
    ast: babel.types.File;
    dirty: boolean = false;
    state: { [name: string]: string | number | Array<string> };

    constructor(code: string = '', options?: Object) {
        this.code = code;
        this.resetState();
        this.ast = this.parse(code);
    }

    parse(code: string) {
        return babel.parse(code, {
            filename: 'file.js',
            // Must require manually in VSCode
            plugins: [require('@babel/plugin-syntax-dynamic-import')],
        }) as babel.types.File;
    }

    generate(babelOptions?: babel.GeneratorOptions, prettierOptions?: PrettierOptions, prettierUseBabel?: boolean) {
        if (prettierUseBabel) {
            // Prettier will remove comments when using ast format directly, which is very annoying, so it is better to generate it with babel first and then format it
            return prettier.format(this.code, Object.assign({} as PrettierOptions, prettierConfig, {
                parser: () => this.ast,
            }, prettierOptions));
            // return generate(this.ast, {}, this.code).code + '\n';
        } else {
            const code = generate(this.ast, Object.assign({
                retainLines: true,
                concise: true,
                compact: true,
            }, babelOptions)).code;

            let formatted = prettier.format(code, Object.assign({
                parser: 'babel',
                plugins: [parserBabylon],
            } as PrettierOptions, prettierConfig, prettierOptions));
            
            return formatted.replace(/component: \(\) =>\s+import\(([\s\S]+?)\),/g, (m, $1) => {
                return `component: () => import(${$1.replace(/\n\s+/g, ' ').trim()}),`;
            });
        }
    }

    resetState() {
        this.state = {};
    }

    /**
     * Import
     * @param specifier indicator
     * @example
     * $js.import('*').from('./u-button.vue');
     * $js.import('UButton').from('./u-button.vue');
     * $js.import({ default: 'UButton', UButton2: '', UButton3: 'UButton3' }).from('./u-button.vue');
     */
    import(specifier: string | { [imported: string]: string }) {
        if (typeof specifier === 'object') {
            const insideString = Object.keys(specifier).map((imported) => {
                const identifer = (specifier as { [imported: string]: string })[imported];
                return imported + (identifer === imported || identifer === '' ? '' : ' as ' + identifer);
            }).join(', ');
            specifier = `{ ${insideString} }`;
        }
        this.state.declaration = 'import';
        this.state.specifier = specifier;
        return this;
    }

    /**
     * Used to handle search, delete, etc. operations in all import sets
     */
    imports() {
        return new ImportsHandler(this.ast.program.body);
    }

    /**
     * Used to handle search, delete, etc. operations in all export collections
     */
    exports() {
        return new ExportsHandler(this.ast.program.body);
    }

    export(specifier?: string | { [imported: string]: string }) {
        if (typeof specifier === 'object') {
            const insideString = Object.keys(specifier).map((imported) => {
                const identifer = (specifier as { [imported: string]: string })[imported];
                return imported + (identifer === imported || identifer === '' ? '' : ' as ' + identifer);
            }).join(', ');
            specifier = `{ ${insideString} }`;
        }
        this.state.declaration = 'export';
        this.state.specifier = specifier;
        return this;
    }

    /**
     * Where to import from
     * If the same path is encountered, the previous one will be replaced; if there is no same path, it will be added after the last ImportDeclaration
     * @param source file path
     */
    from(source: string) {
        const body = this.ast.program.body;
        if (this.state.declaration === 'import') {
            let existingIndex = body.findIndex((node) => node.type === 'ImportDeclaration' && node.source && node.source.value === source);

            const importString = this.state.specifier;
            if (!importString)
                throw new Error('No import called before from');
            const importDeclaration = babel.template(`import ${importString} from '${source}'`)() as babel.types.ImportDeclaration;
            if (~existingIndex) {
                body.splice(existingIndex, 1, importDeclaration);
                this.state.lastIndex = existingIndex;
            } else {
                let i;
                for (i = body.length - 1; i >= 0; i--) {
                    const node = body[i];
                    if (node.type === 'ImportDeclaration')
                        break;
                }
                i++;
                body.splice(i, 0, importDeclaration);
                this.state.lastIndex = i;
            }
        } else if (this.state.declaration === 'export') {
            let existingIndex = body.findIndex((node) => (node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration') && node.source && node.source.value === source);

            const exportString = this.state.specifier;
            if (!exportString)
                throw new Error('No export called before from');
            const exportDeclaration = babel.template(`export ${exportString} from '${source}'`)() as babel.types.ExportNamedDeclaration;
            if (~existingIndex) {
                body.splice(existingIndex, 1, exportDeclaration);
                this.state.lastIndex = existingIndex;
            } else {
                let i;
                for (i = body.length - 1; i >= 0; i--) {
                    const node = body[i];
                    if (node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration')
                        break;
                }
                i++;
                body.splice(i, 0, exportDeclaration);
                this.state.lastIndex = i;
            }
        } else {
            throw new Error('You must call import or export before from');
        }

        this.resetState();
        return this;
    }

    /**
     * Get all import and export statements containing from
     * import xxx from 'source'/export xxx from 'source'
     * Generally used to determine existence or deletion
     */
    froms() {
        return new FromsHandler(this.ast.program.body);
    }

    default() {
        let result: DeclarationHandler;
        babel.traverse(this.ast, {
            ExportDefaultDeclaration(nodeInfo) {
                result = new DeclarationHandler(nodeInfo.node.declaration, nodeInfo.node);
            },
        });
        return result;
    }

    // delete() {
    //     if (this.state.lastIndex === undefined)
    //         return;
    //         // throw new Error('Import node index Required!');

    //     const body = this.ast.program.body;
    //     body.splice(this.state.lastIndex as number, 1);
    //     this.state.lastIndex = undefined;
    // }

     /**
     * Used to process search, deletion, and other operations in the collection of all variables in the current level scope
     */
    variables() {
        return new StatementHandler(this.ast.program.body);
    }

    /**
     * Process mixins without deduplication, reuse directly
     */
    mergeArray(thisArray: babel.types.ArrayExpression, thatArray: babel.types.ArrayExpression) {
        const thisIdentifiers: Map<string, true> = new Map();
        thisArray.elements.forEach((element) => {
            if (element.type === 'Identifier')
                thisIdentifiers.set(element.name, true);
        });

        const replacements: { [old: string]: string } = {};
        thatArray.elements.forEach((element) => {
            if (element.type === 'Identifier') {
                if (thisIdentifiers.has(element.name))
                    return;
                // const newName = uniqueInMap(element.name, thisIdentifiers);
                // if (newName !== element.name)
                //     element.name = replacements[element.name] = newName;
            }
            thisArray.elements.push(element);
        });

        return replacements;
    }

    mergeObject(thisObject: babel.types.ObjectExpression, thatObject: babel.types.ObjectExpression) {
        const thisKeys: Map<string, true> = new Map();
        thisObject.properties.forEach((property) => {
            if (property.type !== 'SpreadElement' && property.key.type === 'Identifier')
                thisKeys.set(property.key.name, true);
        });

        const replacements: { [old: string]: string } = {};
        thatObject.properties.forEach((property) => {
            if (property.type !== 'SpreadElement' && property.key.type === 'Identifier') {
                const newName = uniqueInMap(property.key.name, thisKeys);
                if (newName !== property.key.name)
                    property.key.name = replacements[property.key.name] = newName;
            }
            thisObject.properties.push(property);
        });

        return replacements;
    }

    /**
     * No matter if params are different
     * @param thisFunction
     * @param thatFunction
     */
    mergeFunction(thisFunction: babel.types.ObjectMethod | babel.types.FunctionExpression | babel.types.ArrowFunctionExpression, thatFunction: babel.types.ObjectMethod | babel.types.FunctionExpression | babel.types.ArrowFunctionExpression) {
        const thisBody = (thisFunction.body as babel.types.BlockStatement).body;
        const thatBody = (thatFunction.body as babel.types.BlockStatement).body;

        const thisVariables: Map<string, true> = new Map();
        const thisStatement = new StatementHandler(thisBody);
        const thisReturn = thisStatement.return();
        const thisReturnIndex = thisReturn ? thisBody.indexOf(thisReturn) : thisBody.length;
        thisStatement.declarators.forEach((declarator) => {
            if (declarator.id.type === 'Identifier')
                thisVariables.set(declarator.id.name, true);
            // else @TODO: handle other destruction situations
        });

        let replacements: { [key: string]: { [old: string]: string } } = { variables: {}, return: {} };
        thatBody.forEach((node) => {
            if (node.type === 'VariableDeclaration') {
                node.declarations.forEach((declarator) => {
                    if (declarator.id.type === 'Identifier') {
                        const newName = uniqueInMap(declarator.id.name, thisVariables);
                        if (newName !== declarator.id.name)
                            declarator.id.name = replacements['variables'][declarator.id.name] = newName;
                    }
                });
            } else if (thisReturn && node.type === 'ReturnStatement') {
                if (thisReturn.argument.type === 'ObjectExpression' && node.argument.type === 'ObjectExpression') {
                    replacements['return'] = this.mergeObject(
                        thisReturn.argument,
                        node.argument,
                    );
                    return;
                } else {
                    console.error('Returns cannot be merged!');
                }
            }
            thisBody.splice(thisReturnIndex, 0, node);
        });

        return replacements;
    }

    mergeVueObject(thisObject: babel.types.ObjectExpression, thatObject: babel.types.ObjectExpression) {
        const thisProperties = thisObject.properties;
        const thisPropertiesMap: { [key: string]: babel.types.ObjectProperty | babel.types.ObjectMethod } = {};
        thisProperties.forEach((property) => {
            if (property.type !== 'SpreadElement' && property.key.type === 'Identifier')
                thisPropertiesMap[property.key.name] = property;
        });

        let thatOrderIndex = -1;
        const orderIndexOf = (optionsKey: string, lastIndex: number) => {
            const index = ORDER_IN_COMPONENTS_MAP[optionsKey];
            return index === undefined ? lastIndex : index;
        }
        const OBJECT_OPTIONS = ['components', 'directives', 'filters', 'props', 'propsData', 'computed', 'watch', 'methods'];
        const replacements: { [key: string]: { [old: string]: string } } = {};
        thatObject.properties.forEach((thatProperty) => {
            // Directly merge { ...obj }
            if (thatProperty.type === 'SpreadElement' || thatProperty.key.type !== 'Identifier')
                return thisProperties.push(thatProperty);

            const thatKey = thatProperty.key.name;
            let insertIndex = thisProperties.length;
            if (thisPropertiesMap[thatKey]) {
                const thisProperty = thisPropertiesMap[thatKey];
                if (OBJECT_OPTIONS.includes(thatKey)) {
                    replacements[thatKey] = this.mergeObject(
                        (thisProperty as babel.types.ObjectProperty).value as babel.types.ObjectExpression,
                        (thatProperty as babel.types.ObjectProperty).value as babel.types.ObjectExpression,
                    );
                    return;
                } else if (thatKey === 'mixins') {
                    replacements['mixins'] = this.mergeArray(
                        (thisProperty as babel.types.ObjectProperty).value as babel.types.ArrayExpression,
                        (thatProperty as babel.types.ObjectProperty).value as babel.types.ArrayExpression,
                    );
                    return;
                } else if (LIFECYCLE_HOOKS.includes(thatKey)) {
                    let thisFunction: babel.types.ObjectMethod | babel.types.FunctionExpression | babel.types.ArrowFunctionExpression;
                    let thatFunction: babel.types.ObjectMethod | babel.types.FunctionExpression | babel.types.ArrowFunctionExpression;

                    if (thisProperty.type === 'ObjectMethod')
                        thisFunction = thisProperty;
                    else {
                        thisFunction = thisProperty.value as babel.types.FunctionExpression;
                    }

                    if (thatProperty.type === 'ObjectMethod')
                        thatFunction = thatProperty;
                    else {
                        thatFunction = thatProperty.value as babel.types.FunctionExpression;
                    }

                    /**
                     * data: Object is not handled
                     */
                    this.mergeFunction(thisFunction, thatFunction);
                    return;
                } else if (thatKey === 'data') {
                    let thisFunction: babel.types.ObjectMethod | babel.types.FunctionExpression | babel.types.ArrowFunctionExpression;
                    let thatFunction: babel.types.ObjectMethod | babel.types.FunctionExpression | babel.types.ArrowFunctionExpression;

                    if (thisProperty.type === 'ObjectMethod')
                        thisFunction = thisProperty;
                    else {
                        thisFunction = thisProperty.value as babel.types.FunctionExpression;
                    }

                    if (thatProperty.type === 'ObjectMethod')
                        thatFunction = thatProperty;
                    else {
                        thatFunction = thatProperty.value as babel.types.FunctionExpression;
                    }

                    /**
                     * data: Object is not handled
                     */
                    const dataResult = this.mergeFunction(thisFunction, thatFunction);
                    replacements['data'] = dataResult.return;
                    return;
                } else {
                    // [
                    // 'he',
                    //     'name',
                    //     'parent',
                    //     'functional',
                    //     ['delimiters', 'comments'],
                    //     'extends',
                    //     'inheritAttrs',
                    //     'model',
                    //     ['template', 'render'],
                    //     'renderError'
                    // ]
                    if (thisProperty.type === 'ObjectProperty' && thatProperty.type === 'ObjectProperty'
                        && generate(thisProperty.value, { minified: true }).code ===  generate(thisProperty.value, { minified: true }).code)
                            return;
                    console.warn(`Not sure how to merge option ${thatKey}, the result of processing is to merge it with the original option!\n`);
                    insertIndex = thisProperties.indexOf(thisPropertiesMap[thatKey]) + 1;
                }
            } else {
                /* Find the right place to insert */
                thatOrderIndex = orderIndexOf(thatProperty.key.name, thatOrderIndex);
                let thisOrderIndex = -1;
                for (let i = 0; i < thisProperties.length; i++) {
                    const thisProperty = thisProperties[i];
                    if (thisProperty.type !== 'SpreadElement' && thisProperty.key.type === 'Identifier') {
                        thisOrderIndex = orderIndexOf(thisProperty.key.name, thisOrderIndex);
                        if (thisProperty.key.name === thatProperty.key.name) {
                            insertIndex = i + 1;
                            break;
                        } else if (thisOrderIndex > thatOrderIndex) {
                            insertIndex = i;
                            break;
                        }
                    }
                }
            }
            thisProperties.splice(insertIndex, 0, thatProperty);
        });

        return replacements;
    }

    /**
     * Merge another script from that into the current style
     * The principle is to process the code in the list, and merge the others naturally (so there may be problems)
     * @TODO Currently have changes to the style ast of another that
     * @param that another ScriptHandler
     */
    merge(that: ScriptHandler) {
        const thisBody = this.ast.program.body;
        const thatBody = that.ast.program.body;

        const imports = this.imports();
        let afterImportIndex = imports.lastIndex() + 1;
        let exportDefaultIndex = thisBody.findIndex((node) => node.type === 'ExportDefaultDeclaration');
        const hasExportDefault = !!~exportDefaultIndex;
        if (!hasExportDefault)
            exportDefaultIndex = thisBody.length;

        const thisVariables: Map<string, true> = new Map();
        this.variables().declarators.forEach((declarator) => {
            if (declarator.id.type === 'Identifier')
                thisVariables.set(declarator.id.name, true);
            // else @TODO: handle other destruction situations
        });

        let replacements: { [key: string]: { [old: string]: string } } = { variables: {} };
        thatBody.forEach((node) => {
            if (node.type === 'ImportDeclaration') { // @TODO Don't repeat the import identifier for now. This is rare in blocks. Because the import surrounding files become external()
                const index = imports.findIndexFrom(node.source.value);
                if (~index && generate(thisBody[index], { minified: true }).code === generate(node, { minified: true }).code)
                    thisBody.splice(index, 1, node);
                else
                    thisBody.splice(afterImportIndex++, 0, node);
            } else if (node.type === 'VariableDeclaration') {
                node.declarations.forEach((declarator) => {
                    if (declarator.id.type === 'Identifier') {
                        const newName = uniqueInMap(declarator.id.name, thisVariables);
                        if (newName !== declarator.id.name)
                            declarator.id.name = replacements['variables'][declarator.id.name] = newName;
                    }
                });
                thisBody.splice(exportDefaultIndex++, 0, node);
            } else if (node.type === 'ExportDefaultDeclaration' && hasExportDefault) { // This place is in the loop, but it will only go through once; if you have two export defaults, I will eat the code! !
                /*
                  Dealing with Vue's big picture
                  Follow Vue ComponentOptions for processing https://github.com/vuejs/vue/blob/dev/types/options.d.ts#L67
                  For order, refer to https://eslint.vuejs.org/rules/order-in-components.html#options
                */
                const thisExportDefault = this.export().default();
                if (!thisExportDefault.is('object')) // If it is not an object, no processing
                    return thisBody.splice(exportDefaultIndex++, 0, node);
                const thatExportDefault = that.export().default();
                if (!thatExportDefault.is('object')) // If it is not an object, no processing
                    return thisBody.splice(exportDefaultIndex++, 0, node);

                replacements = this.mergeVueObject(
                    thisExportDefault.node as babel.types.ObjectExpression,
                    thatExportDefault.node as babel.types.ObjectExpression,
                );
            } else { // Insert by default to the position of export default or at the end
                thisBody.splice(exportDefaultIndex++, 0, node);
            }
        });

        /* Process this in code */
        const identifierMap = { ...replacements['props'], ...replacements['data'], ...replacements['computed'], ...replacements['methods'] };
        babel.traverse(that.ast, {
            Identifier(nodeInfo) {
                if (nodeInfo.parent.type === 'MemberExpression' && nodeInfo.parent.object.type === 'ThisExpression') {
                    if (identifierMap[nodeInfo.node.name])
                        nodeInfo.node.name = identifierMap[nodeInfo.node.name];
                }
            },
        });

        return replacements;
    }
}

export default ScriptHandler;
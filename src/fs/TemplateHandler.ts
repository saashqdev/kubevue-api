import * as compiler from 'vue-template-compiler';
import * as babel from '@babel/core';
import generate from '@babel/generator';
// import * as prettier from 'prettier';
import { uniqueInMap } from '../utils/shared';

export class ASTNodeInfo {
    constructor(
        public node: compiler.ASTNode,
        public parent: compiler.ASTElement,
        public route: string = '',
    ) {}

    remove() {
        const index = this.parent.children.indexOf(this.node);
        if (~index)
            this.parent.children.splice(index, 1);
        else if (this.parent.scopedSlots && this.parent.scopedSlots[(this.node as ASTElement).slotTarget] === this.node)
            delete this.parent.scopedSlots[(this.node as ASTElement).slotTarget];
    }
}


type Attr = { name: string, value: any, start?: number, end?: number };
type ASTElement = compiler.ASTElement
//  & {
//     rawAttrsMap: {
//         [name: string]: Attr,
//     }
// }

export interface TemplateOptions {
    tabLength?: number,
    startLevel?: number,
};

/**
 * Template AST processor
 * This class can be run on both ends (node, browser)
 */
class TemplateHandler {
    code: string;
    ast: ASTElement;
    options: TemplateOptions;

    constructor(code: string = '', options?: TemplateOptions) {
        this.code = code;
        this.ast = this.parse(code) as ASTElement;
        this.options = Object.assign({
            tabLength: 4,
            startLevel: 0,
        }, options);
    }

    parse(code: string) {
        const compilerOptions: compiler.CompilerOptions = {
            preserveWhitespace: false,
            outputSourceRange: true,
        };

        return compiler.compile(code, compilerOptions).ast;
    }

    generate(options?: TemplateOptions) {
        options = Object.assign({}, this.options, options);

        // @TODO: There is no good generate yet
        const tabs = ' '.repeat(options.tabLength*options.startLevel);
        return tabs + this.generateElement(this.ast, options.startLevel, options) + '\n';
        // return this.code;
    }

    generateElement(el: ASTElement, level: number, options: TemplateOptions) {
        const tabs = ' '.repeat(options.tabLength*level);
        const insideTabs = ' '.repeat(options.tabLength*(level + 1));

        let shouldFormat = true;
        const children: Array<ASTElement> = [].concat(el.children, !el.scopedSlots ? [] : Object.keys(el.scopedSlots).map((key) => el.scopedSlots[key]));
        // Need to handle v-else-if and v-else
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.ifConditions) {
                child.ifConditions.forEach((condition) => {
                    if (condition.block !== child) {
                        children.splice(i + 1, 0, condition.block);
                        i++;
                    }
                });
            }
        }

        const content: string = children.map((node) => {
            let text = '';

            if (node.type === 1)
                text = (shouldFormat ? '\n' + insideTabs : '') + this.generateElement(node as ASTElement, level + 1, options);
            else if (node.type === 2)
                text = node.text;
            else if (node.type === 3)
                text = node.text;
            else
                console.log(node);

            shouldFormat = node.type === 1;
            return text;
        }).join('');

        if (!content)
            shouldFormat = false;

        const attrs = Object.keys(el.attrsMap).map((key) => {
            if (key.startsWith('kubevue-'))
                return '';

            const value = el.attrsMap[key];
            if (value === '') {
                // const attr = (el as any).rawAttrsMap[key];
                // if (attr && attr.end - attr.start === key.length)
                    return key;
            }
            return `${key}="${value}"`;
        });

        let attrsLength = 0;
        let attrsString = '';
        attrs.forEach((attr) => {
            if (!attr)
                return;
            if (attrsLength >= 120 || attr.length >= 120) {
                attrsString += '\n' + tabs + ' '.repeat(3) // ' '.repeat(el.tag.length + 1);
                attrsLength = 0;
            }
            attrsString += ' ' + attr;
            attrsLength += attr.length;
        })


        return `<${el.tag}${attrs.length ? attrsString : ''}>` + content + (shouldFormat ? '\n' + tabs : '') + `</${el.tag}>`;
    }

    traverse(func: (nodeInfo: ASTNodeInfo) => any) {
        let queue: Array<ASTNodeInfo> = [];
        queue = queue.concat(new ASTNodeInfo(this.ast, null, ''));
        let nodeInfo: ASTNodeInfo;
        while ((nodeInfo = queue.shift())) {
            if (nodeInfo.node.type === 1) {
                const parent = nodeInfo.node as ASTElement;
                const children = [].concat(parent.children, !parent.scopedSlots ? [] : Object.keys(parent.scopedSlots).map((key) => parent.scopedSlots[key]));
                queue.push(... children.map((node, index) => new ASTNodeInfo(node, parent, nodeInfo.route + '/' + index)));
            }
            const result = func(nodeInfo);
            if (result !== undefined)
                return result;
        }
    }

    /**
     * Find child nodes based on the path
     * @param nodePath node path, /1/2 means the second child node of the first child node of the root node
     * @param node The starting node to search
     * @examples
     * - findByNodePath('', root) refers to the root node itself
     * - findByNodePath('/', root) refers to the root node itself
     * - findByNodePath('/0', root) refers to the 0th child node
     * - findByNodePath('/2/1', root) refers to the first child node of the second child node
     */
    findByNodePath(nodePath: string, node: compiler.ASTNode): compiler.ASTNode {
        if (nodePath[0] === '/') // The relative and absolute are the same here
            nodePath = nodePath.slice(1);
        const arr = nodePath.split('/');
        if (!nodePath || !arr.length)
            return node;
        else {
            const parent = node as ASTElement;
            const children = [].concat(parent.children, !parent.scopedSlots ? [] : Object.keys(parent.scopedSlots).map((key) => parent.scopedSlots[key]));
            return this.findByNodePath(arr.slice(1).join('/'), children[+arr[0]]);
        }
    }

    findByRoute(route: string, node: compiler.ASTNode): compiler.ASTNode {
        return this.findByNodePath(route, node);
    }

    /**
     * This function handles a trial phase
     * @param position
     */
    findByPosition(position: number | { line: number, character: number }): compiler.ASTNode {
        if (typeof position === 'object') {
            let pos = 0;
            const lines = this.code.split('\n');
            for (let i = 0; i < position.line - 1; i++)
                pos += lines[i].length + 1;
            pos += position.character - this.options.tabLength * this.options.startLevel;
            position = pos;
        }

        let found: compiler.ASTNode;
        this.traverse((nodeInfo) => {
            const node = nodeInfo.node as any;
            if (node.start <= position && position < node.end)
                found = node as compiler.ASTNode;
        });

        if (!found)
            return this.ast;
        return found;
    }

    /**
     * Merge another template from that into the current template
     * @param that another TemplateHandler
     * @param route The node path to be inserted. The last digit indicates the node position. If it is empty, it means the last one. For example, /1/2/1 means inserting into the first position of the second child node of the first child node of the root node.
     * - merge(that, '') refers to the root node itself
     * - merge(that, '/') refers to the root node itself
     * - merge(that, '/0') refers to the 0th child node
     * - merge(that, '/2/1') refers to the first child of the second child
     * - merge(that, '/2/') refers to the last part of the second child node
     * @param replacements The styles and variables that need to be replaced
     */
    merge(that: TemplateHandler, route: string | number | { line: number, character: number }, replacements?: { [key: string]: { [old: string]: string } }) {
        replacements = replacements || {};
        replacements.ref = {};

        const thisRefKeys: Set<string> = new Set();
        this.traverse((nodeInfo) => {
            if (nodeInfo.node.type !== 1)
                return;

            if (nodeInfo.node.attrsMap.ref)
                thisRefKeys.add(nodeInfo.node.attrsMap.ref);
        });
        that.traverse((nodeInfo) => {
            if (nodeInfo.node.type !== 1)
                return;

            const ref = nodeInfo.node.attrsMap.ref;
            if (ref) {
                const newRef = uniqueInMap(ref, thisRefKeys);
                if (newRef !== ref)
                    replacements['ref'][ref] = newRef;
                nodeInfo.node.attrsMap.ref = newRef;
            }
        });

        /**
         * Replacements
         */
        {
            const classKeys = Object.keys(replacements['class'] || {});
            // @TODO: 'directives', 'filters'
            const identifierMap = { ...replacements['props'], ...replacements['data'], ...replacements['computed'], ...replacements['methods'], ...replacements['data2'], ...replacements['logic'] };
            const identifierKeys = Object.keys(identifierMap);
            function fix(expr: string) {
                const ast = babel.parse('const __RESULT__ = ' + expr, {
                    filename: 'file.js',
                });
                let changed = false;
                // Replacement is a low-probability event, and it mainly replaces the Block, so there is no need to consider too many situations
                babel.traverse(ast, {
                    Identifier(nodeInfo) {
                        if (nodeInfo.parent.type === 'MemberExpression' && nodeInfo.parent.object.type === 'Identifier' && nodeInfo.parent.object.name === '$refs') {
                            if (replacements['ref'][nodeInfo.node.name]) {
                                nodeInfo.node.name = replacements['ref'][nodeInfo.node.name];
                                changed = true;
                            }
                        }

                        if (nodeInfo.parent.type === 'MemberExpression' && nodeInfo.parent.object.type !== 'ThisExpression' && nodeInfo.parent.property === nodeInfo.node)
                            return nodeInfo.skip();
                        if (identifierMap[nodeInfo.node.name]) {
                            nodeInfo.node.name = identifierMap[nodeInfo.node.name];
                            changed = true;
                        }
                    },
                    Function(nodeInfo) { // @TODO: Function scope issue
                        nodeInfo.skip();
                    },
                });
                return changed ? generate(((ast as babel.types.File).program.body[0] as babel.types.VariableDeclaration).declarations[0].init, { concise: true }).code : expr;
            }

            // @TODO: v-for internal scope issue
            // @TODO: classBinding, styleBinding
            that.traverse((nodeInfo) => {
                if (nodeInfo.node.type === 1) {
                    const node = nodeInfo.node;
                    if (classKeys.length && node.classBinding) {
                        classKeys.forEach((key) => {
                            node.attrsMap[':class'] = node.classBinding = node.classBinding
                                .replace(new RegExp(`(\\$style\\.)${key}(?![-_a-zA-Z0-9])|(\\$style\\[['"])${key}(?![-_a-zA-Z0-9])(['"]\\])`, 'g'), (m, $1, $2, $3) => {
                                    if ($1)
                                        return $1 + replacements['class'][key];
                                    else
                                        return $2 + replacements['class'][key] + $3;
                                });
                        });
                    }
                    if (identifierKeys.length) {
                        /* attrsList contains binding attributes, events and instructions, but no v-if, v-for and class */
                        node.attrsList.forEach((attr, index) => {
                            if (attr.name.startsWith(':') || attr.name.startsWith('@') || attr.name.startsWith('v-')) {
                                const newExpr = fix(attr.value);
                                if (newExpr !== attr.value) {
                                    attr.value = newExpr;
                                    node.attrsMap[attr.name] = newExpr;

                                    let pureName: string;
                                    if (attr.name.startsWith(':'))
                                        pureName = attr.name.slice(1);
                                    else if (attr.name.startsWith('v-bind:'))
                                        pureName = attr.name.slice(7);
                                    if (pureName) {
                                        const realAttr = node.attrs.find((realAttr) => realAttr.name === pureName);
                                        realAttr && (realAttr.value = newExpr);
                                        return;
                                    }

                                    if (attr.name.startsWith('@'))
                                        pureName = attr.name.slice(1);
                                    if (attr.name.startsWith('v-on:'))
                                        pureName = attr.name.slice(5);
                                    if (pureName) {
                                        const event = node.events && node.events[pureName] as compiler.ASTElementHandler;
                                        event && (event.value = newExpr);
                                        const nativeEvent = node.nativeEvents && node.nativeEvents[pureName] as compiler.ASTElementHandler;
                                        nativeEvent && (nativeEvent.value = newExpr);
                                        return;
                                    }

                                    if (attr.name.startsWith('v-')) {
                                        const directive = node.directives.find((directive) => directive.rawName === attr.name)
                                        if (directive) {
                                            directive.value = newExpr;
                                            if (directive.name === 'model') {
                                                node.model.value = `(${newExpr})`;
                                                node.model.expression = `"${newExpr}"`;
                                                node.model.callback // = `"${newExpr}"`;
                                            }
                                        }
                                    }
                                }
                            }
                        });

                        if (node.if) {
                            const newExpr = fix(node.if);
                            if (newExpr !== node.if) {
                                node.if = newExpr;
                                node.ifConditions[0].exp = newExpr;
                                node.attrsMap['v-if'] = newExpr;
                            }
                        }
                        if (node.elseif) {
                            const newExpr = fix(node.elseif);
                            if (newExpr !== node.elseif) {
                                node.elseif = newExpr;
                                node.attrsMap['v-else-if'] = newExpr;
                            }
                        }
                        if (node.for) {
                            const newExpr = fix(node.for);
                            if (newExpr !== node.for) {
                                node.for = newExpr;
                                node.attrsMap['v-for'] = (node.attrsMap['v-for'] as string).replace(/(\s+(?:in|of)\s+)(.+)$/, (m, $1) => $1 + newExpr);
                            }
                        }
                    }
                } else if (nodeInfo.node.type === 2) {
                    const node = nodeInfo.node;
                    let changed = false;
                    const text = node.tokens.map((token) => {
                        if (typeof token !== 'string') {
                            const newExpr = fix(token['@binding']);
                            if (newExpr !== token['@binding']) {
                                token['@binding'] = newExpr;
                                changed = true;
                            }
                            return `{{ ${token['@binding']} }}`;
                        } else
                            return token;
                    }).join('');

                    if (changed)
                        node.text = text;
                }
            });
        }

        let el: compiler.ASTElement;
        let index: number = 0;
        if (typeof route === 'string') {
            if (route[0] === '/') // relative and absolute are the same here
                route = route.slice(1);
            const arr = route.split('/');
            const last = arr[arr.length - 1];

            const parentNodePath = arr.slice(0, -1).join('/');
            el = this.findByNodePath(parentNodePath, this.ast) as compiler.ASTElement;
            index = last === undefined || last === '' ? el.children.length : +last;
        } else {
            el = this.findByPosition(route) as compiler.ASTElement;
            index = el.children.length;
        }
        if (!el.children)
            throw new Error(`Not an element node! route: ${route}`);
        el.children.splice(index, 0, that.ast);
    }
}

export default TemplateHandler;
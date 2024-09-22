import * as postcss from 'postcss';
import { uniqueInMap } from '../utils/shared';

/**
 * Style AST processor
 * This class can be run on both ends (node, browser)
 */
class StyleHandler {
    code: string;
    ast: postcss.Root;
    dirty: boolean = false;

    constructor(code: string = '', options?: Object) {
        this.code = code;
        this.ast = this.parse(code);
    }

    parse(code: string) {
        return postcss.parse(code);
    }

    generate() {
        return this.ast.toString();
    }

   /**
     * Merge the style of another that into the current style
     * @TODO Currently have changes to the style ast of another that
     * @param that another StyleHandler
     * @param index The position to insert
     */
    merge(that: StyleHandler, index?: number) {
        const firstNode = that.ast.nodes[0];
        if (firstNode)
            firstNode.raws.before = '\n\n';

        if (index === undefined)
            index = this.ast.nodes.length;

        const thisClasses: Map<string, true> = new Map();
        this.ast.walkRules((rule) => {
            const re = /\.[-_a-zA-Z0-9]+/g;
            let cap: RegExpExecArray;
            while(cap = re.exec(rule.selector)) {
                thisClasses.set(cap[0], true);
            }
        });

        const classMap: { [old: string]: string } = {};
        that.ast.walkRules((rule) => {
            const re = /\.[-_a-zA-Z0-9]+/g;
            let cap: RegExpExecArray;
            while(cap = re.exec(rule.selector)) {
                let cls = uniqueInMap(cap[0], thisClasses);
                if (cls !== cap[0]) {
                    classMap[cap[0].slice(1)] = cls.slice(1);
                    rule.selector = rule.selector.slice(0, cap.index) + cls + rule.selector.slice(cap.index + cap[0].length);
                }
            }
        });

        this.ast.nodes.splice(index, 0, ...that.ast.nodes);

        return { class: classMap };
    }

      /**
     * Append another that style to the current style
     * @TODO Currently have changes to the style ast of another that
     * @param that another StyleHandler
     */
    append(that: StyleHandler) {
        const firstNode = that.ast.nodes[0];
        if (firstNode)
            firstNode.raws.before = '\n\n';

        this.ast.nodes.push(...that.ast.nodes);
    }
}

export default StyleHandler;
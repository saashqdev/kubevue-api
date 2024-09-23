/**
 * This module can run on both the Node.js side and the browser side
 */

/**
 * Underline format -convert-> camel case format
 * @param name original name
 * @return converted name
 */
export const kebab2Camel = (name: string) => name.replace(/(?:^|-)([a-zA-Z0-9])/g, (m, $1) => $1.toUpperCase()) ;

/**
 * CamelCase format -convert->underline format
 * @param name original name
 * @return converted name
 */
export const Camel2kebab = (name: string) => name.replace(/([A-Z]|[0-9]+)/g, (m, $1, offset) => (offset ? '-' : '') + $1.toLowerCase());


export function uniqueInMap(key: string, map: Map<string, any> | Set<string>, start: number = 1) {
    while (map.has(key))
        key = key.replace(/\d*$/, (m) => String(m === '' ? start : +m + 1));
    return key;
}

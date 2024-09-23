import * as fs from 'fs-extra';
import * as path from 'path';
import { kebab2Camel, Camel2kebab } from './shared';
import { stringify } from 'javascript-stringify';

/**
 * Avoid names with the same name
 * @param dirPath directory name
 * @param baseName The base name of the file without extension, such as `u-sample`
 * @param extName file extension, such as `.vue`
 * @return new combined path
 */
export function avoidSameName(fullPath: string): string;
export function avoidSameName(dirPath: string, baseName: string, extName: string): string;
export function avoidSameName(dirPath: string, baseName?: string, extName?: string) {
    if (baseName === undefined && extName === undefined) {
        extName = path.extname(dirPath);
        baseName = path.basename(dirPath, extName);
        dirPath = path.dirname(dirPath);
    }

    let dest = path.join(dirPath, `${baseName}${extName}`);
    let count = 1;
    while (fs.existsSync(dest))
        dest = path.join(dirPath, `${baseName}-${count++}${extName}`);
    return dest;
}

/**
 * Standard component name
 * @param componentName The original component name, which may be in camel case or underscore format
 * @return baseName is in underscore format, componentName is in camel case format
 */
export function normalizeName(componentName?: string) {
    let baseName = componentName;
    if (componentName) {
        if (componentName.includes('-'))
            componentName = kebab2Camel(baseName);
        else
            baseName = Camel2kebab(componentName);
        return { baseName, componentName };
    } else
        return { baseName: 'u-sample', componentName: 'USample' };
}

/**
 * This module has eval, use it with caution and consider removing it later.
 */
export const JS = {
    parse(source: string) {
        const content = source.trim().replace(/export default |module\.exports +=/, '');
        return eval('(function(){return ' + content + '})()');
    },
    stringify,
};
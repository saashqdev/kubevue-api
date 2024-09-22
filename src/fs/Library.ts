import * as fs from 'fs-extra';
import * as path from 'path';
import * as semver from 'semver';
import VueFile from './VueFile';
import JSFile from './JSFile';
import FSEntry from './FSEntry';
import { listAllFiles } from './';
import { config, Directory } from '..';
import { kubevueConfig, MaterialInfo } from '../config/getDefaults';
import PackageJSON from '../types/PackageJSON';


export enum LibraryType {
    internal = 'internal',
    external = 'external',
    other = 'other',
}

/**
 * Library
 * libraryPath points to a folder containing multiple types, such as `./src`, which is used to quickly index the directory
 */
export default class Library {
    libraryType: LibraryType;
    fullPath: string;
    libraryPath: string;
    fileName: string;
    baseName: string;
    extName: string;
    title: string;

    superLibrary: Library;
    superLibraries: Array<Library>;
    otherComponents: Array<VueFile>;

    package: PackageJSON;
    config: kubevueConfig;
    components: Array<VueFile>;
    componentsDirectory: Directory;
    componentsIndexFile: JSFile;
    docsComponentsInfoMap: Map<string, MaterialInfo>;
    blocks: Array<VueFile>;
    directives: Array<FSEntry>;
    filters: Array<FSEntry>;
    formatters: Array<FSEntry>;
    validators: Array<FSEntry>;
    rules: Array<FSEntry>;
    utils: Array<FSEntry>;
    assets: Array<FSEntry>;

    isOpen: boolean;

    constructor(fullPath: string, libraryType: LibraryType) {
        this.fullPath = fullPath;
        this.libraryType = libraryType;
        this.fileName = path.basename(fullPath);
        this.extName = path.extname(this.fileName);
        this.baseName = path.basename(this.fileName, this.extName);
        this.title = this.baseName;

        this.isOpen = false;
    }

    async open() {
        if (this.isOpen)
            return;
        return this.forceOpen();
    }

    async forceOpen() {
        await this.load();
        this.isOpen = true;
    }

    protected async load() {
        if (!fs.existsSync(this.fullPath))
            throw new Error(`Cannot find: ${this.fullPath}!`);

        const packageJSONPath = path.resolve(this.fullPath, 'package.json');
        if (!fs.existsSync(packageJSONPath))
            return;

        this.package = JSON.parse(await fs.readFile(packageJSONPath, 'utf8'));
        this.config = config.resolve(this.fullPath);
        this.libraryPath = path.resolve(this.fullPath, this.config.libraryPath);
        if (typeof this.config.docs === 'object' && this.config.docs.components) {
            this.docsComponentsInfoMap = new Map<string, MaterialInfo>();
            this.config.docs.components.forEach((componentInfo) => {
                this.docsComponentsInfoMap.set(componentInfo.name, componentInfo);
            });
        }

        /* Find .kubevue or .vue dependencies in package.json */
        const kubevueDeps: Array<string> = [];
        const vueDeps: Array<string> = [];

        Object.keys(this.package.dependencies).forEach((dep) => {
            if (dep.endsWith('.kubevue'))
                kubevueDeps.push(dep);
            else if (dep.endsWith('.vue'))
                vueDeps.push(dep);
        });

        // @TODO: We only have a few libraries, so let’s write them first
        let superLibraryName = kubevueDeps[0];
        if (kubevueDeps.includes('kubevue-ui.kubevue'))
            superLibraryName = 'kubevue-ui.kubevue';
        else if (kubevueDeps.includes('cloud-ui.kubevue'))
            superLibraryName = 'cloud-ui.kubevue';

        this.superLibraries = kubevueDeps.map((dep) => new Library(path.resolve(this.fullPath, 'node_modules', dep), LibraryType.external));
        this.superLibrary = this.superLibraries.find((library) => library.fileName === superLibraryName);

        this.otherComponents = vueDeps.map((dep) => new VueFile(path.resolve(this.fullPath, 'node_modules', dep)));

        if (this.libraryType === LibraryType.internal) {
            this.componentsDirectory = Directory.fetch(path.resolve(this.libraryPath, 'components'));

            const componentsIndexPath = path.resolve(this.componentsDirectory.fullPath, 'index.js');
            if (fs.existsSync(componentsIndexPath))
                this.componentsIndexFile = JSFile.fetch(componentsIndexPath);
        } else if (this.libraryType === LibraryType.external) {
            if (semver.lt(this.package.version, '0.4.0-alpha'))
                this.componentsDirectory = new Directory(path.resolve(this.libraryPath));
            else
                this.componentsDirectory = new Directory(path.resolve(this.libraryPath, 'components'));

            const componentsIndexPath = path.resolve(this.componentsDirectory.fullPath, 'index.js');
            if (fs.existsSync(componentsIndexPath))
                this.componentsIndexFile = new JSFile(componentsIndexPath);
        }

        if (this.componentsDirectory) {
            this.components = listAllFiles(this.componentsDirectory.fullPath, {
                dot: false,
                patterns: ['!**/node_modules', '!**/.git'],
                includes: /\.vue$/,
                excludes: /\.vue[\\/]/,
            }).map((fullPath) => new VueFile(fullPath));
        }
    }

    async forceOpenOthers() {
        if (!fs.existsSync(this.fullPath))
            throw new Error(`Cannot find: ${this.fullPath}!`);

        const packageJSONPath = path.resolve(this.fullPath, 'package.json');
        if (!fs.existsSync(packageJSONPath))
            return;

        this.package = JSON.parse(await fs.readFile(packageJSONPath, 'utf8'));

        /* Find .kubevue or .vue dependencies in package.json */
        const vueDeps: Array<string> = [];
        Object.keys(this.package.dependencies).forEach((dep) => {
            if (dep.endsWith('.vue'))
                vueDeps.push(dep);
        });

        this.otherComponents = vueDeps.map((dep) => new VueFile(path.resolve(this.fullPath, 'node_modules', dep)));
    }
}
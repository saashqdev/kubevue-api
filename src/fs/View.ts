import * as fs from 'fs-extra';
import * as path from 'path';

import FSEntry from './FSEntry';
import VueFile from './VueFile';

export enum ViewType {
    root = 'root',
    entry = 'entry',
    module = 'module',
    branch = 'branch',
    view = 'view', // leaf
    md = 'md', // leaf
}

export const KEYWORD_DIRS = [
    'assets',
    'components',
    'directives',
    'filters',
    'mixins',
    'utils',
    'styles',
    'service',
    'module',
];

export const HOLDER_DIRS = [
    'views',
    'layout',
];

export default class View extends FSEntry {
    viewType: ViewType;
    viewsPath: string;
    parent: View;
    children: View[];
    // vueFile: VueFile;
    routePath: string;
    vueFilePath: string;
    routeMeta: Object;

    constructor(fullPath: string, viewType: ViewType = ViewType.branch, isDirectory: boolean = true, routePath?: string) {
        super(fullPath, isDirectory);

        this.viewType = viewType;
        this.viewsPath = '';
        this.routePath = routePath;
    }

    /**
     * Detect View file type and sub-View in advance
     * Need to be asynchronous, otherwise it may be slow
     */
    async preOpen() {
        if (fs.existsSync(path.join(this.fullPath, 'views')))
            this.viewsPath = 'views';

        if (this.viewType === ViewType.root) {
        } else if (this.viewType === ViewType.entry) {
            this.vueFilePath = path.join(this.fullPath, this.viewsPath, 'index.vue');
        } else if (this.viewType === ViewType.module) {
            this.vueFilePath = path.join(this.fullPath, this.viewsPath, 'index.vue');
        } else if (this.viewType === ViewType.branch) {
            this.vueFilePath = path.join(this.fullPath, this.viewsPath, 'index.vue');
        } else {
            this.vueFilePath = this.fullPath;
        }

        if (this.routePath === undefined) {
            const parentRoutePath = this.parent ? this.parent.routePath : '/';
            if (this.viewType === ViewType.root) {
                this.routePath = '/';
            } else if (this.viewType === ViewType.entry) {
                this.routePath = parentRoutePath + this.baseName + '#/';
            } else if (this.viewType === ViewType.module) {
                this.routePath = parentRoutePath + this.baseName + '/';
            } else if (this.viewType === ViewType.branch) {
                this.routePath = parentRoutePath + this.baseName + '/';
            } else {
                this.routePath = parentRoutePath + this.baseName;
            }
        }

        // this.alias = await this.readTitleInReadme();
    }


    async forceOpen() {
        this.close();
        await this.preOpen();
        await this.load();
        this.isOpen = true;
    }

    close() {
        // this.alias = undefined;
        this.children = undefined;

        this.isOpen = false;
    }

    protected async load() {
        if (!fs.existsSync(this.fullPath))
            throw new Error(`Cannot find: ${this.fullPath}`);

        if (this.viewType === ViewType.vue || this.viewType === ViewType.md) // No need to open
            return;

        const children: Array<View> = [];

        const fileNames = await fs.readdir(path.join(this.fullPath, this.viewsPath));
        fileNames.forEach((name) => {
            const fullPath = path.join(this.fullPath, this.viewsPath, name);
            const isDirectory = fs.statSync(fullPath).isDirectory();
            if (!(isDirectory || name.endsWith('.vue') || name.endsWith('.md')))
                return;
            if (name === '.DS_Store' || name === '.git')
                return;
            if (KEYWORD_DIRS.includes(name) || HOLDER_DIRS.includes(name))
                return;
            if (isDirectory && name.endsWith('.blocks'))
                return;
            if (name === 'index.vue' || name === 'index.md')
                return;

            let view: View;
            // if (this.isWatched)
            //     view = View.fetch(fullPath, ViewType.branch, isDirectory);
            // else
            view = new View(fullPath, ViewType.branch, isDirectory);

            if (fullPath.endsWith('.vue'))
                view.viewType = ViewType.vue;
            else if (fullPath.endsWith('.md'))
                view.viewType = ViewType.md;
            else if (this.viewType === ViewType.root)
                view.viewType = ViewType.entry;
            else if (this.viewType === ViewType.entry && fs.existsSync(path.join(fullPath, 'module/base.js')))
                view.viewType = ViewType.module;

            view.parent = this;
            // view.isChild = true;

            children.push(view);
        });

        children.sort((a, b) => {
            if (a.isDirectory === b.isDirectory)
                return a.fileName.localeCompare(b.fileName);
            else
                return a.isDirectory ? -1 : 1;
        });

        return this.children = children;
    }

    /**
     *
     * @param relativePath
     * @example rootView.find('dashboard')
     * @example rootView.find('dashboard/views/notice/detail.vue')
     */
    async findByRealPath(relativePath: string, openIfNotLoaded: boolean = false, alwaysFindOne: boolean = false): Promise<View> {
        if (!this.children) {
            if (openIfNotLoaded)
                await this.open();
            else
                return;
        }

        relativePath = path.normalize(relativePath);
        const arr = relativePath.split(path.sep);
        if (arr[0] === 'views')
            arr.shift();
        const next = arr[0];
        if (!next)
            throw new Error('Starting root / is not allowed!');

        if (!this.children || !this.children.length || next === 'index.vue' || next === 'index.md')
            return this;
        const childView = this.children.find((view) => view.fileName === next);

        if (arr.length === 0)
            throw new Error('Error path: ' + relativePath);
        else {
            if (!childView)
                return alwaysFindOne ? this : childView;
            else if (arr.length === 1)
                return childView;
            else
                return childView.findByRealPath(arr.slice(1).join(path.sep), openIfNotLoaded, alwaysFindOne);
        }
    }

    async findByRoute(relativePath: string, openIfNotLoaded: boolean = false): Promise<View> {
        if (!this.children) {
            if (openIfNotLoaded)
                await this.open();
            else
                return;
        }

        relativePath = path.normalize(relativePath);
        const arr = relativePath.split(path.sep);
        const next = arr[0];
        if (!next)
            throw new Error('Starting root / is not allowed!');

            const childView = this.children.find((view) => view.baseName === next);
            if (arr.length === 0)
                throw new Error('Error path: ' + relativePath);
            else if (arr.length === 1)
                return childView;
            else if (!childView.isDirectory)
                throw new Error('Not a directory: ' + childView.fullPath);
            else
                return childView.findByRoute(arr.slice(1).join(path.sep), openIfNotLoaded);
    }

    static fetch(fullPath: string, viewType: ViewType = ViewType.branch, isDirectory: boolean = true) {
        return super.fetch(fullPath, viewType, isDirectory) as View;
    }
}
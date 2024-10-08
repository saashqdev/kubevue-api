import * as fs from 'fs-extra';
import * as path from 'path';
import FSEntry from './FSEntry';
import File from './File';

export default class Directory extends FSEntry {
    // Sub-files and folders will be sorted first by file type and then by file name.
    // `undefined` means it has not been opened, and an array means it has been opened.
    children: Array<FSEntry>;

    constructor(fullPath: string) {
        super(fullPath, true);
    }

    async forceOpen() {
        this.close();
        await this.load();
        this.isOpen = true;
    }

    close() {
        this.children = undefined;
        this.isOpen = false;
    }

    protected async load() {
        if (!fs.existsSync(this.fullPath))
            throw new Error(`Cannot find: ${this.fullPath}`);

        const children: Array<FSEntry> = [];
        const fileNames = await fs.readdir(this.fullPath);

        fileNames.forEach((name) => {
            if (name === '.DS_Store' || name === '.git')
                return;

            const fullPath = path.join(this.fullPath, name);
            const isDirectory = fs.statSync(fullPath).isDirectory();

            let fsEntry: FSEntry;
            // if (this.isWatched)
            //     fsEntry = isDirectory ? Directory.fetch(fullPath) : File.fetch(fullPath);
            // else
            fsEntry = isDirectory ? new Directory(fullPath) : new File(fullPath);
            children.push(fsEntry);
        });

        children.sort((a, b) => {
            if (a.isDirectory === b.isDirectory)
                return a.fileName.localeCompare(b.fileName);
            else
                return a.isDirectory ? -1 : 1;
        });

        return this.children = children;
    }

    async find(relativePath: string, openIfNotLoaded: boolean = false): Promise<FSEntry> {
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

        const childEntry = this.children.find((fsEntry) => fsEntry.fileName === next);
        if (arr.length === 0)
            throw new Error('Error path: ' + relativePath);
        else if (arr.length === 1)
            return childEntry;
        else if (!childEntry.isDirectory)
            throw new Error('Not a directory: ' + childEntry.fullPath);
        else
            return (childEntry as Directory).find(arr.slice(1).join(path.sep), openIfNotLoaded);
    }

    static fetch(fullPath: string) {
        return super.fetch(fullPath) as Directory;
    }
}

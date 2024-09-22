import * as fs from 'fs-extra';
import * as path from 'path';
import * as chokidar from 'chokidar';

const _caches: Map<string, FSEntry> = new Map(); // File cache

export default class FSEntry {
    fullPath: string; // full path
    fileName: string; // Complete file name
    // fileType:
    baseName: string; // File name without extension
    extName: string; // extension name, with `.`
    title: string; // title, used for display name
    isDirectory: boolean; // Is it a folder? Some subclasses need to be judged accurately after `preopen`
    isVue: boolean; //
    isOpen: boolean; // Is it open?
    // isParsed: boolean; // Has it been parsed?
    isSaving: boolean; // Is it saving?
    isWatched: boolean; // Whether to monitor changes
    _changeListeners: Array<Function>;
    _miniChangeListeners: Array<Function>;

    constructor(fullPath: string, isDirectory: boolean = false) {
        this.fullPath = fullPath;
        this.fileName = path.basename(fullPath);
        this.extName = path.extname(this.fileName);
        this.baseName = path.basename(this.fileName, this.extName);
        this.title = this.baseName;
        this.isDirectory = isDirectory;
        this.isVue = false;
        this.isOpen = false;
        // this.isParsed = false;
        this.isSaving = false;
        this._changeListeners = [];
        this._miniChangeListeners = [];
    }

    open(): void | Promise<void> {
        if (this.isOpen)
            return;
        return this.forceOpen();
    }

    forceOpen(): void | Promise<void> {
        this.close();
        this.isOpen = true;
    }

    close(): void {
        this.isOpen = false;
    }

    save(): void | Promise<void> {
        this.isSaving = true;
        setTimeout(() => this.isSaving = false, 1200); // Avoid self-saving triggering watch
    }

    /**
     * Delete the current file
     * This operation only deletes the actual file, not the file content. Therefore, you can save it again.
     */
    async remove() {
        return fs.remove(this.fullPath);
    }

    async onMiniChange(event: string, filePath: string, key?: string, hash?: string) {
        console.log('[kubevue-api] onMiniChange:', event, filePath, key, hash);
        if (this.isOpen && fs.existsSync(this.fullPath))
            await this.forceOpen();
        // @TODO: if (this.isParsed)
        this._miniChangeListeners.forEach((listener) => listener(event, filePath, this));
    }

    onChange(event: string, filePath: string, key?: string, hash?: string) {
        this._changeListeners.forEach((listener) => listener(event, filePath, this));
    }

    addEventListener(eventName: string, listener: Function) {
        let listeners;
        if (eventName === 'change')
            listeners = this._changeListeners;
        else if (eventName === 'mini-change')
            listeners = this._miniChangeListeners;
        else
            throw new TypeError('Unknown eventName ' + eventName);

        listeners.push(listener);
    }

    removeEventListener(eventName: string, listener: Function) {
        let listeners;
        if (eventName === 'change')
            listeners = this._changeListeners;
        else if (eventName === 'mini-change')
            listeners = this._miniChangeListeners;
        else
            throw new TypeError('Unknown eventName ' + eventName);

        const index = listeners.indexOf(listener);
        ~index && listeners.splice(index, 1);
    }

    watch(listener: (eventName: string, filePath: string) => void) {
        this.isWatched = true;
        return chokidar.watch(this.fullPath, {
            ignored: ['**/node_modules', '**/.git'],
            ignoreInitial: true,
            followSymlinks: false,
        }).on('all', (eventName, filePath) => {
            if (this.isSaving)
                return;
            listener(eventName, filePath);
        });
    }

    /**
     * Cache acquisition
     * @deprecated
     * @param fullPath
     * @param args
     */
    static fetch(fullPath: string, ...args: any[]) {
        return new this(fullPath, ...args);

        // this.name is the name of the constructor
        /*
        const key = this.name + '-' + fullPath;
        if (_caches.has(key))
            return _caches.get(key);
        else {
            const fsEntry = new this(fullPath, ...args);
            fsEntry.isWatched = true;
            _caches.set(key, fsEntry);

            const hash = new Date().toJSON();

            const fsWatch = chokidar.watch(fullPath, {
                ignored: ['** /node_modules', '** /.git'],
                ignoreInitial: true,
                followSymlinks: false,
                depth: 1,
            }).on('all', async (event, filePath) => {
                if (fsEntry.isSaving)
                    return;
                if (!_caches.has(key))
                    fsWatch.unwatch(fullPath);

                // Trigger the miniChange of forceOpen
                if (filePath === fullPath) {
                    // Remove directory or file
                    if (event === 'unlink' || event === 'unlinkDir') {
                        _caches.delete(key);
                        fsWatch.unwatch(fullPath);
                    } else
                        await fsEntry.onMiniChange(event, filePath, key, hash);
                } else {
                    if (fsEntry.isVue)
                        await fsEntry.onMiniChange(event, filePath, key, hash);
                    else {
                        const relativePath = path.relative(fullPath, filePath);
                        if (relativePath.includes('/'))
                            return fsEntry.onChange(event, filePath, key, hash);
                        else if (event !== 'change')
                            await fsEntry.onMiniChange(event, filePath, key, hash);
                    }
                }

                return fsEntry.onChange(event, filePath, key, hash);
            });

            return fsEntry;
        } */
    }
}
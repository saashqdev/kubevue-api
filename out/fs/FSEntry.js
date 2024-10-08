"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const chokidar = __importStar(require("chokidar"));
const _caches = new Map(); // 文件缓存
class FSEntry {
    constructor(fullPath, isDirectory = false) {
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
    open() {
        if (this.isOpen)
            return;
        return this.forceOpen();
    }
    forceOpen() {
        this.close();
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }
    save() {
        this.isSaving = true;
        setTimeout(() => this.isSaving = false, 1200); // 避免自身保存引发 watch
    }
    /**
     * 删除当前文件
     * 该操作只删除实际文件，不清空文件内容。因此可以再次 save。
     */
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            return fs.remove(this.fullPath);
        });
    }
    onMiniChange(event, filePath, key, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[kubevue-api] onMiniChange:', event, filePath, key, hash);
            if (this.isOpen && fs.existsSync(this.fullPath))
                yield this.forceOpen();
            // @TODO: if (this.isParsed)
            this._miniChangeListeners.forEach((listener) => listener(event, filePath, this));
        });
    }
    onChange(event, filePath, key, hash) {
        this._changeListeners.forEach((listener) => listener(event, filePath, this));
    }
    addEventListener(eventName, listener) {
        let listeners;
        if (eventName === 'change')
            listeners = this._changeListeners;
        else if (eventName === 'mini-change')
            listeners = this._miniChangeListeners;
        else
            throw new TypeError('Unknown eventName ' + eventName);
        listeners.push(listener);
    }
    removeEventListener(eventName, listener) {
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
    watch(listener) {
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
     * 缓存获取
     * @deprecated
     * @param fullPath
     * @param args
     */
    static fetch(fullPath, ...args) {
        return new this(fullPath, ...args);
        // this.name 是 constructor 的 name
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

                // 触发 forceOpen 的 miniChange
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
exports.default = FSEntry;
//# sourceMappingURL=FSEntry.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git = exports.npm = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const compressing = __importStar(require("compressing"));
const axios_1 = __importDefault(require("axios"));
const shell = __importStar(require("shelljs"));
/**
 * 下载 NPM 包，默认以 package@version 的文件名命名
 * @param info.registry For example: https://registry.npm.org
 * @param info.name Package name. For example: lodash
 * @param info.version For example: lodash
 * @param dir For example: ./blocks
 * @param name If you want to rename. Defaults to package@version
 * @param clearExisting
 */
function npm(info, dir, name, clearExisting) {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = info.registry || 'https://registry.npmjs.org';
        const version = info.version || 'latest';
        let pkgInfo;
        if (registry === 'https://registry.npmjs.org' && info.name[0] === '@') { // npm 有个 bug 去！！
            const data = (yield axios_1.default.get(`${registry}/${info.name}`)).data;
            if (data.versions[version])
                pkgInfo = data.versions[version];
            else if (data['dist-tags'][version])
                pkgInfo = data.versions[data['dist-tags'][version]];
            else
                throw new Error(`Cannot find package ${info.name} version ${version}!`);
        }
        else
            pkgInfo = (yield axios_1.default.get(`${registry}/${info.name}/${version}`)).data;
        name = name || pkgInfo.name.replace(/\//, '__') + '@' + pkgInfo.version;
        const dest = path.join(dir, name);
        if (fs.existsSync(dest)) {
            if (clearExisting)
                fs.removeSync(dest);
            else
                return dest;
        }
        const tgzURL = pkgInfo.dist.tarball;
        const response = yield axios_1.default.get(tgzURL, {
            responseType: 'stream',
        });
        const temp = path.resolve(os.tmpdir(), name + '-' + new Date().toJSON().replace(/[-:TZ]/g, '').slice(0, -4));
        yield compressing.tgz.uncompress(response.data, temp);
        yield fs.move(path.join(temp, 'package'), dest);
        fs.removeSync(temp);
        // fs.removeSync(path.resolve(dest, 'screenshots'));
        // fs.removeSync(path.resolve(dest, 'public'));
        // fs.removeSync(path.resolve(dest, 'docs'));
        // fs.removeSync(path.resolve(dest, 'package.json'));
        // fs.removeSync(path.resolve(dest, 'README.md'));
        return dest;
    });
}
exports.npm = npm;
/**
 * 下载 Git 仓库
 * @param info.url For example: https://registry.npm.org
 * @param info.branch For example: dev
 * @param dest For example: ./blocks/xxx
 * @param clearExisting
 */
function git(info, dest, clearExisting, keepGit) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync(dest)) {
            if (clearExisting)
                fs.removeSync(dest);
            else
                return dest;
        }
        const result = shell.exec(`git clone -b ${info.branch || 'master'} --depth 1 ${info.url} "${dest}"`, {
            silent: true,
        });
        if (result.code) {
            throw result.stderr;
        }
        else {
            if (!keepGit)
                fs.removeSync(`${dest}/.git`);
            return dest;
        }
    });
}
exports.git = git;
//# sourceMappingURL=download.js.map
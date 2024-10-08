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
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const FSEntry_1 = __importDefault(require("./FSEntry"));
const ScriptHandler_1 = __importDefault(require("./ScriptHandler"));
const TEMPLATE_PATH = path.resolve(__dirname, '../../templates/service');
/**
 * 用于处理数据服务的类
 *
 * ### 主要功能
 *
 * #### 打开：一般分为三个阶段
 * - const service = new Service(fullPath); // 根据路径创建对象，可以为虚拟路径。
 * - await service.open(); // 异步方法。如果已经打开则不会重新打开。获取常用操作的内容块：api, apiConfig。
 * - service.parseAll(); // 解析全部内容块
 *
 * #### 保存：
 * - await service.save();
 * - 如果有解析，先根据解析器 generate() 内容，再保存
 *
 * #### 另存为：
 * - await service.saveAs(fullPath);
 */
class Service extends FSEntry_1.default {
    constructor(fullPath) {
        super(fullPath, true);
    }
    forceOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.close();
            yield this.load();
            this.isOpen = true;
        });
    }
    close() {
        this.api = undefined;
        this.apiJSON = undefined;
        this.apiConfigHandler = undefined;
        this.indexJS = undefined;
        this.swaggerDefinitions = undefined;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!fs.existsSync(this.fullPath))
            //     throw new Error(`Cannot find: ${this.fullPath}`);
            const apiPath = path.resolve(this.fullPath, 'api.json');
            if (fs.existsSync(apiPath))
                this.api = yield fs.readFile(apiPath, 'utf8');
            else
                this.api = '{}';
            const apiConfigPath = path.resolve(this.fullPath, 'api.config.js');
            if (fs.existsSync(apiConfigPath))
                this.apiConfig = yield fs.readFile(apiConfigPath, 'utf8');
            else
                this.apiConfig = 'export default {};\n';
            const indexJSPath = path.resolve(this.fullPath, 'index.js');
            if (fs.existsSync(indexJSPath))
                this.indexJS = yield fs.readFile(indexJSPath, 'utf8');
            else
                this.indexJS = yield fs.readFile(path.resolve(TEMPLATE_PATH, 'index.js'), 'utf8');
            const swaggerPath = path.resolve(this.fullPath, 'swagger.json');
            if (fs.existsSync(swaggerPath))
                this.swaggerDefinitions = JSON.parse(yield fs.readFile(swaggerPath, 'utf8'));
            else
                this.swaggerDefinitions = {};
        });
    }
    warnIfNotOpen() {
        if (!this.isOpen)
            console.warn(`[kubevue.Service] File ${this.fileName} seems not open.`);
    }
    parseAll() {
        this.parseAPI();
        this.parseAPIConfig();
    }
    parseAPI() {
        this.apiJSON = JSON.parse(this.api);
    }
    parseAPIConfig() {
        this.apiConfigHandler = new ScriptHandler_1.default(this.apiConfig);
    }
    generate() {
        if (this.apiJSON) {
            this.api = JSON.stringify(this.apiJSON, null, 4);
        }
        if (this.apiConfigHandler) {
            this.apiConfig = this.apiConfigHandler.generate();
        }
    }
    save() {
        const _super = Object.create(null, {
            save: { get: () => super.save }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.warnIfNotOpen();
            this.isSaving = true;
            this.generate();
            fs.ensureDirSync(this.fullPath);
            const promises = [];
            this.api && promises.push(fs.writeFile(path.resolve(this.fullPath, 'api.json'), this.api));
            this.apiConfig && promises.push(fs.writeFile(path.resolve(this.fullPath, 'api.config.js'), this.apiConfig));
            this.indexJS && promises.push(fs.writeFile(path.resolve(this.fullPath, 'index.js'), this.indexJS));
            this.swaggerDefinitions && promises.push(fs.writeFile(path.resolve(this.fullPath, 'swagger.json'), JSON.stringify(this.swaggerDefinitions, null, 4)));
            yield Promise.all(promises);
            _super.save.call(this);
        });
    }
}
exports.default = Service;
//# sourceMappingURL=Service.js.map
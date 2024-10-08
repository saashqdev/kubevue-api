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
const chai_1 = require("chai");
const ms = __importStar(require("../../../ms"));
describe('ms.publishBlock', () => {
    it('should succeed', () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            name: 's-test-block.vue',
            version: '0.1.0',
            description: 'My block for test',
            labels: 'test,block',
            homepage: `https://kubevue.s3.amazonaws.com/#/block/s-test-block.vue`,
            author: 'Kubeworkz <kubeworkz@gmail.com>',
            repository: `https://github.com/kubevue/cloud-ui/tree/master/src/blocks/s-test-block.vue`,
            title: '测试区块',
            category: 'info',
            base: 'vue',
            ui: `cloud-ui.kubevue`,
            screenshots: '',
            registry: 'https://registry.npmjs.org',
            access: 2,
            team: '网易云计算前端'
        };
        const result = yield ms.publishBlock(params);
        chai_1.expect(/^20\d/.test(result.code)).to.be.true;
        const block = yield ms.getBlock(params.name);
        chai_1.expect(block.name).to.equal(params.name);
        chai_1.expect(block.version).to.equal(params.version);
        chai_1.expect(block.labels).to.equal(params.labels);
        chai_1.expect(block.screenshots).to.equal(params.screenshots);
        chai_1.expect(block.access).to.equal(params.access);
        chai_1.expect(block.team).to.equal(params.team);
    }));
});
describe('ms.publishComponent', () => {
    it('should succeed', () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            name: 's-test-component.vue',
            version: '0.1.0',
            description: 'My component for test',
            labels: 'test,component',
            homepage: `https://kubevue.s3.amazonaws.com/#/component/s-test-component.vue`,
            author: 'Kubeworkz <kubeworkz@gmail.com>',
            repository: `https://github.com/kubevue/cloud-ui/tree/master/src/components/s-test-block.vue`,
            title: '测试组件',
            category: 'info',
            base: 'vue',
            ui: `cloud-ui.kubevue`,
            screenshots: '',
            blocks: '[{}]',
            registry: 'https://registry.npmjs.org',
            access: 2,
            team: '网易云计算前端'
        };
        const result = yield ms.publishComponent(params);
        chai_1.expect(/^20\d/.test(result.code)).to.be.true;
        const component = yield ms.getComponent(params.name);
        chai_1.expect(component.name).to.equal(params.name);
        chai_1.expect(component.version).to.equal(params.version);
        chai_1.expect(component.labels).to.equal(params.labels);
        chai_1.expect(component.screenshots).to.equal(params.screenshots);
        chai_1.expect(component.blocks).to.equal(params.blocks);
        chai_1.expect(component.access).to.equal(params.access);
        chai_1.expect(component.team).to.equal(params.team);
    }));
});
//# sourceMappingURL=publish.test.js.map
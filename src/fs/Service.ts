import * as fs from 'fs-extra';
import * as path from 'path';
import FSEntry from './FSEntry';
import ScriptHandler from './ScriptHandler';

const TEMPLATE_PATH = path.resolve(__dirname, '../../templates/service');

/**
 * Classes for handling data services
 *
 * ### Main functions
 *
 * #### Open: Generally divided into three stages
 * - const service = new Service(fullPath); // Create an object based on the path, which can be a virtual path.
 * - await service.open(); // Asynchronous method. If it is already opened, it will not be reopened. Get the content blocks of common operations: api, apiConfig.
 * - service.parseAll(); // parse all content blocks
 *
 * #### keep:
 * - await service.save();
 * - If there is a parsing, first generate() the content according to the parser, then save it
 *
 * #### Save as:
 * - await service.saveAs(fullPath);
 */
export default class Service extends FSEntry {
    api: string;
    apiJSON: { [name: string]: any };
    apiConfig: string;
    apiConfigHandler: ScriptHandler;
    indexJS: string;
    swaggerDefinitions: { [name: string]: any };

    constructor(fullPath: string) {
        super(fullPath, true);
    }

    async forceOpen() {
        this.close();
        await this.load();
        this.isOpen = true;
    }

    close() {
        this.api = undefined;
        this.apiJSON = undefined;
        this.apiConfigHandler = undefined;
        this.indexJS = undefined;
        this.swaggerDefinitions = undefined;
    }

    protected async load() {
        // if (!fs.existsSync(this.fullPath))
        //     throw new Error(`Cannot find: ${this.fullPath}`);

        const apiPath = path.resolve(this.fullPath, 'api.json');
        if (fs.existsSync(apiPath))
            this.api = await fs.readFile(apiPath, 'utf8');
        else
            this.api = '{}';

        const apiConfigPath = path.resolve(this.fullPath, 'api.config.js');
        if (fs.existsSync(apiConfigPath))
            this.apiConfig = await fs.readFile(apiConfigPath, 'utf8');
        else
            this.apiConfig = 'export default {};\n';

        const indexJSPath = path.resolve(this.fullPath, 'index.js');
        if (fs.existsSync(indexJSPath))
            this.indexJS = await fs.readFile(indexJSPath, 'utf8');
        else
            this.indexJS = await fs.readFile(path.resolve(TEMPLATE_PATH, 'index.js'), 'utf8');

        const swaggerPath = path.resolve(this.fullPath, 'swagger.json');
        if (fs.existsSync(swaggerPath))
            this.swaggerDefinitions = JSON.parse(await fs.readFile(swaggerPath, 'utf8'));
        else
            this.swaggerDefinitions = {};
    }

    warnIfNotOpen() {
        if (!this.isOpen)
            console.warn(`[kubevue.Service] File ${this.fileName} seems not open.`);
    }

    parseAll(): void {
        this.parseAPI();
        this.parseAPIConfig();
    }

    parseAPI() {
        this.apiJSON = JSON.parse(this.api);
    }

    parseAPIConfig() {
        this.apiConfigHandler = new ScriptHandler(this.apiConfig);
    }

    generate() {
        if (this.apiJSON) {
            this.api = JSON.stringify(this.apiJSON, null, 4);
        }

        if (this.apiConfigHandler) {
            this.apiConfig = this.apiConfigHandler.generate();
        }
    }

    async save() {
        this.warnIfNotOpen();
        this.isSaving = true;

        this.generate();

        fs.ensureDirSync(this.fullPath);

        const promises = [];
        this.api && promises.push(fs.writeFile(path.resolve(this.fullPath, 'api.json'), this.api));
        this.apiConfig && promises.push(fs.writeFile(path.resolve(this.fullPath, 'api.config.js'), this.apiConfig));
        this.indexJS && promises.push(fs.writeFile(path.resolve(this.fullPath, 'index.js'), this.indexJS));
        this.swaggerDefinitions && promises.push(fs.writeFile(path.resolve(this.fullPath, 'swagger.json'), JSON.stringify(this.swaggerDefinitions, null, 4)))

        await Promise.all(promises);

        super.save();
    }
}
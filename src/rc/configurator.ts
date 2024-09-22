import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as YAML from 'yaml';

const rcPath = path.resolve(os.homedir(), '.kubevuerc');

export interface kubevueRC {
    platform: string;
    registries: { [name: string]: string };
    download_manager: string;
    publish_manager: string;
    access_token: string;
    [key: string]: any;
}

export enum ManagerInstallSaveOptions {
    'dep' = 'dep',
    'dev' = 'dev',
    'peer' = 'peer',
    'optional' = 'optional',
}

export default {
    config: undefined as kubevueRC,
    rcPath,
    yaml: undefined as string,
    /**
     * Load configuration from .kubevuerc in the user directory
     * If already loaded, it will be read directly from the cache
     * A default .kubevuerc file will be created if it does not exist
     */
    load(): kubevueRC {
        if (this.config)
            return this.config;

        if (!fs.existsSync(rcPath)) {
            fs.writeFileSync(rcPath, `platform: https://kubevue.163yun.com
registries:
  npm: https://registry.npmjs.org
download_manager: npm
publish_manager: npm
`);
        }

        this.yaml = fs.readFileSync(rcPath, 'utf8');

        this.config = YAML.parse(this.yaml);
        return this.config;
    },
    /**
     * Save configuration
     */
    save() {
        fs.writeFileSync(rcPath, YAML.stringify(this.config), 'utf8');
    },
    /**
     * Quickly obtain the download source address
     */
    getDownloadRegistry() {
        const config = this.load();
        return config.registries[config.download_manager] || 'https://registry.npmjs.org';
    },
    /**
     * Quickly obtain installation commands
     */
    getInstallCommand(packagesName?: string, save: ManagerInstallSaveOptions | boolean = false) {
        const config = this.load();
        if (!packagesName) {
            if (config.download_manager === 'yarn')
                return 'yarn';
            else
                return `${config.download_manager} install`;
        } else {
            if (config.download_manager === 'yarn')
                return `yarn add ${packagesName}${save === false ? '' : (save === true ? '' : ' --' + save)}`;
            else
                return `${config.download_manager} install ${packagesName}${save === false ? '' : (save === true ? ' --save' : ' --save-' + save)}`;
        }
    },
};
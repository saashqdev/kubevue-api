import { spawn, spawnSync } from 'child_process';
import * as logger from './logger';

/**
 * Use spawnSync's shell inherit mode to directly connect to the main process's stdio
 * @param args command parameters, each item can be a string or a string array
 * @example
 * execSync('rm', '-rf', 'node_modules')
 * execSync('git clone', 'xxx')
 */
export function execSync(...args: Array<string>) {
    const command = args.join(' ');
    return spawnSync(command, { shell: true, stdio: 'inherit' });
}

/**
 * Use spawnSync's shell inherit mode to directly connect to the main process's stdio
 * If code is not 0, then end directly
 * @param args command parameters, each item can be a string or a string array
 * @example
 * execSync('rm', '-rf', 'node_modules')
 * execSync('git clone', 'xxx')
 */
export function justExecSync(...args: Array<string>) {
    const command = args.join(' ');
    const result = spawnSync(command, { shell: true, stdio: 'inherit' });
    if (result.status) {
        logger.error(String(result.stderr || result.stdout));
        process.exit(1);
    }
}

/**
 * Use spawn's shell inherit mode to directly connect to the main process's stdio
 * @param args command parameters, each item can be a string or a string array
 * await exec('rm', '-rf', 'node_modules')
 * await exec('git clone', 'xxx')
 */
export function exec(...args: Array<string>) {
    const command = args.join(' ');

    return new Promise(((resolve, reject) => {
        const result = spawn(command, { shell: true, stdio: 'inherit' });
        result.on('error', reject);
        result.on('close', (code) => code === 0 ? resolve(true) : reject());
    }));
}
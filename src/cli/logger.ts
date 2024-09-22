import chalk from 'chalk';
import * as events from 'events';
import * as readline from 'readline';

export const event = new events.EventEmitter();

function _log(type: string, tag: string, message: string) {
    if (process.env.kubevue_API_MODE && message) {
        event.emit('log', {
            message,
            type,
            tag,
        });
    }
}

const format = (label: string, msg: string) => msg.split('\n').map((line, i) => {
    if (i === 0)
        return `${label} ${line}`;
    else
        return (line || '').padStart(chalk.reset(label).length);
}).join('\n');

const chalkTag = (msg: string) => chalk.bgBlackBright.white.dim(` ${msg} `);

/**
 * Print normal log
 * @param msg log information
 * @param tag add a gray tag
 */
export function log (msg: string = '', tag?: string) {
    tag ? console.info(format(chalkTag(tag), msg)) : console.info(msg);
    _log('log', tag, msg);
};

/**
 * Print information log
 * @param msg log information
 * @param tag add a gray tag
 */
export function info (msg: string = '', tag?: string) {
    console.info(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg));
    _log('info', tag, msg);
};

/**
 * Print normal log
 * @param msg log information
 * @param tag add a gray tag
 */
export function done (msg: string = '', tag?: string) {
    console.info(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg));
    _log('done', tag, msg);
};

/**
 * Print warning log
 * @param msg log information
 * @param tag add a gray tag
 */
export function warn (msg: string = '', tag?: string) {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)));
    _log('warn', tag, msg);
};

/**
 * Print error log
 * @param msg log information, can be an Error object
 * @param tag add a gray tag
 */
export function error (msg: string | Error = '', tag?: string) {
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(String(msg))));
    _log('error', tag, String(msg));
    if (msg instanceof Error) {
        console.error(msg.stack);
        _log('error', tag, msg.stack);
    }
};

/**
 * Clear the console
 * @param title print a title after clearing
 */
export function clearConsole (title: string) {
    if (process.stdout.isTTY) {
        const blank = '\n'.repeat(process.stdout.rows);
        console.info(blank);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        if (title) {
            console.info(title);
        }
    }
};
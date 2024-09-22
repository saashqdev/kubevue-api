import { kubevueConfig } from './getDefaults';
interface CLIArgs {
    'kubevue-mode'?: string;
    'base-css'?: string;
    theme?: string;
    'apply-theme'?: boolean;
    'output-path'?: string;
    'public-path'?: string;
    'static-path'?: string;
    'src-path'?: string;
    'library-path'?: string;
}
export default function resolve(cwd: string, configPath?: string, args?: CLIArgs, throwErrors?: boolean): kubevueConfig;
export {};

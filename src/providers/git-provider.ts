import fs from 'fs';
import path from 'path';
import getUserAgent from 'universal-user-agent';
import findupSync from 'findup-sync';
import { TaskTree } from 'tasktree-cli';
import { ServiceProvider } from '../config/typings/enums';
import { Provider } from './provider';

export abstract class GitProvider extends Provider {
    public static DEFAULT_BRANCH = 'master';
    public static TYPE: string = 'git';

    protected repository: string;
    protected owner: string;
    protected branch: string = GitProvider.DEFAULT_BRANCH;
    protected version = process.env.npm_package_version;
    protected userAgent: string;

    public constructor(type: ServiceProvider, url: string) {
        super(type);

        const task = TaskTree.tree().add('Initializing git provider');
        const pathname = new URL(url).pathname.split('/');
        const pattern = `.${GitProvider.TYPE}/HEAD`;
        const filePath = findupSync(pattern, { cwd: process.cwd() });

        this.repository = path.basename(pathname.pop() as string, `.${GitProvider.TYPE}`);
        this.owner = pathname.pop() as string;
        this.userAgent = `changelog-guru/${this.version} ${getUserAgent()}`;

        if (filePath && fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const match = /ref: refs\/heads\/([^\n]+)/.exec(buffer.toString());

            if (match) {
                [, this.branch] = match;
            } else {
                task.warn(`${pattern} - ref(s) SHA not found`);
            }
        } else {
            task.warn(`${pattern} - does not exist`);
        }

        task.log(`Provider: ${this.type}`);
        task.log(`Repository: ${this.repository}`);
        task.log(`Branch: ${this.branch}`);
        task.log(`Owner: ${this.owner}`);
        task.complete('Git provider:');
    }
}

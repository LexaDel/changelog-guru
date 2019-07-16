import { TaskTree } from 'tasktree-cli';
import { Provider } from '../providers/provider';
import State from '../entities/state';

const $tasks = TaskTree.tree();

export default class Reader {
    private provider: Provider;

    public constructor(provider: Provider) {
        this.provider = provider;
    }

    public async read(): Promise<State> {
        const { provider } = this;
        const task = $tasks.add('Loading a release state...');
        const state = new State();
        const date = await provider.getLatestReleaseDate();
        const version = await provider.getVersion();

        task.log(`Last release date: ${date}`);
        task.log(`Last release version: ${version || '-'}`);
        await this.loadCommits(date, state);
        task.complete(`Release information:`);

        return state;
    }

    private async loadCommits(date: string, state: State, pageNumber: number = 0): Promise<void> {
        const commits = await this.provider.getCommits(date, pageNumber + 1);
        const { length } = commits;

        if (length) {
            commits.forEach((entities): void => state.addCommit(...entities));

            if (length === Provider.PAGE_SIZE) {
                await this.loadCommits(date, state, pageNumber + 1);
            }
        }
    }
}

import { Commit } from '../../../src/entities/commit';
import { Author } from '../../../src/entities/author';
import { Package } from '../../../src/entities/package';
import { Provider } from '../../../src/providers/provider';

export class MockProvider extends Provider {
    public readonly __commit = new Commit('b816518030dace1b91838ae0abd56fa88eba19ff', {
        timestamp: 1,
        message: `feat(Jest): subject\n\nbody\n\nfooter`,
        url: 'https://github.com/keindev/changelog-guru/commit/b816518030dace1b91838ae0abd56fa88eba19ff',
        author: 'keindev',
    });

    public readonly __author = new Author(1, {
        login: 'keindev',
        url: 'https://github.com/keindev',
        avatar: 'https://avatars3.githubusercontent.com/u/4527292?v=4',
    });

    public __getRepository(): string {
        return this.repository;
    }

    public __getOwner(): string {
        return this.owner;
    }

    public __getBranch(): string {
        return this.branch;
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    public async getCommits(date: string, page: number): Promise<[Commit, Author][]> {
        return Promise.resolve([[this.__commit, this.__author]]);
    }

    // eslint-disable-next-line class-methods-use-this
    public async getVersion(): Promise<string | undefined> {
        return Promise.resolve(Package.DEFAULT_VERSION);
    }

    // eslint-disable-next-line class-methods-use-this
    public async getLatestReleaseDate(): Promise<string> {
        return Promise.resolve(new Date(0).toISOString());
    }
}

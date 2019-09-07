import { Task } from 'tasktree-cli/lib/entities/task';
import { BasePlugin } from './base-plugin';

export abstract class StatePlugin extends BasePlugin {
    public abstract async modify(task: Task): Promise<void>;
}

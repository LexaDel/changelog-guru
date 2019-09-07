import { TaskTree, ExitCode } from 'tasktree-cli';
import { CommandManager } from './cli/command-manager';
import { GenerateCommand } from './cli/commands/generate-command';
import { LintCommand } from './cli/commands/lint-command';

const manager = new CommandManager([new GenerateCommand(), new LintCommand()]);
const taskTree = TaskTree.tree();

manager
    .execute()
    .then((): void => {
        taskTree.exit(ExitCode.Success);
    })
    .catch((error): void => {
        taskTree.fail(error);
    });

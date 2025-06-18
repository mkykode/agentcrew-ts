import { Command } from 'commander';

export const initCommand = new Command()
  .name('init')
  .description('Initialize agentcrew project')
  .action(async () => {
    console.log('Initializing agentcrew project...');
    // TODO: Implement initialization logic
  });
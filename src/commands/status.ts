import { Command } from 'commander';

export const statusCommand = new Command()
  .name('status')
  .description('Show agent status')
  .action(async () => {
    console.log('Checking agent status...');
    // TODO: Implement status checking logic
  });
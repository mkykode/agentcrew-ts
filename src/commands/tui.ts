import { Command } from 'commander';

export const tuiCommand = new Command()
  .name('tui')
  .description('Launch interactive terminal UI')
  .action(async () => {
    console.log('Launching TUI...');
    // TODO: Implement TUI launch logic
  });
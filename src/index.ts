#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from '@/commands/init';
import { deployCommand } from '@/commands/deploy';
import { statusCommand } from '@/commands/status';
import { tuiCommand } from '@/commands/tui';

const program = new Command();

program
  .name('agentcrew')
  .description('TypeScript CLI tool that orchestrates multiple AI coding agents')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(deployCommand);
program.addCommand(statusCommand);
program.addCommand(tuiCommand);

program.parse();
#!/usr/bin/env node

import { program } from 'commander';

import exit from './commands/exit';
import manual from './commands/manual';
import cruiser from './commands/cruiser';
import customer from './commands/customer';

program.name('sabbar').version('0.0.1');

program
  .command('customer')
  .description('Show existing list of customers')
  .action(customer);

program
  .command('cruiser')
  .description('Show existing list of cruisers')
  .action(cruiser);

program.command('manual').description('Show this help').action(manual);

program
  .command('exit')
  .description('Kill the CLI (and the rest of the application)')
  .action(exit);

program.parse(process.argv);

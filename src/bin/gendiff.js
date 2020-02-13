#!/usr/bin/env node

import program from 'commander';
import difference from '../difference';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (beforeConfig, afterConfig) => {
      console.log(difference(beforeConfig, afterConfig));
    },
  );

program.parse(process.argv);

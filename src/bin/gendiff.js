#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (beforeConfig, afterConfig) => {
      console.log(genDiff(beforeConfig, afterConfig, program.format));
    },
  );

program.parse(process.argv);

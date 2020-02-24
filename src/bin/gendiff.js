#!/usr/bin/env node

import program from 'commander';
import genDifference from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'nested')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (beforeConfig, afterConfig) => {
      console.log(genDifference(beforeConfig, afterConfig, program.format));
    },
  );

program.parse(process.argv);

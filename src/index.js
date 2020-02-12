#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import genDiff from '..';

const difference = (beforeConfig, afterConfig) => {
  const before = JSON.parse(fs.readFileSync(`${path.resolve(process.cwd(), beforeConfig)}`));
  const after = JSON.parse(fs.readFileSync(`${path.resolve(process.cwd(), afterConfig)}`));
  console.log(genDiff(before, after));
  return genDiff(before, after);
};


program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (beforeConfig, afterConfig) => {
      difference(beforeConfig, afterConfig);
    },
  );

program.parse(process.argv);

export default difference;

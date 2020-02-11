#!/usr/bin/env node

import gendiff from '..';

const program = require('commander');
const fs = require('fs');
const path = require('path');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (beforeConfig, afterConfig) => {
      const before = JSON.parse(fs.readFileSync(`${path.resolve(process.cwd(), beforeConfig)}`));
      const after = JSON.parse(fs.readFileSync(`${path.resolve(process.cwd(), afterConfig)}`));
      console.log(gendiff(before, after));
    },
  );

program.parse(process.argv);

import fs from 'fs';
import path from 'path';
import genDiff from '.';

const difference = (beforeConfig, afterConfig) => {
  const before = JSON.parse(fs.readFileSync(`${path.resolve(process.cwd(), beforeConfig)}`));
  const after = JSON.parse(fs.readFileSync(`${path.resolve(process.cwd(), afterConfig)}`));
  return genDiff(before, after);
};
export default difference;

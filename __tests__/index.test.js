import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['json', 'nested'], ['yml', 'plain'], ['ini', 'json']];

test.each(cases)(
  'format nested, plain, json',
  (format, type) => {
    const beforeConfig = getFixturePath(`before.${format}`);
    const afterConfig = getFixturePath(`after.${format}`);
    const expected = readFile(`result_${type}.txt`);
    const result = genDiff(beforeConfig, afterConfig, type);
    expect(result).toEqual(expected);
  },
);

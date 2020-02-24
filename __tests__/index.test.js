import fs from 'fs';
import path from 'path';
import difference from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['before.json', 'after.yml', 'nested', 'result_nested.txt'], ['before.ini', 'after.yml', 'plain', 'result_plain.txt'], ['before.json', 'after.ini', 'json', 'result_json.txt']];

test.each(cases)(
  'format nested, plain, json',
  (firstArg, secondArg, format, expectedResult) => {
    const beforeConfig = getFixturePath(firstArg);
    const afterConfig = getFixturePath(secondArg);
    const expected = readFile(expectedResult);
    const result = difference(beforeConfig, afterConfig, format);
    expect(result).toEqual(expected);
  },
);

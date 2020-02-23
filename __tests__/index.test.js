import fs from 'fs';
import path from 'path';
import difference from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = (beforeConfig, afterConfig, result) => [[getFixturePath(`${beforeConfig}`), getFixturePath(`${afterConfig}`), readFile(`${result}`)]];

test.each(cases('before.json', 'after.yml', 'result_nested.txt'))(
  'format nested',
  (firstArg, secondArg, expectedResult) => {
    const result = difference(firstArg, secondArg);
    expect(result).toEqual(expectedResult);
  },
);
test.each(cases('before.ini', 'after.yml', 'result_plain.txt'))(
  'format plain',
  (firstArg, secondArg, expectedResult) => {
    const result = difference(firstArg, secondArg, 'plain');
    expect(result).toEqual(expectedResult);
  },
);
test.each(cases('before.json', 'after.ini', 'result_json.txt'))(
  'format json',
  (firstArg, secondArg, expectedResult) => {
    const result = difference(firstArg, secondArg, 'json');
    expect(result).toEqual(expectedResult);
  },
);

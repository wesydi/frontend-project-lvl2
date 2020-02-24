import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [['json', 'nested'], ['yml', 'plain'], ['ini', 'json']];

test.each(cases)(
  'format nested, plain, json',
  (fileExtension, nameFormatter) => {
    const pathToFirstFile = getFixturePath(`before.${fileExtension}`);
    const pathToSecondFile = getFixturePath(`after.${fileExtension}`);
    const expectedResult = readFile(`result_${nameFormatter}.txt`);
    const result = genDiff(pathToFirstFile, pathToSecondFile, nameFormatter);
    expect(result).toEqual(expectedResult);
  },
);

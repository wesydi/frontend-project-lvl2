import fs from 'fs';
import gendiff from '../src/bin/gendiff';

const diff = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString();

test('relative path', () => {
  const before = `${__dirname}/../__fixtures__/before.json`;
  const after = `${__dirname}/../__fixtures__/after.json`;
  expect(gendiff(before, after)).toEqual(diff);
});
test('absolute path', () => {
  const before = '/home/andrey/frontend-project-lvl2/__fixtures__/before.json';
  const after = '/home/andrey/frontend-project-lvl2/__fixtures__/after.json';
  expect(gendiff(before, after)).toEqual(diff);
});

import fs from 'fs';
import difference from '../src/difference';

const diff = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString();

test('json', () => {
  const before = `${__dirname}/../__fixtures__/before.json`;
  const after = `${__dirname}/../__fixtures__/after.json`;
  expect(difference(before, after)).toEqual(diff);
});

test('yml', () => {
  const before = `${__dirname}/../__fixtures__/before.yml`;
  const after = `${__dirname}/../__fixtures__/after.yml`;
  expect(difference(before, after)).toEqual(diff);
});

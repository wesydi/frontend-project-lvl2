import fs from 'fs';
import difference from '../src/difference';

const diff = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString();
const config1 = (format) => `${__dirname}/../__fixtures__/before${format}`;
const config2 = (format) => `${__dirname}/../__fixtures__/after${format}`;

test('json', () => {
  const before = config1('.json');
  const after = config2('.json');
  expect(difference(before, after)).toEqual(diff);
});

test('yml', () => {
  const before = config1('.yml');
  const after = config2('.yml');
  expect(difference(before, after)).toEqual(diff);
});

test('ini', () => {
  const before = config1('.ini');
  const after = config2('.ini');
  expect(difference(before, after)).toEqual(diff);
});

import fs from 'fs';
import difference from '../src/difference';

const diffRecursive = fs.readFileSync(`${__dirname}/../__fixtures__/result_recursive.txt`, 'utf-8');
const diffPlain = fs.readFileSync(`${__dirname}/../__fixtures__/result_plain.txt`, 'utf-8');
const diffJson = fs.readFileSync(`${__dirname}/../__fixtures__/result_json.txt`, 'utf-8');
const config1 = (format) => `${__dirname}/../__fixtures__/before${format}`;
const config2 = (format) => `${__dirname}/../__fixtures__/after${format}`;

describe('nested format', () => {
  test('json', () => {
    const before = config1('.json');
    const after = config2('.json');
    expect(difference(before, after)).toEqual(diffRecursive);
  });

  test('yml', () => {
    const before = config1('.yml');
    const after = config2('.yml');
    expect(difference(before, after)).toEqual(diffRecursive);
  });

  test('ini', () => {
    const before = config1('.ini');
    const after = config2('.ini');
    expect(difference(before, after)).toEqual(diffRecursive);
  });
});

describe('plain format', () => {
  test('json', () => {
    const before = config1('.json');
    const after = config2('.json');
    expect(difference(before, after, 'plain')).toEqual(diffPlain);
  });

  test('yml', () => {
    const before = config1('.yml');
    const after = config2('.yml');
    expect(difference(before, after, 'plain')).toEqual(diffPlain);
  });

  test('ini', () => {
    const before = config1('.ini');
    const after = config2('.ini');
    expect(difference(before, after, 'plain')).toEqual(diffPlain);
  });
});

describe('json format', () => {
  test('json', () => {
    const before = config1('.json');
    const after = config2('.json');
    expect(difference(before, after, 'json')).toEqual(diffJson);
  });

  test('yml', () => {
    const before = config1('.yml');
    const after = config2('.yml');
    expect(difference(before, after, 'json')).toEqual(diffJson);
  });

  test('ini', () => {
    const before = config1('.ini');
    const after = config2('.ini');
    expect(difference(before, after, 'json')).toEqual(diffJson);
  });
});
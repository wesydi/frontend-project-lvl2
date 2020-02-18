import fs from 'fs';
import difference from '../src';

const diff = (typeResult) => fs.readFileSync(`${__dirname}/../__fixtures__/result_${typeResult}.txt`, 'utf-8');
const config1 = (format) => `${__dirname}/../__fixtures__/before${format}`;
const config2 = (format) => `${__dirname}/../__fixtures__/after${format}`;

describe('nested format', () => {
  test('json', () => {
    const before = config1('.json');
    const after = config2('.json');
    expect(difference(before, after)).toEqual(diff('nested'));
  });

  test('yml', () => {
    const before = config1('.yml');
    const after = config2('.yml');
    expect(difference(before, after)).toEqual(diff('nested'));
  });

  test('ini', () => {
    const before = config1('.ini');
    const after = config2('.ini');
    expect(difference(before, after)).toEqual(diff('nested'));
  });
});

describe('plain format', () => {
  test('json', () => {
    const before = config1('.json');
    const after = config2('.json');
    expect(difference(before, after, 'plain')).toEqual(diff('plain'));
  });

  test('yml', () => {
    const before = config1('.yml');
    const after = config2('.yml');
    expect(difference(before, after, 'plain')).toEqual(diff('plain'));
  });

  test('ini', () => {
    const before = config1('.ini');
    const after = config2('.ini');
    expect(difference(before, after, 'plain')).toEqual(diff('plain'));
  });
});

describe('json format', () => {
  test('json', () => {
    const before = config1('.json');
    const after = config2('.json');
    expect(difference(before, after, 'json')).toEqual(diff('json'));
  });

  test('yml', () => {
    const before = config1('.yml');
    const after = config2('.yml');
    expect(difference(before, after, 'json')).toEqual(diff('json'));
  });

  test('ini', () => {
    const before = config1('.ini');
    const after = config2('.ini');
    expect(difference(before, after, 'json')).toEqual(diff('json'));
  });
});

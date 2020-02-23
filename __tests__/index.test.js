import fs from 'fs';
import difference from '../src';

const diff = (typeDiff) => fs.readFileSync(`${__dirname}/../__fixtures__/result_${typeDiff}.txt`, 'utf-8');
const config1 = (format) => `${__dirname}/../__fixtures__/before${format}`;
const config2 = (format) => `${__dirname}/../__fixtures__/after${format}`;
const casesNested = [[config1('.json'), config2('.json'), diff('nested')], [config1('.yml'), config2('.yml'), diff('nested')], [config1('.ini'), config2('.ini'), diff('nested')]];
const casesPlain = [[config1('.json'), config2('.json'), diff('plain')], [config1('.yml'), config2('.yml'), diff('plain')], [config1('.ini'), config2('.ini'), diff('plain')]];
const casesJson = [[config1('.json'), config2('.json'), diff('json')], [config1('.yml'), config2('.yml'), diff('json')], [config1('.ini'), config2('.ini'), diff('json')]];

test.each(casesNested)(
  'format nested',
  (firstArg, secondArg, expectedResult) => {
    const result = difference(firstArg, secondArg);
    expect(result).toEqual(expectedResult);
  },
);

test.each(casesPlain)(
  'plain nested',
  (firstArg, secondArg, expectedResult) => {
    const result = difference(firstArg, secondArg, 'plain');
    expect(result).toEqual(expectedResult);
  },
);

test.each(casesJson)(
  'json nested',
  (firstArg, secondArg, expectedResult) => {
    const result = difference(firstArg, secondArg, 'json');
    expect(result).toEqual(expectedResult);
  },
);

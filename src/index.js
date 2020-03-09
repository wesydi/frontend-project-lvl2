import fs from 'fs';
import path from 'path';
import parse from './parsers';
import toNested from './formatters/nested';
import toPlain from './formatters/plain';
import toJson from './formatters/json';

const readFile = (filepath) => fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
const extensionFile = (filepath) => path.extname(filepath);

const render = (config1, config2, format) => {
  switch (format) {
    case 'nested':
      return toNested(config1, config2);
    case 'plain':
      return toPlain(config1, config2, format);
    case 'json':
      return toJson(config1, config2, format);
    default: throw new Error(`Unknown format: '${format}'!`);
  }
};

const genDifference = (pathToFirstFile, pathToSecondFile, format = 'nested') => {
  const extensionFirstFile = extensionFile(pathToFirstFile);
  const extensionSecondFile = extensionFile(pathToSecondFile);
  const dataFirstFile = readFile(pathToFirstFile);
  const dataSecondFile = readFile(pathToSecondFile);
  const before = parse(extensionFirstFile, dataFirstFile);
  const after = parse(extensionSecondFile, dataSecondFile);
  return render(before, after, format);
};
export default genDifference;

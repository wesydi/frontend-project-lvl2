import fs from 'fs';
import path from 'path';
import parse from './parsers';
import toNested from './formatters/nested';
import toPlain from './formatters/plain';
import toJson from './formatters/json';

const readFile = (filepath) => fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
const extensionFile = (filepath) => path.extname(filepath);

const render = (beforeConfig, afterConfig, format) => {
  switch (format) {
    case 'nested':
      return toNested(beforeConfig, afterConfig);
    case 'plain':
      return toPlain(beforeConfig, afterConfig, format);
    case 'json':
      return toJson(beforeConfig, afterConfig, format);
    default: throw new Error(`Unknown format: '${format}'!`);
  }
};

const genDifference = (pathToFirstFile, pathToSecondFile, format = 'nested') => {
  const typeFirstFile = extensionFile(pathToFirstFile).slice(1);
  const dataFirstFile = readFile(pathToFirstFile);
  const beforeConfig = parse(typeFirstFile, dataFirstFile);
  const typeSecondFile = extensionFile(pathToSecondFile).slice(1);
  const dataSecondFile = readFile(pathToSecondFile);
  const afterConfig = parse(typeSecondFile, dataSecondFile);
  return render(beforeConfig, afterConfig, format);
};
export default genDifference;

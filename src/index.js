import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './render';

const readFile = (filepath) => fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
const extensionFile = (filepath) => path.extname(filepath);

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

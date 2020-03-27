import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';
import genAST from './AST';

const readFile = (filepath) => fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
const extensionFile = (filepath) => path.extname(filepath);

const genDifference = (pathToFirstFile, pathToSecondFile, format = 'nested') => {
  const typeFirstFile = extensionFile(pathToFirstFile).slice(1);
  const dataFirstFile = readFile(pathToFirstFile);
  const beforeConfig = parse(typeFirstFile, dataFirstFile);
  const typeSecondFile = extensionFile(pathToSecondFile).slice(1);
  const dataSecondFile = readFile(pathToSecondFile);
  const afterConfig = parse(typeSecondFile, dataSecondFile);
  const AST = genAST(beforeConfig, afterConfig);
  return render(AST, format);
};

export default genDifference;

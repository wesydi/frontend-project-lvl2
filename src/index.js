import parse from './parsers';
import render from './render';

const genDifference = (pathToFirstFile, pathToSecondFile, format = 'recursive') => {
  const before = parse(pathToFirstFile);
  const after = parse(pathToSecondFile);
  return render(before, after, format);
};
export default genDifference;

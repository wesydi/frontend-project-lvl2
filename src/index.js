import parse from './parsers';
import render from './render';

const genDifference = (beforeConfig, afterConfig, format = 'recursive') => {
  const before = parse(beforeConfig);
  const after = parse(afterConfig);
  return render(before, after, format);
};
export default genDifference;

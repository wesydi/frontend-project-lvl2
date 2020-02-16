import parse from './parsers';
import genDiff from '.';

const difference = (beforeConfig, afterConfig) => {
  const before = parse(beforeConfig);
  const after = parse(afterConfig);
  return genDiff(before, after);
};
export default difference;

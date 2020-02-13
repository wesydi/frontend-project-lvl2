import parser from './parsers';
import genDiff from '.';

const difference = (beforeConfig, afterConfig) => {
  const before = parser(beforeConfig);
  const after = parser(afterConfig);
  return genDiff(before, after);
};
export default difference;

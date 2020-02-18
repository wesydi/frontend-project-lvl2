import { genDiff, stringify } from '../';

const recursive = (beforeConfig, afterConfig) => {
  const data = genDiff(beforeConfig, afterConfig);
  const space = ' ';
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        acc.push(`${space.repeat(3)}${name}: ${children.map((el) => iter(el))}\n`);
      }
      if (status === 'unchanged') acc.push(`${space.repeat(4)}   ${name}: ${stringify(value)}\n`);
      if (status === 'added') acc.push(`${space.repeat(4)} + ${name}: ${stringify(value)}\n`);
      if (status === 'deleted') acc.push(`${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`);
      if (status === 'edited' && type !== 'obj') {
        acc.push(`${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`);
        acc.push(`${space.repeat(4)} + ${name}: ${stringify(value)}\n`);
      }
      return acc;
    }, ['{\n']);
    result.push('}');
    return result.join('');
  };
  return iter(data);
};
export default recursive;

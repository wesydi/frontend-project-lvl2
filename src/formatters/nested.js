import { genAST, stringify } from '../AST';

const space = ' ';

const nested = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        acc.push(`${space.repeat(3)}${name}: ${children.map(iter)}\n`);
      }
      switch (status) {
        case 'unchanged':
          acc.push(`${space.repeat(4)}   ${name}: ${stringify(value)}\n`);
          break;
        case 'added':
          acc.push(`${space.repeat(4)} + ${name}: ${stringify(value)}\n`);
          break;
        case 'deleted':
          acc.push(`${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`);
          break;
        case type !== 'obj' && 'edited':
          acc.push(`${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`);
          acc.push(`${space.repeat(4)} + ${name}: ${stringify(value)}\n`);
          break;
        default: return acc;
      }
      return acc;
    }, ['{\n']);
    result.push('}');
    return result.join('');
  };
  return iter(data);
};
export default nested;

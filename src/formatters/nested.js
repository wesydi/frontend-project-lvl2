import genAST from '../AST';

const stringify = (element) => {
  if (element instanceof Object) {
    const keys = Object.keys(element);
    const result = keys.reduce((acc, key) => {
      acc.push(`          ${key}: ${element[key]}\n`);
      return acc;
    }, ['{\n']);
    result.push('     }');
    return result.join('');
  }
  return element;
};

const space = ' ';

const nested = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, value, valuePrevious, children,
      } = dataChildren[key];
      if (status === 'has children') {
        return [...acc, `${space.repeat(3)}${name}: ${children.map(iter)}\n`];
      }
      switch (status) {
        case 'unchanged':
          return [...acc, `${space.repeat(4)}   ${name}: ${stringify(value)}\n`];
        case 'added':
          return [...acc, `${space.repeat(4)} + ${name}: ${stringify(value)}\n`];
        case 'deleted':
          return [...acc, `${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`];
        case 'edited':
          return [...acc, `${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`, `${space.repeat(4)} + ${name}: ${stringify(value)}\n`];
        default: return acc;
      }
    }, ['{\n']);
    return [...result, '}'].join('');
  };
  return iter(data);
};
export default nested;

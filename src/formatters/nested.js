import genAST from '../AST';

const space = ' ';

const stringify = (element) => {
  if (!(element instanceof Object)) return element;
  const keys = Object.keys(element);
  const result = keys.map((key) => `{\n${space.repeat(10)}${key}: ${element[key]}\n`, ['{\n']);
  return [...result, `${space.repeat(5)}}`].join('');
};

const nested = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.map((key) => {
      const {
        name, status, value, valuePrevious, children,
      } = dataChildren[key];
      if (status === 'has children') {
        return `${space.repeat(3)}${name}: ${children.map(iter)}\n`;
      }
      switch (status) {
        case 'unchanged':
          return `${space.repeat(4)}   ${name}: ${stringify(value)}\n`;
        case 'added':
          return `${space.repeat(4)} + ${name}: ${stringify(value)}\n`;
        case 'deleted':
          return `${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`;
        case 'edited':
          return [`${space.repeat(4)} - ${name}: ${stringify(valuePrevious)}\n`, `${space.repeat(4)} + ${name}: ${stringify(value)}\n`].join('');
        default: throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return ['{\n', ...result, '}'].join('');
  };
  return iter(data);
};
export default nested;

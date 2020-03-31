const space = (n) => ' '.repeat(n);

const stringify = (element, depth) => {
  if (!(element instanceof Object)) return element;
  const keys = Object.keys(element);
  const result = keys.map((key) => `{\n${space(depth + 5)}${key}: ${element[key]}\n`);
  return [...result, `${space(depth + 2)}}`].join('');
};

const nested = (AST) => {
  const iter = (dataChildren, depth) => {
    const result = dataChildren.map((node) => {
      const {
        name, status, value, valuePrevious, children,
      } = node;
      switch (status) {
        case 'hasChildren':
          return `${space(depth + 2)}${name}: ${iter(children, depth + 2)}\n`;
        case 'unchanged':
          return `${space(depth + 2)}${name}: ${stringify(value, depth)}\n`;
        case 'added':
          return `${space(depth)}+ ${name}: ${stringify(value, depth)}\n`;
        case 'deleted':
          return `${space(depth)}- ${name}: ${stringify(valuePrevious, depth)}\n`;
        case 'edited':
          return `${space(depth)}- ${name}: ${stringify(valuePrevious, depth)}\n${space(depth - 1)} + ${name}: ${stringify(value, depth)}\n`;
        default: throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return ['{\n', ...result, space(depth), '}'].join('');
  };
  return iter(AST, 0);
};
export default nested;

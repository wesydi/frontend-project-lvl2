const space = (n) => ' '.repeat(n);

const stringify = (element, depth, numberSpace) => {
  if (!(element instanceof Object)) return element;
  const keys = Object.keys(element);
  const result = keys.map((key) => `{\n${space(numberSpace * depth + 5)}${key}: ${element[key]}\n`);
  return [...result, `${space(numberSpace * depth + 2)}}`].join('');
};

const nested = (AST) => {
  const iter = (dataChildren, depth, numberSpace) => {
    const result = dataChildren.map((node) => {
      const {
        name, status, value, valuePrevious, children,
      } = node;
      switch (status) {
        case 'hasChildren':
          return `${space(numberSpace * depth + 2)}${name}: ${iter(children, depth + 1, numberSpace - 1)}\n`;
        case 'unchanged':
          return `${space(numberSpace * depth + 2)}${name}: ${stringify(value, depth, numberSpace)}\n`;
        case 'added':
          return `${space(numberSpace * depth)}+ ${name}: ${stringify(value, depth, numberSpace)}\n`;
        case 'deleted':
          return `${space(numberSpace * depth)}- ${name}: ${stringify(valuePrevious, depth, numberSpace)}\n`;
        case 'edited':
          return `${space(numberSpace * depth)}- ${name}: ${stringify(valuePrevious, depth, numberSpace)}\n${space(numberSpace - 1)} + ${name}: ${stringify(value, depth, numberSpace)}\n`;
        default: throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return ['{\n', ...result, space(numberSpace * depth), '}'].join('');
  };
  return iter(AST, 0, 5);
};
export default nested;

const space = (n) => ' '.repeat(n);

const stringify = (element, depth) => {
  if (!(element instanceof Object)) return element;
  const keys = Object.keys(element);
  const result = keys.map((key) => `${space(depth + 5)}${key}: ${element[key]}`);
  return ['{', ...result, `${space(depth + 2)}}`].join('\n');
};

const nested = (AST) => {
  const iter = (dataChildren, depth) => {
    const result = dataChildren.map((node) => {
      const {
        name, status, newValue, oldValue, children,
      } = node;
      switch (status) {
        case 'hasChildren':
          return `${space(depth + 2)}${name}: ${iter(children, depth + 2)}`;
        case 'unchanged':
          return `${space(depth + 2)}${name}: ${stringify(newValue, depth)}`;
        case 'added':
          return `${space(depth)}+ ${name}: ${stringify(newValue, depth)}`;
        case 'deleted':
          return `${space(depth)}- ${name}: ${stringify(oldValue, depth)}`;
        case 'edited':
          return `${space(depth)}- ${name}: ${stringify(oldValue, depth)}\n${space(depth - 1)} + ${name}: ${stringify(newValue, depth)}`;
        default: throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return ['{', ...result, `${space(depth)}}`].join('\n');
  };
  return iter(AST, 0);
};
export default nested;

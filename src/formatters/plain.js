const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (AST) => {
  const iter = (dataChildren, ancestry) => {
    const result = dataChildren
      .map((data) => {
        const {
          name, status, value, valuePrevious, children,
        } = data;
        if (children) {
          return iter(children, [...ancestry, name]);
        }
        const fullName = ancestry ? [...ancestry, name].join('.') : name;
        switch (status) {
          case 'added':
            return `Property ${fullName} was added with value: '${stringify(value)}'\n`;
          case 'deleted':
            return `Property ${fullName} was deleted\n`;
          case 'edited':
            return `Property ${fullName} was changed from '${stringify(valuePrevious)}' to '${stringify(value)}'\n`;
          case 'unchanged':
            return '';
          default: throw new Error(`Unknown status: '${status}'!`);
        }
      });
    return result.join('');
  };
  return iter(AST, []);
};
export default plain;

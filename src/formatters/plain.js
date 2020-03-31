const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (AST) => {
  const iter = (dataChildren, ancestry) => {
    const result = dataChildren
      .map((node) => {
        const {
          name, status, newValue, oldValue, children,
        } = node;
        const fullName = ancestry ? [...ancestry, name].join('.') : name;
        switch (status) {
          case 'hasChildren':
            return iter(children, [...ancestry, name]);
          case 'added':
            return `Property ${fullName} was added with value: '${stringify(newValue)}'\n`;
          case 'deleted':
            return `Property ${fullName} was deleted\n`;
          case 'edited':
            return `Property ${fullName} was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'\n`;
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

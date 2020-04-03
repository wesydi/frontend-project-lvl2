const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (AST) => {
  const iter = (dataChildren, ancestry) => {
    const result = dataChildren
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        const {
          name, status, newValue, oldValue, children,
        } = node;
        const fullName = ancestry ? [...ancestry, name].join('.') : name;
        switch (status) {
          case 'hasChildren':
            return iter(children, [...ancestry, name]);
          case 'added':
            return `Property ${fullName} was added with value: '${stringify(newValue)}'`;
          case 'deleted':
            return `Property ${fullName} was deleted`;
          case 'edited':
            return `Property ${fullName} was changed from '${stringify(oldValue)}' to '${stringify(newValue)}'`;
          default: throw new Error(`Unknown status: '${status}'!`);
        }
      });
    return result.join('\n');
  };
  return iter(AST, []);
};
export default plain;

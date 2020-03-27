const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (AST) => {
  const iter = (dataChildren, ancestry) => {
    const keys = Object.keys(dataChildren);
    const result = keys
      .filter((key) => dataChildren[key].status !== 'unchanged')
      .map((key) => {
        const {
          name, status, value, valuePrevious, children,
        } = dataChildren[key];
        if (children) {
          return children.map((el) => iter(el, [...ancestry, name]));
        }
        const fullName = ancestry ? [...ancestry, name].join('.') : name;
        switch (status) {
          case 'added':
            return `Property ${fullName} was added with value: '${stringify(value)}'\n`;
          case 'deleted':
            return `Property ${fullName} was deleted\n`;
          case 'edited':
            return `Property ${fullName} was changed from '${stringify(valuePrevious)}' to '${stringify(value)}'\n`;
          default: throw new Error(`Unknown status: '${status}'!`);
        }
      });
    return result.join('');
  };
  return iter(AST, []);
};
export default plain;

import genAST from '../AST';

const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren, ancestry) => {
    const keys = Object.keys(dataChildren);
    const result = keys.map((key) => {
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
        case 'unchanged':
          return '';
        default: throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return result.join('');
  };
  return iter(data, []);
};
export default plain;

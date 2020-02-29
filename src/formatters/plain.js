import genAST from '../AST';

const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren, ancestry) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, value, valuePrevious, children,
      } = dataChildren[key];
      if (status === 'has children') {
        return [...acc, children.map((el) => iter(el, [...ancestry, name]))];
      }
      const fullName = ancestry ? [...ancestry, name].join('.') : name;
      switch (status) {
        case 'added':
          return [...acc, `Property ${fullName} was added with value: '${stringify(value)}'\n`];
        case 'deleted':
          return [...acc, `Property ${fullName} was deleted\n`];
        case 'edited':
          return [...acc, `Property ${fullName} was changed from '${stringify(valuePrevious)}' to '${stringify(value)}'\n`];
        default: return acc;
      }
    }, []);
    return result.join('');
  };
  return iter(data, []);
};
export default plain;

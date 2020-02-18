import { genAST } from '../index';

const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren, ancestry) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        return [...acc, children.map((el) => iter(el, [...ancestry, name]))];
      }
      const fullName = ancestry ? [...ancestry, name].join('.') : name;
      switch (status) {
        case 'added':
          acc.push(`Property ${fullName} was added with value: '${stringify(value)}'\n`);
          break;
        case 'deleted':
          acc.push(`Property ${fullName} was deleted\n`);
          break;
        case type !== 'obj' && 'edited':
          acc.push(`Property ${fullName} was changed from '${stringify(valuePrevious)}' to '${stringify(value)}'\n`);
          break;
      }
      return acc;
    }, []);
    return result.join('');
  };
  return iter(data, []);
};
export default plain;

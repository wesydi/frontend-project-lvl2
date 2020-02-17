import { genDiff } from '../index';

const stringify = (element) => (element instanceof Object ? '[complex value]' : element);

const plain = (beforeConfig, afterConfig) => {
  const data = genDiff(beforeConfig, afterConfig);
  const iter = (dataChildren, fullName) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        acc.push(`${children.map((el) => iter(el, [...fullName, name]))}`);
      }
      if (status === 'added') acc.push(`Property ${fullName.join('.')} was added with value: '${stringify(value)}'\n`);
      if (status === 'deleted') acc.push(`Property ${fullName.join('.')} was deleted\n`);
      if (status === 'edited' && type !== 'obj') acc.push(`Property ${fullName} was changed from '${stringify(valuePrevious)}' to '${stringify(value)}'\n`);
      return acc;
    }, ['']);
    return result.join('');
  };
  return iter(data, []);
};
export default plain;

import { genDiff } from '../';

const stringify = (element) => {
    if (element instanceof Object) {
      const keys = Object.keys(element);
      const result = keys.reduce((acc, key) => {
        acc.push(` '${key}': '${element[key]}'`);
        return acc;
      }, ['{']);
      result.push('}');
      return result.join('');
    }
    return element;
};

const toJson = (beforeConfig, afterConfig) => {
    const data = genDiff(beforeConfig, afterConfig);
  const space = ' ';
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        acc.push(` '${name}': ${children.map((el) => iter(el))}`);
      }
      if (status === 'unchanged') acc.push(` '${name}': '${stringify(value)}'`);
      if (status === 'added') acc.push(` + '${name}': '${stringify(value)}'`);
      if (status === 'deleted') acc.push(` - '${name}': '${stringify(valuePrevious)}'`);
      if (status === 'edited' && type !== 'obj') {
        acc.push(` - '${name}': '${stringify(valuePrevious)}'`);
        acc.push(` + '${name}': '${stringify(value)}'`);
      }
      return acc;
    }, ['{']);
    result.push('}');
    return JSON.parse(JSON.stringify(result.join('')));
  };
  return iter(data);
  };
export default toJson;
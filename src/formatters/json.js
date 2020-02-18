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
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        acc[`${name}`] = [ ...children.map(iter) ];
      }
      if (status === 'unchanged') acc[`${name}`] = `${stringify(value)}`;
      if (status === 'added') acc[`+ ${name}`] = `${stringify(value)}`;
      if (status === 'deleted') acc[`- ${name}`] = `${stringify(valuePrevious)}`;
      if (status === 'edited' && type !== 'obj') {
        acc[`- ${name}`] = `${stringify(valuePrevious)}`;
        acc[`+ ${name}`] = `${stringify(value)}`;
      }
      return acc;
    }, {});
    return JSON.stringify(result);
  };
  return iter(data);
  };
export default toJson;

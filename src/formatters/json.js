import { genAST } from '..';

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
  const data = genAST(beforeConfig, afterConfig);
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = dataChildren[key];
      if (type === 'obj') {
        acc[`${name}`] = [...children.map(iter)];
      }
      switch(status) {
        case 'unchanged': 
          acc[`${name}`] = `${stringify(value)}`;
          break;
        case 'added': 
          acc[`+ ${name}`] = `${stringify(value)}`;
          break;
        case 'deleted': 
          acc[`- ${name}`] = `${stringify(valuePrevious)}`;
          break;
        case type !== 'obj' && 'edited': 
          acc[`- ${name}`] = `${stringify(valuePrevious)}`;
          acc[`+ ${name}`] = `${stringify(value)}`;
          break;
        default: null;
      }
      return acc;
    }, {});
    return JSON.stringify(result);
  };
  return iter(data);
};
export default toJson;

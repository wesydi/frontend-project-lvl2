import { uniq, has, isObject, flattenDeep } from 'lodash';

const stringify = (element) => {
  if (isObject(element)) {
    const keys = Object.keys(element);
    const result = keys.reduce((acc, key) => {
      acc.push(`${key}: ${element[key]}\n`);
      return acc;
    }, ['{\n']);
    result.push('}');
    return result.join('');
  };
  return element;
};

const genDiff = (beforeConfig, afterConfig) => {
  const keys = uniq([...Object.keys(beforeConfig), ...Object.keys(afterConfig)]).sort();
  const result = keys.reduce((acc, key) => {
    const list = {
      name: '',
      type: '',
      value: '',
      valuePrevious: '',
      children: [],
    };
    list.name = key;
    list.value = afterConfig[key];
    list.valuePrevious = beforeConfig[key];
    if (list.value === list.valuePrevious) list.type = 'unchanged';
    if (
      beforeConfig[key] !== afterConfig[key]
      && has(afterConfig, key)
      && has(beforeConfig, key)
    ) {
      list.value = afterConfig[key];
      list.valuePrevious = beforeConfig[key];
      list.type = 'edited';
    }
    if (!has(afterConfig, key)) list.type = 'deleted';
    if (!has(beforeConfig, key)) list.type = 'added';
    if (isObject(afterConfig[key]) && isObject(beforeConfig[key])) {
      list.value = '';
      list.valuePrevious = '';
      list.children.push(genDiff(beforeConfig[key], afterConfig[key]));
    }
    flattenDeep(list.children);
    return [...acc, list]
  }, []);
  return result;
};

const render = (config1, config2) => {
  const data = genDiff(config1, config2);
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const { name, type, value, valuePrevious, children } = data[key];
    if (type === 'unchanged') acc.push(`   ${name}:${value}\n`);
    if (type === 'added') acc.push(` + ${name}:${value}\n`);
    if (type === 'delete') acc.push(` - ${name}:${valuePrevious}\n`);
    if (type === 'edited') {
      acc.push(` - ${name}:${valuePrevious}\n`);
      acc.push(` + ${name}:${value}\n`);
    };
    return acc;
  }, ['{\n']);
  result.push('}');
  return result.join('');
}

export default render;
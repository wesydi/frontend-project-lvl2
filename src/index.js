import {
  uniq, has, isObject,
} from 'lodash';

const stringify = (element) => {
  if (isObject(element)) {
    const keys = Object.keys(element);
    const result = keys.reduce((acc, key) => {
      acc.push(`      ${key}: ${element[key]}\n`);
      return acc;
    }, ['{\n']);
    result.push('   }');
    return result.join('');
  }
  return element;
};

const genDiff = (beforeConfig, afterConfig) => {
  const keys = uniq([...Object.keys(beforeConfig), ...Object.keys(afterConfig)]).sort();
  const result = keys.reduce((acc, key) => {
    const list = {
      name: '',
      type: 'key',
      status: '',
      value: '',
      valuePrevious: '',
      children: [],
    };
    list.name = key;
    list.value = afterConfig[key];
    list.valuePrevious = beforeConfig[key];
    if (list.value === list.valuePrevious) list.status = 'unchanged';
    if (
      beforeConfig[key] !== afterConfig[key]
      && has(afterConfig, key)
      && has(beforeConfig, key)
    ) {
      list.value = afterConfig[key];
      list.valuePrevious = beforeConfig[key];
      list.status = 'edited';
    }
    if (!has(afterConfig, key)) list.status = 'deleted';
    if (!has(beforeConfig, key)) list.status = 'added';
    if (isObject(afterConfig[key]) && isObject(beforeConfig[key])) {
      list.value = '';
      list.valuePrevious = '';
      list.type = 'obj';
      list.children.push(genDiff(beforeConfig[key], afterConfig[key]));
    }
    return [...acc, list];
  }, []);
  return result;
};

const render = (config1, config2) => {
  const data = genDiff(config1, config2);
  const iter = (dataChildren) => {
    const keys = Object.keys(dataChildren);
    const result = keys.reduce((acc, key) => {
      const {
        name, status, type, value, valuePrevious, children,
      } = data[key];
      if (type === 'obj') acc.push(`   ${name}:\n${children.map(iter)}\n`);
      if (status === 'unchanged') acc.push(`   ${name}:${stringify(value)}\n`);
      if (status === 'added') acc.push(` + ${name}:${stringify(value)}\n`);
      if (status === 'deleted') acc.push(` - ${name}:${stringify(valuePrevious)}\n`);
      if (status === 'edited' && type !== 'obj') {
        acc.push(` - ${name}:${stringify(valuePrevious)}\n`);
        acc.push(` + ${name}:${stringify(value)}\n`);
      }
      return acc;
    }, ['{\n']);
    result.push('}');
    return result.join('');
  };
  return iter(data);
};

export default render;

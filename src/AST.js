import {
  has, isObject, union,
} from 'lodash';

const genAST = (beforeConfig, afterConfig) => {
  const keys = union([...Object.keys(beforeConfig), ...Object.keys(afterConfig)]);
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
      list.children.push(genAST(beforeConfig[key], afterConfig[key]));
    }
    return [...acc, list];
  }, []);
  return result;
};

export default genAST;

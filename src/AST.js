import {
  has, isObject, union,
} from 'lodash';

const genAST = (beforeConfig, afterConfig) => {
  const keys = union(Object.keys(beforeConfig), Object.keys(afterConfig));
  const result = keys.reduce((acc, key) => {
    let list = {
      name: key,
      status: '',
      value: afterConfig[key],
      valuePrevious: beforeConfig[key],
      children: [],
    };
    if (list.value === list.valuePrevious) {
      return [...acc, { ...list, status: 'unchanged' }];
    }
    if (
      beforeConfig[key] !== afterConfig[key]
      && has(afterConfig, key)
      && has(beforeConfig, key)
    ) {
      list = { ...list, status: 'edited' };
    }
    if (!has(afterConfig, key)) return [...acc, { ...list, status: 'deleted' }];
    if (!has(beforeConfig, key)) return [...acc, { ...list, status: 'added' }];
    if (isObject(afterConfig[key]) && isObject(beforeConfig[key])) {
      return [...acc, {
        ...list,
        value: '',
        valuePrevious: '',
        status: 'has children',
        children: [genAST(beforeConfig[key], afterConfig[key])],
      }];
    }
    return [...acc, list];
  }, []);
  return result;
};

export default genAST;

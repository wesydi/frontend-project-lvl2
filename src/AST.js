import {
  has, isObject, union,
} from 'lodash';

const genAST = (beforeConfig, afterConfig) => {
  const keys = union(Object.keys(beforeConfig), Object.keys(afterConfig));
  const AST = keys.reduce((acc, key) => {
    const node = {
      name: key,
      status: '',
      value: afterConfig[key],
      valuePrevious: beforeConfig[key],
      children: [],
    };
    if (node.value === node.valuePrevious) {
      return [...acc, { ...node, status: 'unchanged' }];
    }
    if (!has(afterConfig, key)) return [...acc, { ...node, status: 'deleted' }];
    if (!has(beforeConfig, key)) return [...acc, { ...node, status: 'added' }];
    if (isObject(afterConfig[key]) && isObject(beforeConfig[key])) {
      return [...acc, {
        ...node,
        value: '',
        valuePrevious: '',
        status: 'has children',
        children: [genAST(beforeConfig[key], afterConfig[key])],
      }];
    }
    if (
      beforeConfig[key] !== afterConfig[key]
      && has(afterConfig, key)
      && has(beforeConfig, key)
    ) {
      return [...acc, { ...node, status: 'edited' }];
    }
    return acc;
  }, []);
  return AST;
};

export default genAST;

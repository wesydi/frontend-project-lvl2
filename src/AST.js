import {
  has, isObject, union,
} from 'lodash';

const genAST = (beforeConfig, afterConfig) => {
  const keys = union(Object.keys(beforeConfig), Object.keys(afterConfig));
  const AST = keys.map((key) => {
    const node = {
      name: key,
      oldValue: beforeConfig[key],
      newValue: afterConfig[key],
    };
    if (!has(afterConfig, key)) return { ...node, status: 'deleted' };
    if (!has(beforeConfig, key)) return { ...node, status: 'added' };
    if (isObject(afterConfig[key]) && isObject(beforeConfig[key])) {
      return {
        name: key,
        status: 'hasChildren',
        children: genAST(beforeConfig[key], afterConfig[key]),
      };
    }
    if (
      beforeConfig[key] !== afterConfig[key]
      && has(afterConfig, key)
      && has(beforeConfig, key)
    ) {
      return { ...node, status: 'edited' };
    }
    return { ...node, status: 'unchanged' };
  });
  return AST;
};

export default genAST;

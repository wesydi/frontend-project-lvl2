import genAST from '../AST';

const toJson = (beforeConfig, afterConfig) => {
  const data = genAST(beforeConfig, afterConfig);
  return JSON.stringify(data);
};
export default toJson;

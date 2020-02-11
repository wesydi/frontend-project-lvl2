import { uniq, has } from 'lodash';

const genDiff = (firstConfig, secondConfig) => {
  const keys = uniq(
    [...Object.keys(firstConfig), ...Object.keys(secondConfig)].sort(),
  );
  const result = keys.reduce((acc, key) => {
    if (firstConfig[key] === secondConfig[key]) acc.push(`   ${key}: ${firstConfig[key]}\n`);
    if (!has(secondConfig, key)) acc.push(` - ${key}: ${firstConfig[key]}\n`);
    if (!has(firstConfig, key)) acc.push(` + ${key}: ${secondConfig[key]}\n`);
    if (
      firstConfig[key] !== secondConfig[key]
      && has(secondConfig, key)
      && has(firstConfig, key)
    ) {
      acc.push(` - ${key}: ${firstConfig[key]}\n`);
      acc.push(` + ${key}: ${secondConfig[key]}\n`);
    }
    return acc;
  }, ['{\n']);
  result.push('}');
  return result.join('');
};

export default genDiff;

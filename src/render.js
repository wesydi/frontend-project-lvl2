import toNested from './formatters/nested';
import toPlain from './formatters/plain';
import toJson from './formatters/json';

const render = (config1, config2, format) => {
  if (format === 'plain') return toPlain(config1, config2, format);
  if (format === 'json') return toJson(config1, config2, format);
  return toNested(config1, config2);
};
export default render;

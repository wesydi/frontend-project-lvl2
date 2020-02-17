import recursive from './formatters/recursive';
import plain from './formatters/plain';

const render = (config1, config2, format) => {
  if (format === 'plain') return plain(config1, config2, format);
  return recursive(config1, config2);
};
export default render;

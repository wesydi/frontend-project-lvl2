import toNested from './nested.js';
import toPlain from './plain.js';
import toJson from './json.js';

const render = (beforeConfig, afterConfig, format) => {
    switch (format) {
      case 'nested':
        return toNested(beforeConfig, afterConfig);
      case 'plain':
        return toPlain(beforeConfig, afterConfig, format);
      case 'json':
        return toJson(beforeConfig, afterConfig, format);
      default: throw new Error(`Unknown format: '${format}'!`);
    }
};

export default render;
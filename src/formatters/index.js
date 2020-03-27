import toNested from './nested.js';
import toPlain from './plain.js';
import toJson from './json.js';

const render = (AST, format) => {
  switch (format) {
    case 'nested':
      return toNested(AST, format);
    case 'plain':
      return toPlain(AST, format);
    case 'json':
      return toJson(AST, format);
    default: throw new Error(`Unknown format: '${format}'!`);
  }
};

export default render;

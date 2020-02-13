import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';


const parser = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`);
  let parse;
  if (format === '.json') {
    parse = JSON.parse(data);
  } else if (format === '.yml') {
    parse = yaml.safeLoad(data);
  }
  return parse;
};
export default parser;

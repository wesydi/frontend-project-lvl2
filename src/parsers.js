import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';


const parser = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
  let parse;
  if (format === '.json') {
    parse = JSON.parse(data);
  } else if (format === '.yml') {
    parse = yaml.safeLoad(data);
  } else if (format === '.ini') {
    parse = ini.parse(data);
  }
  return parse;
};
export default parser;

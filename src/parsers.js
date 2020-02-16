import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';


const parse = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
  let parser;
  if (format === '.json') {
    parser = JSON.parse(data);
  } else if (format === '.yml') {
    parser = yaml.safeLoad(data);
  } else if (format === '.ini') {
    parser = ini.parse(data);
  }
  return parser;
};
export default parse;

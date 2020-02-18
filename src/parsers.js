import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';


const parse = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(`${path.resolve(process.cwd(), filepath)}`, 'utf-8');
  if (format === '.yml') {
    return yaml.safeLoad(data);
  } if (format === '.ini') {
    return ini.parse(data);
  }
  return JSON.parse(data);
};
export default parse;

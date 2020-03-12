import yaml from 'js-yaml';
import ini from 'ini';

const parse = (typeData, data) => {
  switch (typeData) {
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    case '.json':
      return JSON.parse(data);
    default: throw new Error(`Unknown type of data: '${typeData}'!`);
  }
};
export default parse;

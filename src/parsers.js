import yaml from 'js-yaml';
import ini from 'ini';

const parse = (extensionFile, dataFile) => {
  switch (extensionFile) {
    case '.yml':
      return yaml.safeLoad(dataFile);
    case '.ini':
      return ini.parse(dataFile);
    case '.json':
      return JSON.parse(dataFile);
    default: return null;
  }
};
export default parse;

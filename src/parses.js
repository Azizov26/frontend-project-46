import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml') {
    return yaml.load(data);
  }
  return null;
};
export default parse;

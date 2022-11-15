import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), '_fixtures_', filepath);

const JSONParse = (file) => JSON.parse(file);

const readfile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf8');

const getDiffInformation = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const FileKeys = _.sortBy(_.union([...keys1, ...keys2]));

  const result = FileKeys.map((key) => {
    const valueFile1 = file1[key];
    const valueFile2 = file2[key];

    if (_.isEqual(valueFile1, valueFile2)) {
      return {
        type: 'nochanges',
        key,
        value: valueFile1,
      };
    }
    if (valueFile1 && valueFile2 && valueFile1 !== valueFile2) {
      return {
        type: 'changed',
        key,
        valueFile1,
        valueFile2,
      };
    }
    if (!_.has(file2, key)) {
      return {
        type: 'delited',
        key,
        value: valueFile1,
      };
    }
    if (!_.has(file1, key)) {
      return {
        type: 'added',
        key,
        value: valueFile2,
      };
    }
    return null;
  });

  return result;
};

const gendiff = (filepath1, filepath2) => {
  const file1 = readfile(filepath1);
  const file2 = readfile(filepath2);

  const infoGendiff = getDiffInformation(JSONParse(file1), JSONParse(file2));
  const result = infoGendiff.map((item) => {
    const itemType = item.type;
    switch (itemType) {
      case 'delited':
        return `  - ${item.key}: ${item.value}`;
      case 'nochanges':
        return `    ${item.key}: ${item.value}`;
      case 'changed':
        return `  - ${item.key}: ${item.valueFile1} \n  + ${item.key}: ${item.valueFile2} `;
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
